"use client";
import { useEffect, useState } from "react";
import PredictionDetailModal from "./prediction-detail-modal";
import { Badge } from "@/components/ui/badge";

interface Prediction {
  id: string;
  timestamp: string;
  pricePrediction: string;
  sentimentLabel: string;
  sentimentScore: number;
  // Flat fields for short term
  shortTermTimeframe: string;
  shortTermTrend: string;
  shortTermOpen: number;
  shortTermClose: number;
  shortTermHigh: number;
  shortTermLow: number;
  shortTermSentimentScore: number;
  shortTermSentimentCategory: string;
  shortTermSentimentReasons: string;
  // Flat fields for long term
  longTermTimeframe: string;
  longTermTrend: string;
  longTermOpen: number;
  longTermClose: number;
  longTermHigh: number;
  longTermLow: number;
  longTermSentimentScore: number;
  longTermSentimentCategory: string;
  longTermSentimentReasons: string;
}

function getSentimentColor(category: string) {
  switch (category?.toLowerCase()) {
    case "positive": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    case "negative": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    case "neutral": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Prediction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/prediction/getByUserId", {
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch predictions");
        const data = await res.json();
        setPredictions(data.predictions || []);
      } catch (err: unknown) {
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  if (loading) return <div>Loading prediction history...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!predictions.length) return <div>No predictions found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Prediction</th>
            <th className="px-3 py-2 text-left">Short Term Trend</th>
            <th className="px-3 py-2 text-left">Long Term Trend</th>
            <th className="px-3 py-2 text-left">Sentiment</th>
            <th className="px-3 py-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, i) => (
            <tr
              key={p.id}
              className={`transition cursor-pointer ${i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800"} hover:bg-yellow-50 dark:hover:bg-yellow-900`}
              onClick={() => { setSelected(p); setModalOpen(true); }}
            >
              <td className="px-3 py-2">{new Date(p.timestamp).toLocaleString()}</td>
              <td className="px-3 py-2 truncate max-w-xs">{p.pricePrediction}</td>
              <td className="px-3 py-2">{p.shortTermTrend}</td>
              <td className="px-3 py-2">{p.longTermTrend}</td>
              <td className="px-3 py-2">
                <Badge className={getSentimentColor(p.sentimentLabel)}>{p.sentimentLabel}</Badge>
              </td>
              <td className="px-3 py-2">{p.sentimentScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PredictionDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        prediction={selected}
      />
    </div>
  );
} 