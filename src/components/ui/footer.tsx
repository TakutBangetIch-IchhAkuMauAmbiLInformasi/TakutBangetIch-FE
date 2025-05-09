"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: string
  href: string
  icon: React.ReactNode
}

interface FooterProps {
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  companyName?: string
  showNewsletter?: boolean
}

export default function Footer({
  columns = [
    {
      title: "Anggota",
      links: [
        { label: "Faishal Nelwan", href: "#" },
        { label: "Muhammad Fadhil", href: "#" },
        { label: "Yosef Nuraga", href: "#" },
      ],
    }
  ],
  socialLinks = [
    { platform: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
  ],
  companyName = "Ih Takut Banget",
  showNewsletter = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">{companyName}</span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-xs">
              Description proyek
            </p>

          </div>

          {/* Footer Columns */}
          {columns.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center">

          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                aria-label={`${companyName} on ${social.platform}`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
