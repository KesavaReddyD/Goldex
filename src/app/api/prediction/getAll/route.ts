import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const predictions = await prisma.prediction.findMany({
      orderBy: { timestamp: 'desc' },
      select: {
        id: true,
        userEmail: true,
        timestamp: true,
        sentimentLabel: true,
        sentimentScore: true,
        pricePrediction: true,
        shortTermTrend: true,
        longTermTrend: true,
        shortTermTimeframe: true,
        longTermTimeframe: true,
      },
    });
    return NextResponse.json({ predictions });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
  }
} 