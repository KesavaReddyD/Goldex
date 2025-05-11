import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';

// Environment variables
const GEMINI_KEY = process.env.GEMINI_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-pro';

// Initialize the Google GenAI client only if API key is available
const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;

// Types
type GoldPriceData = {
  date: Date;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  changePercent: number | null;
}

type TechnicalIndicators = {
  rsi: number | null;
  macd: number | null;
  ma50: number | null;
  ma200: number | null;
  bollinger: {
    upper: number | null;
    middle: number | null;
    lower: number | null;
  };
}

type MacroEconomic = {
  usdIndex: number | null;
  interestRates: number | null;
  inflation: number | null;
  marketSentiment: "bullish" | "bearish" | "neutral";
}

type NewsSentiment = {
  overall: "bullish" | "bearish" | "neutral";
  confidence: number;
  topFactors: string[];
}

type PredictionResponse = {
  direction: "up" | "down";
  confidence: number;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  timestamp: string;
  supportingFactor: string;
}

/**
 * Fetch recent gold price data from database
 */
async function fetchGoldPriceData(days: number = 30): Promise<GoldPriceData[]> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const goldPrices = await prisma.goldPrice.findMany({
      where: {
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    return goldPrices;
  } catch (error) {
    console.error('Error fetching gold price data:', error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Calculate technical indicators based on historical data
 */
function calculateTechnicalIndicators(priceData: GoldPriceData[]): TechnicalIndicators {
  if (priceData.length < 14) {
    return {
      rsi: null,
      macd: null,
      ma50: null,
      ma200: null,
      bollinger: { upper: null, middle: null, lower: null }
    };
  }
  
  // Get closing prices
  const closingPrices = priceData.map(p => p.closePrice);
  
  // Simple implementation of RSI (14-period)
  const rsi = calculateRSI(closingPrices);
  
  // Simple moving averages
  const ma50 = priceData.length >= 50 
    ? closingPrices.slice(-50).reduce((sum, price) => sum + price, 0) / 50 
    : null;
  
  const ma200 = priceData.length >= 200 
    ? closingPrices.slice(-200).reduce((sum, price) => sum + price, 0) / 200 
    : null;
  
  // MACD (12, 26, 9)
  const macd = calculateMACD(closingPrices);
  
  // Bollinger Bands (20-period, 2 standard deviations)
  const bollinger = calculateBollingerBands(closingPrices);
  
  return {
    rsi,
    macd,
    ma50,
    ma200,
    bollinger
  };
}

/**
 * Calculate RSI (Relative Strength Index)
 */
function calculateRSI(prices: number[]): number {
  if (prices.length < 14) return 50; // Not enough data, return neutral
  
  const changes = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }
  
  const last14Changes = changes.slice(-14);
  
  let gains = 0;
  let losses = 0;
  
  for (const change of last14Changes) {
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change; // Convert to positive
    }
  }
  
  const avgGain = gains / 14;
  const avgLoss = losses / 14;
  
  if (avgLoss === 0) return 100; // Prevent division by zero
  
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));
  
  return parseFloat(rsi.toFixed(2));
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 */
function calculateMACD(prices: number[]): number | null {
  if (prices.length < 26) return null; // Not enough data
  
  // Calculate 12-day EMA
  const ema12 = calculateEMA(prices, 12);
  
  // Calculate 26-day EMA
  const ema26 = calculateEMA(prices, 26);
  
  // MACD Line = 12-day EMA - 26-day EMA
  return ema12 - ema26;
}

/**
 * Calculate EMA (Exponential Moving Average)
 */
function calculateEMA(prices: number[], period: number): number {
  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;
  
  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  
  return ema;
}

/**
 * Calculate Bollinger Bands
 */
function calculateBollingerBands(prices: number[]): { upper: number | null, middle: number | null, lower: number | null } {
  if (prices.length < 20) {
    return { upper: null, middle: null, lower: null };
  }
  
  const last20Prices = prices.slice(-20);
  
  // Calculate middle band (20-day SMA)
  const sma = last20Prices.reduce((sum, price) => sum + price, 0) / 20;
  
  // Calculate standard deviation
  const sumSquaredDiffs = last20Prices.reduce((sum, price) => {
    const diff = price - sma;
    return sum + diff * diff;
  }, 0);
  
  const stdDev = Math.sqrt(sumSquaredDiffs / 20);
  
  // Calculate upper and lower bands (2 standard deviations)
  const upper = sma + 2 * stdDev;
  const lower = sma - 2 * stdDev;
  
  return {
    upper: parseFloat(upper.toFixed(2)),
    middle: parseFloat(sma.toFixed(2)),
    lower: parseFloat(lower.toFixed(2))
  };
}

/**
 * Get latest macroeconomic data
 * Note: In a real app, this would fetch from an economic data API
 * For demo purposes, using approximated data
 */
async function getMacroeconomicData(): Promise<MacroEconomic> {
  // In a real implementation, fetch from an external API
  // For this MVP, we'll use approximated values
  return {
    usdIndex: 103.2,
    interestRates: 5.25,
    inflation: 3.0,
    marketSentiment: "neutral"
  };
}

/**
 * Fetch news sentiment analysis from our news impact API
 */
async function fetchNewsSentiment(): Promise<NewsSentiment> {
  try {
    // Call our internal news-impact API
    const response = await fetch('/api/newsImpact', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`);
    }
    
    interface NewsArticleResponse {
      article: {
        title: string;
        description: string;
        url: string;
        source: {
          name: string;
        };
      };
      analysis: {
        impact: 'UP' | 'DOWN' | 'NEUTRAL';
        confidence: number;
        reason: string;
      };
    }
    
    const newsData = await response.json() as NewsArticleResponse[];
    
    // Analyze overall sentiment from news articles
    const sentiments = newsData.map(item => ({
      impact: item.analysis.impact,
      confidence: item.analysis.confidence
    }));
    
    let bullishCount = 0;
    let bearishCount = 0;
    let neutralCount = 0;
    
    for (const sentiment of sentiments) {
      if (sentiment.impact === 'UP') bullishCount++;
      else if (sentiment.impact === 'DOWN') bearishCount++;
      else neutralCount++;
    }
    
    // Determine overall sentiment
    let overall: "bullish" | "bearish" | "neutral" = "neutral";
    if (bullishCount > bearishCount && bullishCount > neutralCount) {
      overall = "bullish";
    } else if (bearishCount > bullishCount && bearishCount > neutralCount) {
      overall = "bearish";
    }
    
    // Calculate average confidence
    const totalConfidence = sentiments.reduce((sum, item) => sum + (item.confidence || 0), 0);
    const avgConfidence = sentiments.length > 0 ? totalConfidence / sentiments.length : 50;
    
    // Extract top factors from news analysis
    const topFactors = newsData
      .slice(0, 3)
      .map(item => item.analysis.reason.substring(0, 100) + '...')
      .filter(Boolean);
    
    return {
      overall,
      confidence: avgConfidence,
      topFactors: topFactors.length > 0 ? topFactors : ["No significant news factors found"]
    };
  } catch (error) {
    console.error('Error fetching news sentiment:', error);
    return {
      overall: "neutral",
      confidence: 50,
      topFactors: ["News data unavailable"]
    };
  }
}

/**
 * Generate prediction using Gemini AI
 */
async function generatePrediction(
  goldData: GoldPriceData[],
  technicalIndicators: TechnicalIndicators,
  macroEconomic: MacroEconomic,
  newsSentiment: NewsSentiment
): Promise<PredictionResponse> {
  try {
    // Check if Gemini API key is configured
    if (!GEMINI_KEY || !genAI) {
      console.error('GEMINI_KEY environment variable is not configured');
      // Return a fallback prediction
      return createFallbackPrediction(goldData);
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0.1, // Low temperature for more deterministic results
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    // Get latest price data
    const latestPrice = goldData.length > 0 ? goldData[goldData.length - 1].closePrice : 0;
    
    // Format historical price data for the prompt
    const priceHistory = goldData.map(day => 
      `Date: ${day.date.toISOString().split('T')[0]}, Open: ${day.openPrice}, High: ${day.highPrice}, Low: ${day.lowPrice}, Close: ${day.closePrice}, Change: ${day.changePercent || 0}%`
    ).join('\n');

    // Create the prompt with all the factors
    const prompt = `
You are a world-class financial analyst specializing in gold markets. Analyze the following data and provide a 24-hour price prediction for gold (XAU/USD).

CURRENT PRICE: $${latestPrice.toFixed(2)}

## HISTORICAL PRICE DATA (Last ${goldData.length} days):
${priceHistory}

## TECHNICAL INDICATORS:
- RSI (14): ${technicalIndicators.rsi || 'N/A'}
- MACD: ${technicalIndicators.macd?.toFixed(2) || 'N/A'}
- 50-day MA: ${technicalIndicators.ma50?.toFixed(2) || 'N/A'}
- 200-day MA: ${technicalIndicators.ma200?.toFixed(2) || 'N/A'}
- Bollinger Bands:
  - Upper: ${technicalIndicators.bollinger.upper?.toFixed(2) || 'N/A'}
  - Middle: ${technicalIndicators.bollinger.middle?.toFixed(2) || 'N/A'}
  - Lower: ${technicalIndicators.bollinger.lower?.toFixed(2) || 'N/A'}

## MACROECONOMIC FACTORS:
- USD Index: ${macroEconomic.usdIndex || 'N/A'}
- Interest Rates: ${macroEconomic.interestRates || 'N/A'}%
- Inflation Rate: ${macroEconomic.inflation || 'N/A'}%
- Market Sentiment: ${macroEconomic.marketSentiment}

## NEWS SENTIMENT:
- Overall: ${newsSentiment.overall}
- Confidence: ${newsSentiment.confidence.toFixed(2)}%
- Top Factors:
${newsSentiment.topFactors.map(factor => `  - ${factor}`).join('\n')}

Based on this comprehensive analysis, predict the gold price movement for the next 24 hours.

Respond with EXACTLY this JSON schema:
{
  "direction": "up"|"down",
  "confidence": number, // 0-100
  "price": number, // predicted price
  "priceChange": number, // absolute change
  "priceChangePercent": number, // percentage change
  "supportingFactor": string // main reason for prediction
}
`;

    // Send the message to the model
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON response
    try {
      // Handle cases where the model returns a markdown code block with JSON
      const jsonContent = extractJsonFromText(text);
      const prediction = JSON.parse(jsonContent);
      
      // Validate prediction structure and values
      const validatedPrediction: PredictionResponse = {
        direction: prediction.direction === "up" || prediction.direction === "down" 
          ? prediction.direction 
          : latestPrice > (goldData.length > 1 ? goldData[goldData.length - 2].closePrice : latestPrice) ? "up" : "down",
        confidence: typeof prediction.confidence === "number" ? prediction.confidence : 50,
        price: typeof prediction.price === "number" ? prediction.price : latestPrice,
        priceChange: typeof prediction.priceChange === "number" ? Math.abs(prediction.priceChange) : 0,
        priceChangePercent: typeof prediction.priceChangePercent === "number" ? prediction.priceChangePercent : 0,
        supportingFactor: prediction.supportingFactor || "Multiple factors are influencing the gold price",
        timestamp: new Date().toISOString()
      };
      
      return validatedPrediction;
    } catch (parseError) {
      console.error('Failed to parse model response as JSON:', text, parseError);
      return createFallbackPrediction(goldData);
    }
  } catch (error) {
    console.error('Error generating prediction:', error);
    return createFallbackPrediction(goldData);
  }
}

/**
 * Create a fallback prediction when AI fails
 */
function createFallbackPrediction(goldData: GoldPriceData[]): PredictionResponse {
  // Use simple logic based on recent price movements
  if (goldData.length < 2) {
    return {
      direction: "up",
      confidence: 51,
      price: 2000.0,
      priceChange: 5.0,
      priceChangePercent: 0.25,
      timestamp: new Date().toISOString(),
      supportingFactor: "Insufficient data for analysis, using default bullish stance"
    };
  }
  
  // Calculate based on recent trend
  const latestPrice = goldData[goldData.length - 1].closePrice;
  const previousPrice = goldData[goldData.length - 2].closePrice;
  
  // Check if price went up or down
  const direction = latestPrice > previousPrice ? "up" : "down";
  const priceChange = Math.abs(latestPrice - previousPrice);
  const priceChangePercent = (priceChange / previousPrice) * 100;
  
  // Make a small prediction in the same direction
  const predictedChange = priceChange * 0.5; // Half the last change
  const predictedPrice = direction === "up" 
    ? latestPrice + predictedChange 
    : latestPrice - predictedChange;
  
  return {
    direction,
    confidence: 55,
    price: parseFloat(predictedPrice.toFixed(2)),
    priceChange: parseFloat(predictedChange.toFixed(2)),
    priceChangePercent: parseFloat((priceChangePercent * 0.5).toFixed(2)),
    timestamp: new Date().toISOString(),
    supportingFactor: "Based on recent price momentum (fallback prediction)"
  };
}

/**
 * Helper function to extract JSON from text that might be wrapped in markdown code blocks
 */
function extractJsonFromText(text: string): string {
  // Check if response is wrapped in markdown code block
  const jsonBlockRegex = /```(?:json)?\s*\n([\s\S]*?)\n```/;
  const match = text.match(jsonBlockRegex);
  
  if (match && match[1]) {
    // Return the content inside the code block
    return match[1].trim();
  }
  
  // If no code block is found, try to find anything that looks like JSON
  // This helps with partial code blocks or malformed markdown
  const possibleJsonRegex = /\{[\s\S]*\}/;
  const jsonMatch = text.match(possibleJsonRegex);
  
  if (jsonMatch) {
    return jsonMatch[0];
  }
  
  // If no JSON-like structure is found, return the original text
  return text;
}

/**
 * API handler for GET requests
 */
export async function GET() {
  try {
    console.log('Generating gold price prediction...');
    
    // Step 1: Fetch gold price data
    console.log('Fetching historical gold price data...');
    const goldData = await fetchGoldPriceData(30);
    
    if (goldData.length === 0) {
      return NextResponse.json(
        { error: 'No historical gold price data available' }, 
        { status: 404 }
      );
    }
    
    // Step 2: Calculate technical indicators
    console.log('Calculating technical indicators...');
    const technicalIndicators = calculateTechnicalIndicators(goldData);
    
    // Step 3: Get macroeconomic data
    console.log('Getting macroeconomic data...');
    const macroEconomic = await getMacroeconomicData();
    
    // Step 4: Fetch news sentiment
    console.log('Fetching news sentiment...');
    const newsSentiment = await fetchNewsSentiment();
    
    // Step 5: Generate prediction using all factors
    console.log('Generating AI prediction...');
    const prediction = await generatePrediction(
      goldData,
      technicalIndicators,
      macroEconomic,
      newsSentiment
    );
    
    console.log('Prediction generated successfully');
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Error in prediction API:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' }, 
      { status: 500 }
    );
  }
}
