'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, Newspaper, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type PredictionData = {
  direction: "up" | "down";
  confidence: number;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  timestamp: string;
  supportingFactor: string;
};

export function PredictionCard() {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchPrediction() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/prediction');
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setPredictionData(data);
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError(err instanceof Error ? err.message : 'Failed to load prediction data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPrediction();
  }, []);

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/20">
          <CardTitle>Gold Prediction</CardTitle>
          <CardDescription>Loading forecast...</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-center h-[144px]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
            <p className="text-sm text-muted-foreground">Analyzing market data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error || !predictionData) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/20">
          <CardTitle>Gold Prediction</CardTitle>
          <CardDescription>Forecast unavailable</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-4">
            <p>Unable to load prediction data.</p>
            <p className="text-sm mt-1">{error || "Please try again later."}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { direction, confidence, price, priceChange, priceChangePercent, supportingFactor } = predictionData;
  const isUp = direction === "up";
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn(
        "pb-2",
        isUp ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-rose-50 dark:bg-rose-900/20"
      )}>
        <div className="flex justify-between items-center">
          <CardTitle>Gold Prediction</CardTitle>
          <Badge 
            variant={isUp ? "default" : "destructive"}
            className={cn(
              "text-xs",
              isUp && "bg-emerald-500 hover:bg-emerald-600 text-white"
            )}
          >
            {confidence.toFixed(0)}% Confidence
          </Badge>
        </div>
        <CardDescription>
          Next 24-hour forecast
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">${price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className={cn(
                "text-sm font-medium flex items-center",
                isUp ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500"
              )}>
                {isUp ? <ArrowUpCircle className="mr-1 h-4 w-4" /> : <ArrowDownCircle className="mr-1 h-4 w-4" />}
                {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isUp ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-rose-100 dark:bg-rose-900/30"
          )}>
            {isUp 
              ? <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              : <TrendingUp className="h-8 w-8 text-rose-600 dark:text-rose-500 transform rotate-180" />
            }
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium flex items-center mb-2">
            <Newspaper className="mr-2 h-4 w-4 text-muted-foreground" /> 
            Supporting Factor
          </h4>
          <p className="text-sm text-muted-foreground">{supportingFactor}</p>
        </div>
      </CardContent>
    </Card>
  );
} 