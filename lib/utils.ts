import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// // Mock data and API functions
// // In a real app, these would make actual API calls to DigitalOcean

// // Mock overview data
// export async function fetchOverviewData() {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   return {
//     totalResources: 12,
//     cpuUsage: 42,
//     memoryUsage: 58,
//     totalUptime: "14d 7h 32m",
//   }
// }
 
// export async function fetchResources(type = "all") {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 800))

//   const droplets = [
//     {
//       id: "droplet-1",
//       name: "web-server-prod-01",
//       type: "droplet",
//       region: "nyc1",
//       status: "active",
//       cpuUsage: 42,
//       memoryUsage: 58,
//       createdAt: "2023-01-15T10:00:00Z",
//       cost: {
//         hourly: 0.0119,
//         monthly: 10,
//       },
//     },
//     {
//       id: "droplet-2",
//       name: "db-server-prod-01",
//       type: "droplet",
//       region: "sfo2",
//       status: "active",
//       cpuUsage: 78,
//       memoryUsage: 82,
//       createdAt: "2023-02-20T14:30:00Z",
//       cost: {
//         hourly: 0.0238,
//         monthly: 20,
//       },
//     },
//     {
//       id: "droplet-3",
//       name: "cache-server-prod-01",
//       type: "droplet",
//       region: "ams3",
//       status: "off",
//       cpuUsage: 0,
//       memoryUsage: 0,
//       createdAt: "2023-03-10T09:15:00Z",
//       cost: {
//         hourly: 0.0119,
//         monthly: 10,
//       },
//     },
//   ]

//   const domains = [
//     {
//       id: "domain-1",
//       name: "example.com",
//       type: "domain",
//       region: "Global",
//       status: "active",
//       cpuUsage: 0,
//       memoryUsage: 0,
//       createdAt: "2023-01-05T11:20:00Z",
//       cost: {
//         hourly: 0,
//         monthly: 0,
//       },
//     },
//     {
//       id: "domain-2",
//       name: "test-api.com",
//       type: "domain",
//       region: "Global",
//       status: "active",
//       cpuUsage: 0,
//       memoryUsage: 0,
//       createdAt: "2023-02-15T16:45:00Z",
//       cost: {
//         hourly: 0,
//         monthly: 0,
//       },
//     },
//   ]

//   const databases = [
//     {
//       id: "db-1",
//       name: "postgres-prod-01",
//       type: "database",
//       region: "nyc1",
//       status: "active",
//       cpuUsage: 35,
//       memoryUsage: 42,
//       createdAt: "2023-01-25T13:10:00Z",
//       cost: {
//         hourly: 0.0595,
//         monthly: 50,
//       },
//     },
//   ]

//   // Filter resources based on type
//   if (type === "all") {
//     return [...droplets, ...domains, ...databases]
//   } else if (type === "droplets") {
//     return droplets
//   } else if (type === "domains") {
//     return domains
//   } else if (type === "databases") {
//     return databases
//   }

//   return []
// }

// // Mock resource details
// export async function fetchResourceDetails(id: string) {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Generate mock CPU and memory history data
//   const generateHistoryData = () => {
//     const now = Date.now()
//     const data = []
//     for (let i = 0; i < 24; i++) {
//       data.push({
//         timestamp: now - (23 - i) * 3600 * 1000,
//         value: Math.floor(Math.random() * 60) + 20,
//       })
//     }
//     return data
//   }

//   // Mock resource details based on ID
//   if (id === "droplet-1") {
//     return {
//       id: "droplet-1",
//       name: "web-server-prod-01",
//       type: "droplet",
//       region: "nyc1",
//       status: "active",
//       createdAt: "2023-01-15T10:00:00Z",
//       cost: {
//         hourly: 0.0119,
//         monthly: 10,
//       },
//       hardware: {
//         vcpus: 1,
//         memory: 2,
//         disk: 50,
//         storageType: "SSD",
//       },
//       metrics: {
//         cpu: {
//           current: 42,
//           average: 38,
//           peak: 87,
//           history: generateHistoryData(),
//         },
//         memory: {
//           current: 58,
//           average: 52,
//           peak: 76,
//           history: generateHistoryData(),
//         },
//       },
//       ipAddress: "192.168.1.101",
//       logs: [
//         "2023-04-15T10:00:00Z [INFO] System started",
//         "2023-04-15T10:05:23Z [INFO] Nginx service started",
//         "2023-04-15T11:15:45Z [WARN] High CPU usage detected",
//         "2023-04-15T12:30:12Z [INFO] Backup completed successfully",
//         "2023-04-15T14:22:36Z [ERROR] Failed to connect to database",
//         "2023-04-15T14:25:18Z [INFO] Database connection restored",
//         "2023-04-15T16:45:02Z [INFO] System update available",
//         "2023-04-15T18:12:45Z [INFO] Scheduled maintenance started",
//         "2023-04-15T18:30:22Z [INFO] Scheduled maintenance completed",
//       ],
//     }
//   } else if (id === "domain-1") {
//     return {
//       id: "domain-1",
//       name: "example.com",
//       type: "domain",
//       region: "Global",
//       status: "active",
//       createdAt: "2023-01-05T11:20:00Z",
//       cost: {
//         hourly: 0,
//         monthly: 0,
//       },
//       hardware: {
//         vcpus: 0,
//         memory: 0,
//         disk: 0,
//         storageType: "N/A",
//       },
//       metrics: {
//         cpu: {
//           current: 0,
//           average: 0,
//           peak: 0,
//           history: Array(24)
//             .fill(0)
//             .map((_, i) => ({
//               timestamp: Date.now() - (23 - i) * 3600 * 1000,
//               value: 0,
//             })),
//         },
//         memory: {
//           current: 0,
//           average: 0,
//           peak: 0,
//           history: Array(24)
//             .fill(0)
//             .map((_, i) => ({
//               timestamp: Date.now() - (23 - i) * 3600 * 1000,
//               value: 0,
//             })),
//         },
//       },
//       ipAddress: "192.168.1.100",
//     }
//   } else if (id === "db-1") {
//     return {
//       id: "db-1",
//       name: "postgres-prod-01",
//       type: "database",
//       region: "nyc1",
//       status: "active",
//       createdAt: "2023-01-25T13:10:00Z",
//       cost: {
//         hourly: 0.0595,
//         monthly: 50,
//       },
//       hardware: {
//         vcpus: 2,
//         memory: 4,
//         disk: 100,
//         storageType: "SSD",
//       },
//       metrics: {
//         cpu: {
//           current: 35,
//           average: 32,
//           peak: 68,
//           history: generateHistoryData(),
//         },
//         memory: {
//           current: 42,
//           average: 40,
//           peak: 65,
//           history: generateHistoryData(),
//         },
//       },
//       logs: [
//         "2023-04-15T10:00:00Z [INFO] Database started",
//         "2023-04-15T10:05:23Z [INFO] Connection pool initialized",
//         "2023-04-15T11:15:45Z [WARN] Slow query detected",
//         "2023-04-15T12:30:12Z [INFO] Backup completed successfully",
//         "2023-04-15T14:22:36Z [ERROR] Connection timeout",
//         "2023-04-15T14:25:18Z [INFO] Connection restored",
//         "2023-04-15T16:45:02Z [INFO] Index optimization completed",
//         "2023-04-15T18:12:45Z [INFO] Vacuum process started",
//         "2023-04-15T18:30:22Z [INFO] Vacuum process completed",
//       ],
//     }
//   }

//   // Default fallback
//   return {
//     id: id,
//     name: "Unknown Resource",
//     type: "unknown",
//     region: "unknown",
//     status: "unknown",
//     createdAt: new Date().toISOString(),
//     cost: {
//       hourly: 0,
//       monthly: 0,
//     },
//     hardware: {
//       vcpus: 0,
//       memory: 0,
//       disk: 0,
//       storageType: "unknown",
//     },
//     metrics: {
//       cpu: {
//         current: 0,
//         average: 0,
//         peak: 0,
//         history: generateHistoryData(),
//       },
//       memory: {
//         current: 0,
//         average: 0,
//         peak: 0,
//         history: generateHistoryData(),
//       },
//     },
//   }
// }

// // Mock create droplet
// export async function createDroplet(data: any) {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   console.log("Creating droplet:", data)
//   return { success: true, id: "new-droplet-id" }
// }

 

// // Mock delete resource
// export async function deleteResource(id: string, type: string) {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 1500))

//   console.log(`Deleting ${type} with ID: ${id}`)
//   return { success: true }
// }
