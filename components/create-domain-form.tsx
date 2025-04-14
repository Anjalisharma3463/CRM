"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { createDomain } from "@/lib/api"

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Domain name must be at least 3 characters.",
    })
    .refine((value) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(value), {
      message: "Please enter a valid domain name.",
    }),
  ipAddress: z
    .string()
    .min(7, {
      message: "IP address is required.",
    })
    .refine((value) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value), {
      message: "Please enter a valid IPv4 address.",
    }),
})

export function CreateDomainForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ipAddress: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      // In a real app, this would call the actual API
      await createDomain(values)
      toast({
        title: "Domain created",
        description: `${values.name} has been added to your account.`,
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to create domain:", error)
      toast({
        variant: "destructive",
        title: "Error creating domain",
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
              <FormLabel>Domain Name</FormLabel>
              <FormControl>
                <Input placeholder="example.com" {...field} />
              </FormControl>
              <FormDescription>Enter the domain name you want to add.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ipAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input placeholder="192.168.1.1" {...field} />
              </FormControl>
              <FormDescription>Enter the IP address to point this domain to.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Add Domain"}
        </Button>
      </form>
    </Form>
  )
}
