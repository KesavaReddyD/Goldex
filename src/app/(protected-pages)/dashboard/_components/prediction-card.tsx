"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SentimentData {
  score: number;
  category: string;
  reasons: string;
}

interface PredictionTimeframe {
  timeframe: string;
  trend: string;
  open: number;
  close: number;
  high: number;
  low: number;
  sentiment: SentimentData;
}

interface PredictionData {
  shortTerm: PredictionTimeframe;
  longTerm: PredictionTimeframe;
  pricePrediction: string;
  sentimentScore: number;
  sentimentLabel: string;
  timestamp: string;
}

export function PredictionCard() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("https://vamsireddy143.app.n8n.cloud/webhook/aff5b910-b6fa-4725-9c4e-2c128c036e86", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can add a body here if needed by the API
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch prediction: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      setPrediction(data);
      
      // Save prediction to the database using server action
      // try {
      //   const saveResult = await savePredictionAction(data);
      //   if (!saveResult.success) {
      //     console.error("Error saving prediction:", saveResult.error);
      //     // Don't show this error to the user as the prediction was successfully fetched
      //   } else {
      //     console.log("Prediction saved to database");
      //   }
      // } catch (saveError) {
      //   console.error("Error saving prediction:", saveError);
      // }
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError(err instanceof Error ? err.message : "Failed to load prediction data");
      toast.error("Failed to load prediction", {
        description: "There was an error fetching the prediction data."
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSentimentColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "positive": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "negative": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "neutral": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend.toLowerCase().includes("bullish")) {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else if (trend.toLowerCase().includes("bearish")) {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Show the initial state with a button to fetch predictions
  if (!prediction && !loading && !error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Gold Price Prediction</CardTitle>
          <CardDescription>Get the latest gold price forecast</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <Button onClick={fetchPrediction}>Predict Gold Prices</Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle><Skeleton className="h-8 w-3/4" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Prediction Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 dark:text-red-400">Failed to load prediction data: {error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={fetchPrediction}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }

  if (!prediction) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gold Price Prediction</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1" /> 
              Updated {formatDate(prediction.timestamp)}
            </CardDescription>
          </div>
          <Badge 
            className={`${getSentimentColor(prediction.sentimentLabel)} px-3 py-1`}
          >
            {prediction.sentimentLabel} ({prediction.sentimentScore.toFixed(1)})
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        
        {/* Short Term Prediction */}
        <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4">
          <div className="flex items-center mb-2">
            <h3 className="font-medium flex-grow">Short Term Outlook</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              {getTrendIcon(prediction.shortTerm.trend)}
              {prediction.shortTerm.trend}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{prediction.shortTerm.timeframe}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
              <p className="font-medium">${prediction.shortTerm.open.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Close</p>
              <p className="font-medium">${prediction.shortTerm.close.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
              <p className="font-medium">${prediction.shortTerm.high.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
              <p className="font-medium">${prediction.shortTerm.low.toFixed(1)}</p>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Sentimental Analysis:</p>
              <p className="font-medium">{prediction.shortTerm.sentiment.reasons}</p>
            </div>
            {/* <p className="text-xs font-medium mb-1">Sentimental Analysis:</p>
            <div className="text-xs pl-4 space-y-1">
              
            </div> */}
          </div>
        </div>
        
        {/* Long Term Prediction */}
        <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4">
          <div className="flex items-center mb-2">
            <h3 className="font-medium flex-grow">Long Term Outlook</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              {getTrendIcon(prediction.longTerm.trend)}
              {prediction.longTerm.trend}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{prediction.longTerm.timeframe}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
              <p className="font-medium">${prediction.longTerm.open.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Close</p>
              <p className="font-medium">${prediction.longTerm.close.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
              <p className="font-medium">${prediction.longTerm.high.toFixed(1)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
              <p className="font-medium">${prediction.longTerm.low.toFixed(1)}</p>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Sentimental Analysis:</p>
              <p className="font-medium">{prediction.longTerm.sentiment.reasons}</p>
            </div>
            {/* <p className="text-xs font-medium mb-1">Sentimental Analysis:</p>
            <div className="text-xs pl-4 space-y-1">
              {prediction.longTerm.sentiment.reasons}
            </div> */}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Summary</h3>
          <p className="text-sm">{prediction.pricePrediction}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={fetchPrediction} disabled={loading} className="w-full">
          {loading ? "Loading..." : "Refresh Prediction"}
        </Button>
      </CardFooter>
    </Card>
  );
}
