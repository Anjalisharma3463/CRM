"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Server,
  Globe,
  Database,
  Trash2,
  Power,
  PowerOff,
  Clock,
  Calendar,
  MapPin,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
} from "lucide-react"
import { fetchResourceDetails, deleteResource } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { MetricChart } from "@/components/metric-chart"

type ResourceDetails = {
  id: string
  name: string
  type: "droplet" | "domain" | "volume" | "database"
  region: string
  status: "active" | "off" | "archived"
  createdAt: string
  cost: {
    hourly: number
    monthly: number
  }
  hardware: {
    vcpus: number
    memory: number
    disk: number
    storageType: string
  }
  metrics: {
    cpu: {
      current: number
      average: number
      peak: number
      history: { timestamp: number; value: number }[]
    }
    memory: {
      current: number
      average: number
      peak: number
      history: { timestamp: number; value: number }[]
    }
  }
  ipAddress?: string
  logs?: string[]
}

export function ResourceDetails({ id }: { id: string }) {
  const [resource, setResource] = useState<ResourceDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, this would call the actual API
        const data = await fetchResourceDetails(id)
        setResource(data)
      } catch (error) {
        console.error("Failed to fetch resource details:", error)
        toast({
          variant: "destructive",
          title: "Error fetching resource details",
          description: "Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [id, toast])

  const handleDelete = async () => {
    if (!resource) return

    try {
      await deleteResource(resource.id, resource.type)
      toast({
        title: "Resource deleted",
        description: `${resource.name} has been deleted successfully.`,
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to delete resource:", error)
      toast({
        variant: "destructive",
        title: "Error deleting resource",
        description: "Please try again later.",
      })
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "droplet":
        return <Server className="h-5 w-5" />
      case "domain":
        return <Globe className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      default:
        return <Server className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "off":
        return "bg-yellow-500"
      case "archived":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading || !resource) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-full max-w-md animate-pulse rounded-md bg-muted" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-64 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-96 w-full animate-pulse rounded-md bg-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {getResourceIcon(resource.type)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{resource.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {resource.type}
              </Badge>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(resource.status)}`} />
                <span className="text-xs capitalize">{resource.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.type === "droplet" && (
            <Button variant="outline">
              {resource.status === "active" ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4" />
                  Power Off
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Power On
                </>
              )}
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {resource.name}. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Resource Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Region</span>
              </div>
              <span className="text-sm font-medium">{resource.region}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Created At</span>
              </div>
              <span className="text-sm font-medium">{new Date(resource.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Uptime</span>
              </div>
              <span className="text-sm font-medium">{resource.status === "active" ? "Running" : "Stopped"}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Cost</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${resource.cost.monthly.toFixed(2)}/mo</div>
                <div className="text-xs text-muted-foreground">${resource.cost.hourly.toFixed(4)}/hr</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Hardware Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">vCPUs</span>
              </div>
              <span className="text-sm font-medium">{resource.hardware.vcpus}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Memory className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Memory</span>
              </div>
              <span className="text-sm font-medium">{resource.hardware.memory} GB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Disk</span>
              </div>
              <span className="text-sm font-medium">{resource.hardware.disk} GB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Storage Type</span>
              </div>
              <span className="text-sm font-medium">{resource.hardware.storageType}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Last 24 hours of resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cpu">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cpu">CPU Usage</TabsTrigger>
              <TabsTrigger value="memory">Memory Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="cpu" className="space-y-4">
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.cpu.current}%</div>
                  <p className="text-xs text-muted-foreground">Current Usage</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.cpu.average}%</div>
                  <p className="text-xs text-muted-foreground">24h Average</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.cpu.peak}%</div>
                  <p className="text-xs text-muted-foreground">24h Peak</p>
                </div>
              </div>
              <div className="h-[300px]">
                <MetricChart data={resource.metrics.cpu.history} />
              </div>
            </TabsContent>
            <TabsContent value="memory" className="space-y-4">
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.memory.current}%</div>
                  <p className="text-xs text-muted-foreground">Current Usage</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.memory.average}%</div>
                  <p className="text-xs text-muted-foreground">24h Average</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{resource.metrics.memory.peak}%</div>
                  <p className="text-xs text-muted-foreground">24h Peak</p>
                </div>
              </div>
              <div className="h-[300px]">
                <MetricChart data={resource.metrics.memory.history} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {resource.logs && (
        <Card className="bg-background/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-auto rounded-md bg-muted p-4 font-mono text-xs">
              {resource.logs.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
