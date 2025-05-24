# --------------- STAGE 1: Build Next.js App ---------------
FROM node:18-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SEARCH_ENGINE_URL=${NEXT_PUBLIC_SEARCH_ENGINE_URL}

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy entire source and build the app
COPY . .
RUN echo "Building with NEXT_PUBLIC_SEARCH_ENGINE_URL=${NEXT_PUBLIC_SEARCH_ENGINE_URL}"
RUN npm run build

# Remove dev dependencies to keep only production deps
RUN npm prune --production

# --------------- STAGE 2: Setup Production Image with NGINX (HTTP only) ---------------
FROM node:18-alpine
WORKDIR /app

# Install NGINX and netcat
RUN apk add --no-cache nginx netcat-openbsd

# Overwrite NGINX base config
RUN cat <<'EOF' > /etc/nginx/nginx.conf
user  nginx;
worker_processes  auto;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile       on;
    keepalive_timeout 65;
    include /etc/nginx/conf.d/*.conf;
}
EOF

# Create NGINX HTTP-only reverse proxy config
RUN mkdir -p /etc/nginx/conf.d
RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }
}
EOF

# Copy built Next.js app and production deps
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./  

# Expose only HTTP port
EXPOSE 80

# Start Next.js then NGINX
CMD ["sh", "-c", "npm run start & while ! nc -z localhost 3000; do echo 'Waiting for Next.js...'; sleep 1; done; exec nginx -g 'daemon off;'"]
