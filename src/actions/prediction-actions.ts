'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

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

export async function savePredictionAction(predictionData: PredictionData) {
  try {
    // Get the current authenticated user
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const prediction = await prisma.prediction.create({
      data: {
        timestamp: new Date(predictionData.timestamp),
        sentimentScore: predictionData.sentimentScore,
        sentimentLabel: predictionData.sentimentLabel,
        pricePrediction: predictionData.pricePrediction,
        
        // Short term data
        shortTermTimeframe: predictionData.shortTerm.timeframe,
        shortTermTrend: predictionData.shortTerm.trend,
        shortTermOpen: predictionData.shortTerm.open,
        shortTermClose: predictionData.shortTerm.close,
        shortTermHigh: predictionData.shortTerm.high,
        shortTermLow: predictionData.shortTerm.low,
        shortTermSentimentScore: predictionData.shortTerm.sentiment.score,
        shortTermSentimentCategory: predictionData.shortTerm.sentiment.category,
        shortTermSentimentReasons: predictionData.shortTerm.sentiment.reasons,
        
        // Long term data
        longTermTimeframe: predictionData.longTerm.timeframe,
        longTermTrend: predictionData.longTerm.trend,
        longTermOpen: predictionData.longTerm.open,
        longTermClose: predictionData.longTerm.close,
        longTermHigh: predictionData.longTerm.high,
        longTermLow: predictionData.longTerm.low,
        longTermSentimentScore: predictionData.longTerm.sentiment.score,
        longTermSentimentCategory: predictionData.longTerm.sentiment.category,
        longTermSentimentReasons: predictionData.longTerm.sentiment.reasons,
        
        // User relation
        userId: user.id
      }
    });
    
    return { success: true, prediction };
  } catch (error) {
    console.error('Error saving prediction:', error);
    return { success: false, error: String(error) };
  }
}

export async function getUserPredictionsAction() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const predictions = await prisma.prediction.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
    
    return { success: true, predictions };
  } catch (error) {
    console.error('Error fetching user predictions:', error);
    return { success: false, error: String(error) };
  }
} 