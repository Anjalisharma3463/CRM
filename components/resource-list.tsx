"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Server, Globe, Database, MoreVertical, Trash2, ExternalLink, Power, PowerOff } from "lucide-react"
import { fetchResources, deleteResource } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

type Resource = {
  id: string
  name: string
  type: "droplet" | "domain" | "volume" | "database"
  region: string
  status: "active" | "off" | "archived"
  cpuUsage: number
  memoryUsage: number
  createdAt: string
  cost: {
    hourly: number
    monthly: number
  }
}

export function ResourceList({ type = "all" }: { type?: string }) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, this would call the actual API
        const data = await fetchResources(type)
        setResources(data)
      } catch (error) {
        console.error("Failed to fetch resources:", error)
        toast({
          variant: "destructive",
          title: "Error fetching resources",
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
  }, [type, toast])

  const handleDelete = async () => {
    if (!resourceToDelete) return

    try {
      await deleteResource(resourceToDelete.id, resourceToDelete.type)
      setResources(resources.filter((r) => r.id !== resourceToDelete.id))
      toast({
        title: "Resource deleted",
        description: `${resourceToDelete.name} has been deleted successfully.`,
      })
    } catch (error) {
      console.error("Failed to delete resource:", error)
      toast({
        variant: "destructive",
        title: "Error deleting resource",
        description: "Please try again later.",
      })
    } finally {
      setResourceToDelete(null)
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

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="bg-background/60 backdrop-blur-sm animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 w-full rounded-md bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <Card className="bg-background/60 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="mb-4 text-center text-muted-foreground">No resources found</p>
          <Button asChild>
            <Link href="/create">Create Resource</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="bg-background/60 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{resource.name}</h3>
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
                  <div className="flex items-center gap-2">
                    <div className="hidden text-right md:block">
                      <p className="text-sm font-medium">${resource.cost.monthly.toFixed(2)}/mo</p>
                      <p className="text-xs text-muted-foreground">${resource.cost.hourly.toFixed(4)}/hr</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/resource/${resource.id}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        {resource.type === "droplet" && (
                          <>
                            <DropdownMenuItem>
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
                            </DropdownMenuItem>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
                              <AlertDialogAction variant="destructive" onClick={() => setResourceToDelete(resource)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">CPU Usage</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={resource.cpuUsage} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{resource.cpuUsage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Memory Usage</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={resource.memoryUsage} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{resource.memoryUsage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={!!resourceToDelete} onOpenChange={(open) => !open && setResourceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {resourceToDelete?.name}. This action cannot be undone.
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
  )
}
