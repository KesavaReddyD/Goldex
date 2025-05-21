'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a prediction (reuse your PredictionData type if available)
export interface PredictionData {
  shortTerm: {
    timeframe: string;
    trend: string;
    open: number;
    close: number;
    high: number;
    low: number;
    sentiment: {
      score: number;
      category: string;
      reasons: string;
    };
  };
  longTerm: {
    timeframe: string;
    trend: string;
    open: number;
    close: number;
    high: number;
    low: number;
    sentiment: {
      score: number;
      category: string;
      reasons: string;
    };
  };
  pricePrediction: string;
  sentimentScore: number;
  sentimentLabel: string;
  timestamp: string;
}

// Context type
interface PredictionContextType {
  prediction: PredictionData | null;
  setPrediction: (prediction: PredictionData | null) => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

// Provider component
export function PredictionProvider({ children }: { children: ReactNode }) {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  return (
    <PredictionContext.Provider value={{ prediction, setPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
}

// Hook to use the prediction context
export function usePrediction() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
} 