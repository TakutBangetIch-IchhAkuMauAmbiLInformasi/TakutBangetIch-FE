"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  logo?: string
  navItems?: NavItem[]
  showThemeToggle?: boolean
}

export default function Navbar({
  logo = "SkripsiGratis",
  navItems = [

  ],
  showThemeToggle = true,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real implementation, this would toggle a class on the document
    // or use a theme context to switch between light and dark modes
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-neutral-900 dark:text-white">{logo}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {showThemeToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Moon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {showThemeToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2 rounded-full"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Moon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                )}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? (
                <X className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white py-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
