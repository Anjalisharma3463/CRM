"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateDropletForm } from "@/components/create-droplet-form"
import { CreateDomainForm } from "@/components/create-domain-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Resource</h1>
      </div>

      <Card className="bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Create a New Resource</CardTitle>
          <CardDescription>Select the type of resource you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="droplet">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="droplet">Droplet (VM)</TabsTrigger>
              <TabsTrigger value="domain">Domain</TabsTrigger>
            </TabsList>
            <TabsContent value="droplet">
              <CreateDropletForm />
            </TabsContent>
            <TabsContent value="domain">
              <CreateDomainForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
