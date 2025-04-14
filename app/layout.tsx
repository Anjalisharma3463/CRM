import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cloud Resource Management App",
  description: "A mobile-first cloud management dashboard for DigitalOcean",
    generator: 'Anjali Sharma'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0069ff]/5`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
           
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
            <Toaster />
         
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'