import { prisma } from '@/lib/prisma';
import ExplorePredictionsClient from './ExplorePredictionsClient';

export default async function ExplorePage() {
  // Fetch all predictions, newest first
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

  // Convert timestamp to string for client compatibility
  const safePredictions = predictions.map(
    (p: {
      id: string;
      userEmail: string;
      timestamp: Date;
      sentimentLabel: string;
      sentimentScore: number;
      pricePrediction: string;
      shortTermTrend: string;
      longTermTrend: string;
      shortTermTimeframe: string;
      longTermTimeframe: string;
    }) => ({ ...p, timestamp: p.timestamp.toISOString() })
  );

  return <ExplorePredictionsClient predictions={safePredictions} />;
}
