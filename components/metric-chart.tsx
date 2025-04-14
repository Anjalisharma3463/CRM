"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type MetricChartProps = {
  data: { timestamp: number; value: number }[]
}

export function MetricChart({ data }: MetricChartProps) {
  // Format the data for the chart
  const formattedData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    value: point.value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Time</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.time}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#0284c7" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
