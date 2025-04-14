"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { createDroplet } from "@/lib/api"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  size: z.string({
    required_error: "Please select a size.",
  }),
  image: z.string({
    required_error: "Please select an image.",
  }),
})

// Mock data for form options
const regions = [
  { value: "nyc1", label: "New York 1" },
  { value: "sfo2", label: "San Francisco 2" },
  { value: "ams3", label: "Amsterdam 3" },
  { value: "sgp1", label: "Singapore 1" },
  { value: "lon1", label: "London 1" },
]

const sizes = [
  { value: "s-1vcpu-1gb", label: "1 vCPU, 1GB RAM - $5/mo" },
  { value: "s-1vcpu-2gb", label: "1 vCPU, 2GB RAM - $10/mo" },
  { value: "s-2vcpu-2gb", label: "2 vCPU, 2GB RAM - $15/mo" },
  { value: "s-2vcpu-4gb", label: "2 vCPU, 4GB RAM - $20/mo" },
  { value: "s-4vcpu-8gb", label: "4 vCPU, 8GB RAM - $40/mo" },
]

const images = [
  { value: "ubuntu-20-04-x64", label: "Ubuntu 20.04 LTS" },
  { value: "debian-10-x64", label: "Debian 10" },
  { value: "centos-8-x64", label: "CentOS 8" },
  { value: "fedora-33-x64", label: "Fedora 33" },
  { value: "docker-20-x64", label: "Docker 20.10 on Ubuntu 20.04" },
]

export function CreateDropletForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      // In a real app, this would call the actual API
      await createDroplet(values)
      toast({
        title: "Droplet created",
        description: `${values.name} is being created. This may take a few minutes.`,
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to create droplet:", error)
      toast({
        variant: "destructive",
        title: "Error creating droplet",
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Droplet Name</FormLabel>
              <FormControl>
                <Input placeholder="web-server-prod-01" {...field} />
              </FormControl>
              <FormDescription>This is the hostname of your droplet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the datacenter region closest to your users.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating System</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an OS" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {images.map((image) => (
                    <SelectItem key={image.value} value={image.value}>
                      {image.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the operating system for your droplet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Droplet Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the CPU and RAM configuration.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Droplet"}
        </Button>
      </form>
    </Form>
  )
}
