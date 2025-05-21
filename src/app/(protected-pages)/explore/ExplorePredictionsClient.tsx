"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Clock, X } from 'lucide-react';

// Define the shape of a prediction (should match your backend)
export interface PredictionData {
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
}

function sentimentVariant(label: string): 'default' | 'destructive' | 'secondary' {
  if (label === 'Positive') return 'default';
  if (label === 'Negative') return 'destructive';
  return 'secondary';
}

function PredictionModal({ prediction, onClose }: { prediction: PredictionData, onClose: () => void }) {
  if (!prediction) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-8 relative animate-fade-in max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"><X size={24} /></button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gold Price Prediction</h2>
          <Badge className="ml-2 px-2 py-1 text-xs" variant={sentimentVariant(prediction.sentimentLabel)}>
            {prediction.sentimentLabel} ({prediction.sentimentScore?.toFixed(2)})
          </Badge>
        </div>
        <div className="text-xs text-gray-500 mb-6 flex items-center"><Clock className="h-4 w-4 mr-1" /> {new Date(prediction.timestamp).toLocaleString()}</div>
        <div className="mb-6">
          <span className="font-semibold">Summary:</span> {prediction.pricePrediction}
        </div>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Short Term Outlook</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {prediction.shortTermTrend?.toLowerCase().includes('bullish') ? <ArrowUp className="h-4 w-4 text-green-500" /> : prediction.shortTermTrend?.toLowerCase().includes('bearish') ? <ArrowDown className="h-4 w-4 text-red-500" /> : null}
              {prediction.shortTermTrend}
            </Badge>
            <span className="text-xs text-gray-500">{prediction.shortTermTimeframe}</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Long Term Outlook</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {prediction.longTermTrend?.toLowerCase().includes('bullish') ? <ArrowUp className="h-4 w-4 text-green-500" /> : prediction.longTermTrend?.toLowerCase().includes('bearish') ? <ArrowDown className="h-4 w-4 text-red-500" /> : null}
              {prediction.longTermTrend}
            </Badge>
            <span className="text-xs text-gray-500">{prediction.longTermTimeframe}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-6">User: {prediction.userEmail}</div>
      </div>
    </div>
  );
}

export default function ExplorePredictionsClient({ predictions }: { predictions: PredictionData[] }) {
  const [openPrediction, setOpenPrediction] = useState<PredictionData | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Explore Predictions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map(pred => {
          const isTruncated = pred.pricePrediction.length > 120;
          return (
            <Card key={pred.id} className="shadow-md h-64 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate max-w-[180px]" title={pred.userEmail}>{pred.userEmail}</span>
                  <Badge className="ml-2 px-2 py-1 text-xs" variant={sentimentVariant(pred.sentimentLabel)}>
                    {pred.sentimentLabel} ({pred.sentimentScore.toFixed(2)})
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-1">
                  {new Date(pred.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="mb-2 overflow-hidden text-ellipsis" style={{ maxHeight: '3.5rem' }}>
                  <span className="font-semibold">Summary:</span> {isTruncated ? pred.pricePrediction.slice(0, 120) + '...' : pred.pricePrediction}
                </div>
                <div className="flex gap-4 text-xs text-gray-600 mb-2">
                  <span>Short-term: <b>{pred.shortTermTrend}</b></span>
                  <span>Long-term: <b>{pred.longTermTrend}</b></span>
                </div>
                {isTruncated && (
                  <button
                    className="mt-2 text-xs text-blue-600 hover:underline self-end"
                    onClick={() => setOpenPrediction(pred)}
                  >
                    See More
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      {openPrediction && (
        <PredictionModal prediction={openPrediction} onClose={() => setOpenPrediction(null)} />
      )}
      {predictions.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No predictions found.</div>
      )}
    </div>
  );
} 