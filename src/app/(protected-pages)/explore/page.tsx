"use client";
import { useEffect, useState } from "react";
import ExplorePredictionsClient from "./ExplorePredictionsClient";

export default function ExplorePage() {
  const [predictions, setPredictions] = useState<Array<{
    id: string;
    userEmail: string;
    timestamp: string;
    sentimentLabel: string;
    sentimentScore: number;
    pricePrediction: string;
    shortTermTrend: string;
    longTermTrend: string;
    shortTermTimeframe: string;
    longTermTimeframe: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/prediction/getAll");
        if (!res.ok) throw new Error("Failed to fetch predictions");
        const data = await res.json();
        setPredictions(data.predictions || []);
      } catch (err: unknown) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-lg font-semibold text-yellow-600 animate-pulse">Discovering new things...</span>
      <span className="text-xs text-gray-400 mt-2">Exploring the latest gold predictions</span>
    </div>
  );
  if (error) return <div className="text-red-500">{error}</div>;

  return <ExplorePredictionsClient predictions={predictions} />;
}
