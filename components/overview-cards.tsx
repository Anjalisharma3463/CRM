"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchOverviewData } from "@/lib/api"

type OverviewData = {
  totalResources: number
  cpuUsage: number
  memoryUsage: number
  totalUptime: string
}

export function OverviewCards() {
  const [data, setData] = useState<OverviewData>({
    totalResources: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    totalUptime: "0d 0h 0m",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, this would call the actual API
        const overviewData = await fetchOverviewData()
        setData(overviewData)
      } catch (error) {
        console.error("Failed to fetch overview data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalResources}</div>
          <p className="text-xs text-muted-foreground">Across all resource types</p>
        </CardContent>
      </Card>
      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.cpuUsage}%</div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${data.cpuUsage}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.memoryUsage}%</div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${data.memoryUsage}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Uptime</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalUptime}</div>
          <p className="text-xs text-muted-foreground">Average across all resources</p>
        </CardContent>
      </Card>
    </div>
  )
}
