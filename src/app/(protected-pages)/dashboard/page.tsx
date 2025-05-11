'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionCard } from "./_components/prediction-card";
// import { GoldChart } from "./_components/gold-chart";
import { NewsSummaries } from "./_components/news-summaries";
import { PredictionHistory } from "./_components/prediction-history";
import TradingViewWidget from "./_components/Tradingview";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            {/* Prediction Card */}
            <PredictionCard />
            
            {/* Gold Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Gold Price Chart</CardTitle>
                <CardDescription>Real-time gold price movement</CardDescription>
              </CardHeader>
              <CardContent className="pl-2 pb-2">
                <div className="h-full w-full">
                   <TradingViewWidget />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-4">
            {/* News Summaries */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Market News</CardTitle>
                <CardDescription>Latest news affecting gold prices</CardDescription>
              </CardHeader>
              <CardContent>
                <NewsSummaries />
              </CardContent>
            </Card>
            
            {/* Prediction History */}
            {/* <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Prediction Performance</CardTitle>
                <CardDescription>Accuracy of previous predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionHistory />
              </CardContent>
            </Card> */}
          </div>
          
          
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Trading History</CardTitle>
              <CardDescription>Your past trading insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Coming soon in the next phase.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Price Alerts</CardTitle>
              <CardDescription>Monitor price movements</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Coming soon in the next phase.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 