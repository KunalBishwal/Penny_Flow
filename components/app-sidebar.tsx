"use client"

import {
  BarChart3,
  CreditCard,
  Home,
  Plus,
  Receipt,
  Settings,
  Upload,
  LogOut,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()

  // Define your navigation items.
  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Upload Receipt",
      icon: Upload,
      href: "/upload",
    },
    {
      title: "Add Expense",
      icon: Plus,
      href: "/add",
    },
    {
      title: "Transactions",
      icon: CreditCard,
      href: "/transactions",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  // Dummy logout handler; replace with your actual logout logic.
  const logoutHandler = () => {
    // For example, remove authentication tokens and redirect.
    sessionStorage.removeItem("authenticated")
    window.location.href = "/login"
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <Receipt className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-sf-pro bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            ExpenseAI
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* Updated Footer: Profile Section with Log Out Button */}
      <SidebarFooter className="p-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            {/* Replace with your actual user image */}
            <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
            <span className="text-sm font-medium">John Doe</span>
          </div>
          <Button
            onClick={logoutHandler}
            className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
