'use client';

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, ArrowUpCircle, ArrowDownCircle, CircleMinus } from "lucide-react";

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  publishedAt: string;
  urlToImage?: string;
}

type NewsAnalysis = {
  impact: 'UP' | 'DOWN' | 'NEUTRAL';
  confidence: number;
  reason: string;
}

type NewsData = {
  article: NewsArticle;
  analysis: NewsAnalysis;
}

export function NewsSummaries() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/newsImpact');
        
        if (!response.ok) {
          throw new Error(`News API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setNewsData(data);
      } catch (err) {
        console.error('Error fetching news data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load news data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchNewsData();
  }, []);

  function formatTimeAgo(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} day(s) ago`;
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'UP':
        return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
      case 'DOWN':
        return <ArrowDownCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <CircleMinus className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[420px]">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mr-2" />
        <span>Loading news summaries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-rose-500">
        <p>Failed to load news data: {error}</p>
        <p className="mt-2 text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No news articles found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
      {newsData.map((item, index) => (
        <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm">{item.article.title}</h4>
            <Badge 
              variant={
                item.analysis.impact === "UP" ? "default" : 
                item.analysis.impact === "DOWN" ? "destructive" : 
                "outline"
              }
              className={`shrink-0 h-5 flex items-center gap-1 ${
                item.analysis.impact === "UP" ? "bg-emerald-500 hover:bg-emerald-600" : ""
              }`}
            >
              {getImpactIcon(item.analysis.impact)}
              <span className="hidden sm:inline">
                {item.analysis.impact === "UP" ? "Bullish" : 
                 item.analysis.impact === "DOWN" ? "Bearish" : "Neutral"}
              </span>
              <span className="text-xs">
                {item.analysis.confidence ? `${Math.round(item.analysis.confidence)}%` : ''}
              </span>
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            {item.article.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatTimeAgo(item.article.publishedAt)}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 font-medium">{item.article.source.name}</span>
              <a 
                href={item.article.url} 
                className="flex items-center hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
