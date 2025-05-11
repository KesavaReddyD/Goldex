'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

// Mock data for MVP
const mockDailyData = Array(14).fill(null).map((_, i) => {
  const basePrice = 2330;
  const date = new Date();
  date.setDate(date.getDate() - (14 - i));
  
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: basePrice + Math.random() * 30 - 10 + (i * 2),
  };
});

const mockHourlyData = Array(24).fill(null).map((_, i) => {
  const basePrice = 2340;
  const date = new Date();
  date.setHours(date.getHours() - (24 - i));
  
  return {
    date: date.toLocaleTimeString('en-US', { hour: '2-digit' }),
    price: basePrice + Math.random() * 20 - 10,
  };
});

type TimeRange = '24h' | '7d' | '14d';

export function GoldChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const { theme } = useTheme();
  
  const chartData = timeRange === '24h' ? mockHourlyData : mockDailyData;
  const isDark = theme === 'dark';
  
  const lineColor = '#f59e0b'; // Amber color for gold
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  
  return (
    <div className="w-full h-full">
      <div className="mb-4 flex gap-2">
        <Button 
          variant={timeRange === '24h' ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeRange('24h')}
        >
          24h
        </Button>
        <Button 
          variant={timeRange === '7d' ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeRange('7d')}
        >
          7d
        </Button>
        <Button 
          variant={timeRange === '14d' ? "default" : "outline"} 
          size="sm" 
          onClick={() => setTimeRange('14d')}
        >
          14d
        </Button>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: textColor }} 
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              tick={{ fill: textColor }} 
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : '#ffffff', 
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '4px',
                color: isDark ? '#e5e7eb' : '#111827'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={lineColor} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: lineColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 