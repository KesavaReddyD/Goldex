import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUp, ArrowDown } from "lucide-react";

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

interface PredictionDetailModalProps {
  open: boolean;
  onClose: () => void;
  prediction: Prediction | null;
}

function getSentimentColor(category: string) {
  switch (category?.toLowerCase()) {
    case "positive": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    case "negative": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    case "neutral": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

function getTrendIcon(trend: string) {
  if (trend?.toLowerCase().includes("bullish")) {
    return <ArrowUp className="h-4 w-4 text-green-500" />;
  } else if (trend?.toLowerCase().includes("bearish")) {
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  }
  return null;
}

export default function PredictionDetailModal({ open, onClose, prediction }: PredictionDetailModalProps) {
  if (!prediction) return null;
  const formatDate = (timestamp: string) => new Date(timestamp).toLocaleString();

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Gold Price Prediction
          </DialogTitle>
          <DialogDescription className="flex items-center mt-1">
            <Clock className="h-4 w-4 mr-1" /> Updated {formatDate(prediction.timestamp)}
            <Badge className={`ml-2 ${getSentimentColor(prediction.sentimentLabel)} px-3 py-1`}>
              {prediction.sentimentLabel} ({prediction.sentimentScore?.toFixed(2)})
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-2">
          {/* Short Term Prediction */}
          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4">
            <div className="flex items-center mb-2">
              <h3 className="font-medium flex-grow">Short Term Outlook</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                {getTrendIcon(prediction.shortTermTrend)}
                {prediction.shortTermTrend}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{prediction.shortTermTimeframe}</p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
                <p className="font-medium">${prediction.shortTermOpen?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Close</p>
                <p className="font-medium">${prediction.shortTermClose?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
                <p className="font-medium">${prediction.shortTermHigh?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
                <p className="font-medium">${prediction.shortTermLow?.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Sentimental Analysis:</p>
              <p className="font-medium">{prediction.shortTermSentimentReasons || "N/A"}</p>
              <div className="mt-2 text-xs">
                <span className={`mr-2 ${getSentimentColor(prediction.shortTermSentimentCategory)} px-2 py-1 rounded`}>{prediction.shortTermSentimentCategory}</span>
                Score: {prediction.shortTermSentimentScore?.toFixed(2)}
              </div>
            </div>
          </div>
          {/* Long Term Prediction */}
          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4">
            <div className="flex items-center mb-2">
              <h3 className="font-medium flex-grow">Long Term Outlook</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                {getTrendIcon(prediction.longTermTrend)}
                {prediction.longTermTrend}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{prediction.longTermTimeframe}</p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
                <p className="font-medium">${prediction.longTermOpen?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Close</p>
                <p className="font-medium">${prediction.longTermClose?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
                <p className="font-medium">${prediction.longTermHigh?.toFixed(2)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
                <p className="font-medium">${prediction.longTermLow?.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Sentimental Analysis:</p>
              <p className="font-medium">{prediction.longTermSentimentReasons || "N/A"}</p>
              <div className="mt-2 text-xs">
                <span className={`mr-2 ${getSentimentColor(prediction.longTermSentimentCategory)} px-2 py-1 rounded`}>{prediction.longTermSentimentCategory}</span>
                Score: {prediction.longTermSentimentScore?.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Summary</h3>
            <p className="text-sm">{prediction.pricePrediction}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 