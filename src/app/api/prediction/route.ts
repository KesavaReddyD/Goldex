import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

// POST /api/prediction
export async function POST(req: NextRequest) {
  // Extract the access token from the Authorization header
  const authHeader = req.headers.get('authorization');
  const accessToken = authHeader?.replace('Bearer ', '');

  // Create a Supabase client with the user's access token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Reject if not authenticated
  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse the prediction data from the request body
  let prediction;
  try {
    prediction = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate required fields (add more as needed)
  if (!prediction || !prediction.pricePrediction) {
    return NextResponse.json({ error: 'Missing prediction data' }, { status: 400 });
  }

  try {
    // Store the prediction in the database, mapping fields explicitly to match the schema
    await prisma.prediction.create({
      data: {
        timestamp: new Date(prediction.timestamp),
        sentimentScore: prediction.sentimentScore,
        sentimentLabel: prediction.sentimentLabel,
        pricePrediction: prediction.pricePrediction,
        // Short term
        shortTermTimeframe: prediction.shortTerm.timeframe,
        shortTermTrend: prediction.shortTerm.trend,
        shortTermOpen: prediction.shortTerm.open,
        shortTermClose: prediction.shortTerm.close,
        shortTermHigh: prediction.shortTerm.high,
        shortTermLow: prediction.shortTerm.low,
        shortTermSentimentScore: prediction.shortTerm.sentiment.score,
        shortTermSentimentCategory: prediction.shortTerm.sentiment.category,
        shortTermSentimentReasons: prediction.shortTerm.sentiment.reasons,
        // Long term
        longTermTimeframe: prediction.longTerm.timeframe,
        longTermTrend: prediction.longTerm.trend,
        longTermOpen: prediction.longTerm.open,
        longTermClose: prediction.longTerm.close,
        longTermHigh: prediction.longTerm.high,
        longTermLow: prediction.longTerm.low,
        longTermSentimentScore: prediction.longTerm.sentiment.score,
        longTermSentimentCategory: prediction.longTerm.sentiment.category,
        longTermSentimentReasons: prediction.longTerm.sentiment.reasons,
        // User info
        userId: user.id,
        userEmail: user.email ?? '',
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log and return error
    console.error('Error saving prediction:', err);
    return NextResponse.json({ error: 'Failed to save prediction' }, { status: 500 });
  }
} 