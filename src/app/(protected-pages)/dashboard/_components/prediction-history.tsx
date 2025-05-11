'use client';

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for MVP
const predictionStats = {
  total: 28,
  correct: 22,
  incorrect: 4,
  neutral: 2,
  accuracy: 78.57
};

const recentPredictions = [
  {
    id: "1",
    date: "May 14",
    prediction: "up",
    result: "up",
    asset: "Gold",
    status: "correct"
  },
  {
    id: "2",
    date: "May 13",
    prediction: "down",
    result: "down",
    asset: "Gold",
    status: "correct"
  },
  {
    id: "3",
    date: "May 12",
    prediction: "up",
    result: "flat",
    asset: "Gold",
    status: "neutral"
  },
  {
    id: "4",
    date: "May 11",
    prediction: "up",
    result: "down",
    asset: "Gold",
    status: "incorrect"
  },
  {
    id: "5",
    date: "May 10",
    prediction: "up",
    result: "up",
    asset: "Gold",
    status: "correct"
  }
];

export function PredictionHistory() {
  const { total, correct, incorrect, neutral, accuracy } = predictionStats;
  
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Accuracy Rate</span>
          <span className="font-bold">{accuracy.toFixed(1)}%</span>
        </div>
        <Progress value={accuracy} className="h-2" />
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-lg border p-2 text-center">
            <div className="text-emerald-500 dark:text-emerald-400 font-medium">{correct}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div className="rounded-lg border p-2 text-center">
            <div className="text-rose-500 dark:text-rose-400 font-medium">{incorrect}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>
          <div className="rounded-lg border p-2 text-center">
            <div className="text-amber-500 dark:text-amber-400 font-medium">{neutral}</div>
            <div className="text-xs text-muted-foreground">Neutral</div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-sm mb-2">Recent Predictions</h4>
        <div className="space-y-2">
          {recentPredictions.map((pred) => (
            <div key={pred.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                {pred.status === "correct" && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mr-2" />
                )}
                {pred.status === "incorrect" && (
                  <XCircle className="h-4 w-4 text-rose-500 dark:text-rose-400 mr-2" />
                )}
                {pred.status === "neutral" && (
                  <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-2" />
                )}
                <span className="text-sm">{pred.date}</span>
              </div>
              
              <div className="flex items-center">
                <div className="text-xs px-2 py-1 rounded">
                  Predicted: 
                  <span className={cn(
                    "ml-1 font-medium",
                    pred.prediction === "up" ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                  )}>
                    {pred.prediction.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-xs px-2 py-1 rounded">
                  Result:
                  <span className={cn(
                    "ml-1 font-medium",
                    pred.result === "up" ? "text-emerald-500 dark:text-emerald-400" : 
                    pred.result === "down" ? "text-rose-500 dark:text-rose-400" : 
                    "text-amber-500 dark:text-amber-400"
                  )}>
                    {pred.result.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 