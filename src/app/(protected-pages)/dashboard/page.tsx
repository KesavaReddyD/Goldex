import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { getCurrentUser } from '@/lib/auth';
import { EmptyPlaceholder } from '../_components/empty-placeholder';

export const metadata: Metadata = {
  title: 'Dashboard - Goldex',
  description: 'View your trading recommendations and market insights',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Here&apos;s your trading overview.
        </p>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Gold</CardTitle>
                <CardDescription>Current recommendation</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyPlaceholder
                  title="No Recommendations Yet"
                  description="Recommendations will appear here once the analysis engine is integrated."
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Updated: Not available
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">EUR/USD</CardTitle>
                <CardDescription>Current recommendation</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyPlaceholder
                  title="No Recommendations Yet"
                  description="Recommendations will appear here once the analysis engine is integrated."
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Updated: Not available
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">USD/JPY</CardTitle>
                <CardDescription>Current recommendation</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyPlaceholder
                  title="No Recommendations Yet"
                  description="Recommendations will appear here once the analysis engine is integrated."
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Updated: Not available
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>
                Global market trends and indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EmptyPlaceholder
                title="Market Data Coming Soon"
                description="Real-time market data will be displayed here."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Alerts</CardTitle>
            <CardDescription>Recent price and news alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyPlaceholder
              title="No Alerts Set"
              description="Set up alerts to get notified about price movements or market events."
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Track recommendation accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyPlaceholder
              title="No Performance Data"
              description="Performance metrics will appear once recommendations are generated."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 