"use client"

import React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PennyFlow. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
