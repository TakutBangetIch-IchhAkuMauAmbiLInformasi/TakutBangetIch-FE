"use client"

import React from 'react'
import { SearchProvider } from '@/lib/search-context'

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SearchProvider>{children}</SearchProvider>
}
