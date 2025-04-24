
// Mock data and API functions
// In a real app, these would make actual API calls to DigitalOcean
  
 
const apiurl = process.env.NEXT_PUBLIC_API_URL;
// Mock overview data
export async function fetchOverviewData() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    totalResources: 12,
    cpuUsage: 42,
    memoryUsage: 58,
    totalUptime: "14d 7h 32m",
  }
}


export async function createdroplet(dropletData:any) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiKey || !apiurl) {
    throw new Error("API key or URL is not defined");
  }

  // Default droplet parameters if not provided
  const payload = {
    name: dropletData?.name || "my-droplet",
    region: dropletData?.region || "nyc3", // example region
    size: dropletData?.size || "s-1vcpu-1gb", // example size
    image: dropletData?.image || "ubuntu-20-04-x64", // image slug
    backups: false,
    ipv6: true,
    user_data: null,
    monitoring: true,
    tags: ["frontend-droplet"],
  };

  try {
    const response = await fetch(`${apiurl}/droplets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create droplet:", errorData);
      throw new Error(`Droplet creation failed: ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log("Droplet created successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error in createDroplet:", error);
    return { error: true, message: (error as Error).message };
  }
}

 
 
export async function fetchResources(type: "droplets" | "databases" | "domains") {
  const dropletsMock = [
    {
      id: "droplet-1",
      name: "web-server-prod-01",
      type: "droplet",
      region: "nyc1",
      status: "active",
      cpuUsage: 42,
      memoryUsage: 58,
      createdAt: "2023-01-15T10:00:00Z",
      cost: { hourly: 0.0119, monthly: 10 },
    },
    {
      id: "droplet-2",
      name: "db-server-prod-01",
      type: "droplet",
      region: "sfo2",
      status: "active",
      cpuUsage: 78,
      memoryUsage: 82,
      createdAt: "2023-02-20T14:30:00Z",
      cost: { hourly: 0.0238, monthly: 20 },
    },
    {
      id: "droplet-3",
      name: "cache-server-prod-01",
      type: "droplet",
      region: "ams3",
      status: "off",
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: "2023-03-10T09:15:00Z",
      cost: { hourly: 0.0119, monthly: 10 },
    },
  ]

  const databasesMock = [
    {
      id: "db-1",
      name: "postgres-prod-01",
      type: "database",
      region: "nyc1",
      status: "active",
      cpuUsage: 35,
      memoryUsage: 42,
      createdAt: "2023-01-25T13:10:00Z",
      cost: { hourly: 0.0595, monthly: 50 },
    },
  ]

  const domainsMock = [
    {
      id: "domain-1",
      name: "example.com",
      type: "domain",
      region: "Global",
      status: "active",
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: "2023-01-05T11:20:00Z",
      cost: { hourly: 0, monthly: 0 },
    },
    {
      id: "domain-2",
      name: "test-api.com",
      type: "domain",
      region: "Global",
      status: "active",
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: "2023-02-15T16:45:00Z",
      cost: { hourly: 0, monthly: 0 },
    },
    {
      id: "domain-3",
      name: "anjali.com",
      type: "domain",
      region: "Global",
      status: "active",
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: "2023-02-20T12:00:00Z",
      cost: { hourly: 0, monthly: 0 },
    },
  ]

  const fetchFromDO = async (endpoint: string): Promise<any[]> => {
    try {
 
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      if (!apiKey) {
        throw new Error('API key is not defined');
      }
      
      const res = await fetch(`${apiurl}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      
  

      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)

      const data = await res.json()
      console.log(`Fetched ${endpoint}:`, data);
      console.log(`Fetched data of this ${endpoint}:`, data[endpoint]);
      
      return data[endpoint] || []
    } catch (error) {
      console.warn(`Error fetching ${endpoint}:`, error)
      return []
    }
  }

  if (type === "droplets") {
    const dropletsRes = await fetchFromDO("droplets")
    console.log("Fetched droplets:", dropletsRes)
    const droplets = dropletsRes.map((d: any) => ({
      id: d.id.toString(),
      name: d.name,
      type: "droplet",
      region: d.region?.slug || "unknown",
      status: d.status || "unknown",
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      createdAt: d.created_at || new Date().toISOString(),
      cost: {
        hourly: 0.0119,
        monthly: 10,
      },
    }))

    return {
      fetched: droplets,
      defaults: dropletsMock,
    }
  }

  if (type === "databases") {
    const dbRes = await fetchFromDO("databases")
    console.log("Fetched databases:", dbRes)
    
    const databases = dbRes.map((db: any) => (
      
      { 
      
      id: db.id || "db-" + Math.random(),
      name: db.name,
      type: "database",
      region: db.region || "unknown",
      status: db.status || "active",
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      createdAt: db.created_at || new Date().toISOString(),
      cost: {
        hourly: 0.0595,
        monthly: 50,
      },
    }))

    return {
      fetched: databases,
      defaults: databasesMock,
    }
  }

  if (type === "domains") {
    const domainsRes = await fetchFromDO("domains")
    console.log("Fetched domains:", domainsRes)
    const domains = domainsRes.map((domain: any, i: number) => ({
      id: "domain-" + (i + 100),
      name: domain.name,
      type: "domain",
      region: "Global",
      status: "active",
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: new Date().toISOString(),
      cost: {
        hourly: 0,
        monthly: 0,
      },
    }))

    return {
      fetched: domains,
      defaults: domainsMock,
    }
  }

  return { fetched: [], defaults: [] }
}


// Mock resource details
export async function fetchResourceDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock CPU and memory history data
  const generateHistoryData = () => {
    const now = Date.now()
    const data = []
    for (let i = 0; i < 24; i++) {
      data.push({
        timestamp: now - (23 - i) * 3600 * 1000,
        value: Math.floor(Math.random() * 60) + 20,
      })
    }
    return data
  }

  // Mock resource details based on ID
  if (id === "droplet-1") {
    return {
      id: "droplet-1",
      name: "web-server-prod-01",
      type: "droplet",
      region: "nyc1",
      status: "active",
      createdAt: "2023-01-15T10:00:00Z",
      cost: {
        hourly: 0.0119,
        monthly: 10,
      },
      hardware: {
        vcpus: 1,
        memory: 2,
        disk: 50,
        storageType: "SSD",
      },
      metrics: {
        cpu: {
          current: 42,
          average: 38,
          peak: 87,
          history: generateHistoryData(),
        },
        memory: {
          current: 58,
          average: 52,
          peak: 76,
          history: generateHistoryData(),
        },
      },
      ipAddress: "192.168.1.101",
      logs: [
        "2023-04-15T10:00:00Z [INFO] System started",
        "2023-04-15T10:05:23Z [INFO] Nginx service started",
        "2023-04-15T11:15:45Z [WARN] High CPU usage detected",
        "2023-04-15T12:30:12Z [INFO] Backup completed successfully",
        "2023-04-15T14:22:36Z [ERROR] Failed to connect to database",
        "2023-04-15T14:25:18Z [INFO] Database connection restored",
        "2023-04-15T16:45:02Z [INFO] System update available",
        "2023-04-15T18:12:45Z [INFO] Scheduled maintenance started",
        "2023-04-15T18:30:22Z [INFO] Scheduled maintenance completed",
      ],
    }
  } else if (id === "domain-1") {
    return {
      id: "domain-1",
      name: "example.com",
      type: "domain",
      region: "Global",
      status: "active",
      createdAt: "2023-01-05T11:20:00Z",
      cost: {
        hourly: 0,
        monthly: 0,
      },
      hardware: {
        vcpus: 0,
        memory: 0,
        disk: 0,
        storageType: "N/A",
      },
      metrics: {
        cpu: {
          current: 0,
          average: 0,
          peak: 0,
          history: Array(24)
            .fill(0)
            .map((_, i) => ({
              timestamp: Date.now() - (23 - i) * 3600 * 1000,
              value: 0,
            })),
        },
        memory: {
          current: 0,
          average: 0,
          peak: 0,
          history: Array(24)
            .fill(0)
            .map((_, i) => ({
              timestamp: Date.now() - (23 - i) * 3600 * 1000,
              value: 0,
            })),
        },
      },
      ipAddress: "192.168.1.100",
    }
  } else if (id === "db-1") {
    return {
      id: "db-1",
      name: "postgres-prod-01",
      type: "database",
      region: "nyc1",
      status: "active",
      createdAt: "2023-01-25T13:10:00Z",
      cost: {
        hourly: 0.0595,
        monthly: 50,
      },
      hardware: {
        vcpus: 2,
        memory: 4,
        disk: 100,
        storageType: "SSD",
      },
      metrics: {
        cpu: {
          current: 35,
          average: 32,
          peak: 68,
          history: generateHistoryData(),
        },
        memory: {
          current: 42,
          average: 40,
          peak: 65,
          history: generateHistoryData(),
        },
      },
      logs: [
        "2023-04-15T10:00:00Z [INFO] Database started",
        "2023-04-15T10:05:23Z [INFO] Connection pool initialized",
        "2023-04-15T11:15:45Z [WARN] Slow query detected",
        "2023-04-15T12:30:12Z [INFO] Backup completed successfully",
        "2023-04-15T14:22:36Z [ERROR] Connection timeout",
        "2023-04-15T14:25:18Z [INFO] Connection restored",
        "2023-04-15T16:45:02Z [INFO] Index optimization completed",
        "2023-04-15T18:12:45Z [INFO] Vacuum process started",
        "2023-04-15T18:30:22Z [INFO] Vacuum process completed",
      ],
    }
  }

  // Default fallback
  return {
    id: id,
    name: "Unknown Resource",
    type: "unknown",
    region: "unknown",
    status: "unknown",
    createdAt: new Date().toISOString(),
    cost: {
      hourly: 0,
      monthly: 0,
    },
    hardware: {
      vcpus: 0,
      memory: 0,
      disk: 0,
      storageType: "unknown",
    },
    metrics: {
      cpu: {
        current: 0,
        average: 0,
        peak: 0,
        history: generateHistoryData(),
      },
      memory: {
        current: 0,
        average: 0,
        peak: 0,
        history: generateHistoryData(),
      },
    },
  }
}
export const createDroplet  = async (dropletData) => {
  console.log("Creating droplet with data:", dropletData);
  
  if(!dropletData) {
   dropletData = {
    name: "new-droplet",
    region: "nyc3",
    size: "s-1vcpu-1gb",
    image: "ubuntu-20-04-x64",
  };
  }
  const response = await createdroplet(dropletData);
  if (response.error) {
    alert(`Error: ${response.message}`);
  } else {
    alert("Droplet created successfully!");
  }
};
 

// Mock delete resource
export async function deleteResource(id: string, type: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log(`Deleting ${type} with ID: ${id}`)
  return { success: true }
}
