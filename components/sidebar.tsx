"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, HardDrive, Home, Server, Globe, Database, BarChart3, Plus, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils" // optional helper

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Hamburger Button - visible on mobile */}
     
      {

        !open && (
        <div className="fixed top-4 left-4 z-50 rounded-lg  bg-[#27272a] md:hidden">
        <Button variant="ghost" size="icon"  onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6"    />
        </Button>
      </div>
       ) 
      }
      

      {/* Sidebar Drawer for Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#11161e] border-r shadow-lg transition-transform duration-300    ",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0 md:block  "
        )}
      >
        {/* Header */}
        <div className="flex items-center  justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <HardDrive className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">CRM</span>
          </Link>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="p-4 space-y-2">
          <SidebarLink href="/" icon={<Home className="h-5 w-5" />} active={isActive("/")}>Home</SidebarLink>
          <SidebarLink href="/droplets" icon={<Server className="h-5 w-5" />} active={isActive("/droplets")}>Droplets</SidebarLink>
          <SidebarLink href="/domains" icon={<Globe className="h-5 w-5" />} active={isActive("/domains")}>Domains</SidebarLink>
          <SidebarLink href="/databases" icon={<Database className="h-5 w-5" />} active={isActive("/databases")}>Databases</SidebarLink>
          <SidebarLink href="/metrics" icon={<BarChart3 className="h-5 w-5" />} active={isActive("/metrics")}>Metrics</SidebarLink>
          <SidebarLink href="/create" icon={<Plus className="h-5 w-5" />} active={isActive("/create")}>Create Resource</SidebarLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t mt-auto  flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {open && <div className="fixed inset-0 bg-red/40 z-30 md:hidden" onClick={() => setOpen(false)} />}
    </>
  )
}

// Reusable sidebar link component
function SidebarLink({ href, icon, children, active }: { href: string; icon: React.ReactNode; children: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active ? "bg-blue-100 text-blue-700" : "hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}
