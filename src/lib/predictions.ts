import { prisma } from './prisma';

export interface SentimentData {
  score: number;
  category: string;
  reasons: string;
}

export interface PredictionTimeframe {
  timeframe: string;
  trend: string;
  open: number;
  close: number;
  high: number;
  low: number;
  sentiment: SentimentData;
}

export interface PredictionData {
  shortTerm: PredictionTimeframe;
  longTerm: PredictionTimeframe;
  pricePrediction: string;
  sentimentScore: number;
  sentimentLabel: string;
  timestamp: string;
}

export async function savePrediction(predictionData: PredictionData, userId: string) {
  try {
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
        userId: userId
      }
    });
    
    return prediction;
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw error;
  }
}

export async function getUserPredictions(userId: string) {
  try {
    const predictions = await prisma.prediction.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
    
    return predictions;
  } catch (error) {
    console.error('Error fetching user predictions:', error);
    throw error;
  }
} 