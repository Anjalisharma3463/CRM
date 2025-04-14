"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateDropletForm } from "@/components/create-droplet-form" 
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
          <CardTitle>Create a New DropLet</CardTitle>
         </CardHeader>
        <CardContent>
               <CreateDropletForm />
                    
        </CardContent>
      </Card>
    </div>
  )
}
