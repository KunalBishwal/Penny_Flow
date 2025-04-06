import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AnimatedBackground } from "@/components/animated-background"
import "@/app/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "PennyFlow - Smart Expense Tracking",
  description: "Track your expenses with AI and OCR",
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimatedBackground />
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              {/* Add left margin equal to sidebar width (e.g. 16rem) */}
              <main className="flex-1 overflow-auto ml-[16rem] mr-4">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

