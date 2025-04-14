import { Suspense } from "react"
import { OverviewCards } from "@/components/overview-cards"
import { ResourceList } from "@/components/resource-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="space-y-6  ">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage your DigitalOcean resources</p>
      </div>

      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCards />
      </Suspense>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="droplets">Droplets</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Suspense fallback={<ResourceListSkeleton />}>
            <ResourceList type="all" />
          </Suspense>
        </TabsContent>
        <TabsContent value="droplets" className="mt-4">
          <Suspense fallback={<ResourceListSkeleton />}>
            <ResourceList type="droplets" />
          </Suspense>
        </TabsContent>
        <TabsContent value="domains" className="mt-4">
          <Suspense fallback={<ResourceListSkeleton />}>
            <ResourceList type="domains" />
          </Suspense>
        </TabsContent>
        <TabsContent value="databases" className="mt-4">
          <Suspense fallback={<ResourceListSkeleton />}>
            <ResourceList type="databases" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
    </div>
  )
}

function ResourceListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
    </div>
  )
}
