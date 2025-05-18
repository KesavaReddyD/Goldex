'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronUp, ChevronDown, ThumbsUp, BookmarkIcon } from 'lucide-react';

// Mock recommendation data
const mockRecommendations = [
  {
    id: '1',
    asset: 'GOLD',
    type: 'BUY',
    confidence: 0.87,
    predictionType: 'SYSTEM', 
    visibility: 'PUBLIC',
    reasoning: 'Gold prices are expected to rise due to increasing inflation fears and economic uncertainty.',
    sourceSummary: 'Based on technical analysis and market sentiment indicators.',
    validFrom: new Date('2023-12-01'),
    validTo: new Date('2023-12-15'),
    actualMovement: 'UP',
    accuracy: 0.92,
    user: {
      name: 'System AI',
      avatar: '/avatar-ai.png',
      id: 'system-1'
    },
    createdAt: new Date('2023-11-30')
  },
  {
    id: '2',
    asset: 'GOLD',
    type: 'SELL',
    confidence: 0.75,
    predictionType: 'USER', 
    visibility: 'PUBLIC',
    reasoning: 'Gold may drop as interest rates are expected to rise next week.',
    sourceSummary: 'Fed announcement expected and dollar strength increasing.',
    validFrom: new Date('2023-12-03'),
    validTo: new Date('2023-12-10'),
    actualMovement: 'DOWN',
    accuracy: 0.83,
    user: {
      name: 'Jane Doe',
      avatar: '/avatar1.png',
      id: 'user-1'
    },
    createdAt: new Date('2023-12-02')
  },
  {
    id: '3',
    asset: 'GOLD',
    type: 'HOLD',
    confidence: 0.65,
    predictionType: 'USER', 
    visibility: 'PUBLIC',
    reasoning: 'Gold prices are likely to remain stable due to conflicting market forces.',
    sourceSummary: 'Economic indicators mixed, waiting for clearer direction.',
    validFrom: new Date('2023-12-05'),
    validTo: new Date('2023-12-12'),
    actualMovement: 'FLAT',
    accuracy: 0.79,
    user: {
      name: 'John Smith',
      avatar: '/avatar2.png',
      id: 'user-2'
    },
    createdAt: new Date('2023-12-04')
  },
  {
    id: '4',
    asset: 'GOLD',
    type: 'BUY',
    confidence: 0.92,
    predictionType: 'AI', 
    visibility: 'PUBLIC',
    reasoning: 'Gold prices set to increase with rising geopolitical tensions in Eastern Europe.',
    sourceSummary: 'Analysis of news sentiment and historical patterns during similar events.',
    validFrom: new Date('2023-12-08'),
    validTo: new Date('2023-12-22'),
    actualMovement: null,
    accuracy: null,
    user: {
      name: 'Market AI',
      avatar: '/avatar-ai.png',
      id: 'ai-1'
    },
    createdAt: new Date('2023-12-07')
  },
  {
    id: '5',
    asset: 'GOLD',
    type: 'SELL',
    confidence: 0.78,
    predictionType: 'USER', 
    visibility: 'PUBLIC',
    reasoning: 'Technical analysis shows gold is overbought and due for correction.',
    sourceSummary: 'RSI above 70, historical resistance level reached.',
    validFrom: new Date('2023-12-10'),
    validTo: new Date('2023-12-17'),
    actualMovement: null,
    accuracy: null,
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatar3.png',
      id: 'user-3'
    },
    createdAt: new Date('2023-12-09')
  }
];

export default function SearchPage() {
  const [savedRecommendations, setSavedRecommendations] = useState<string[]>([]);
  const [likedRecommendations, setLikedRecommendations] = useState<string[]>([]);

  const handleSave = (id: string) => {
    setSavedRecommendations(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikedRecommendations(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };
  
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'BUY': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'SELL': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'HOLD': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case 'SYSTEM': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'USER': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'AI': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Explore Recommendations</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {mockRecommendations.map(recommendation => (
            <RecommendationCard 
              key={recommendation.id}
              recommendation={recommendation}
              isSaved={savedRecommendations.includes(recommendation.id)}
              isLiked={likedRecommendations.includes(recommendation.id)}
              onSave={handleSave}
              onLike={handleLike}
              getTypeBadgeColor={getTypeBadgeColor}
              getSourceBadgeColor={getSourceBadgeColor}
              formatDate={formatDate}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          {mockRecommendations
            .filter(r => r.predictionType === 'SYSTEM')
            .map(recommendation => (
              <RecommendationCard 
                key={recommendation.id}
                recommendation={recommendation}
                isSaved={savedRecommendations.includes(recommendation.id)}
                isLiked={likedRecommendations.includes(recommendation.id)}
                onSave={handleSave}
                onLike={handleLike}
                getTypeBadgeColor={getTypeBadgeColor}
                getSourceBadgeColor={getSourceBadgeColor}
                formatDate={formatDate}
              />
            ))}
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          {mockRecommendations
            .filter(r => r.predictionType === 'USER')
            .map(recommendation => (
              <RecommendationCard 
                key={recommendation.id}
                recommendation={recommendation}
                isSaved={savedRecommendations.includes(recommendation.id)}
                isLiked={likedRecommendations.includes(recommendation.id)}
                onSave={handleSave}
                onLike={handleLike}
                getTypeBadgeColor={getTypeBadgeColor}
                getSourceBadgeColor={getSourceBadgeColor}
                formatDate={formatDate}
              />
            ))}
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          {mockRecommendations
            .filter(r => r.predictionType === 'AI')
            .map(recommendation => (
              <RecommendationCard 
                key={recommendation.id}
                recommendation={recommendation}
                isSaved={savedRecommendations.includes(recommendation.id)}
                isLiked={likedRecommendations.includes(recommendation.id)}
                onSave={handleSave}
                onLike={handleLike}
                getTypeBadgeColor={getTypeBadgeColor}
                getSourceBadgeColor={getSourceBadgeColor}
                formatDate={formatDate}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Recommendation = {
  id: string;
  asset: string;
  type: string;
  confidence: number;
  predictionType: string;
  visibility: string;
  reasoning: string;
  sourceSummary?: string;
  sourceData?: Record<string, unknown>;
  validFrom: Date;
  validTo?: Date;
  actualMovement?: string | null;
  accuracy?: number | null;
  user: {
    name: string;
    avatar: string;
    id: string;
  };
  createdAt: Date;
};

type RecommendationCardProps = {
  recommendation: Recommendation;
  isSaved: boolean;
  isLiked: boolean;
  onSave: (id: string) => void;
  onLike: (id: string) => void;
  getTypeBadgeColor: (type: string) => string;
  getSourceBadgeColor: (type: string) => string;
  formatDate: (date: Date) => string;
};

function RecommendationCard({ 
  recommendation, 
  isSaved,
  isLiked,
  onSave,
  onLike,
  getTypeBadgeColor,
  getSourceBadgeColor,
  formatDate
}: RecommendationCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={recommendation.user.avatar} alt={recommendation.user.name} />
            <AvatarFallback>{recommendation.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{recommendation.user.name}</CardTitle>
            <CardDescription>{formatDate(recommendation.createdAt)}</CardDescription>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={getSourceBadgeColor(recommendation.predictionType)}>
            {recommendation.predictionType}
          </Badge>
          <Badge className={getTypeBadgeColor(recommendation.type)}>
            {recommendation.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-1">
          {recommendation.type === 'BUY' ? 'Buy' : recommendation.type === 'SELL' ? 'Sell' : 'Hold'} {recommendation.asset}
        </h3>
        <div className="text-sm text-muted-foreground mb-4">
          Confidence: {Math.round(recommendation.confidence * 100)}%
          {recommendation.actualMovement && (
            <span className="ml-2">
              Result: 
              <span className={`ml-1 font-medium ${
                recommendation.actualMovement === 'UP' ? 'text-green-600' :
                recommendation.actualMovement === 'DOWN' ? 'text-red-600' : 'text-amber-600'
              }`}>
                {recommendation.actualMovement}
                {recommendation.actualMovement === 'UP' ? <ChevronUp className="inline ml-1" size={16} /> : 
                 recommendation.actualMovement === 'DOWN' ? <ChevronDown className="inline ml-1" size={16} /> : null}
                {recommendation.accuracy && ` (${Math.round(recommendation.accuracy * 100)}% accurate)`}
              </span>
            </span>
          )}
        </div>
        <p className="mb-3">{recommendation.reasoning}</p>
        {recommendation.sourceSummary && (
          <p className="text-sm text-muted-foreground">{recommendation.sourceSummary}</p>
        )}
        <div className="mt-4 text-sm">
          <span className="text-muted-foreground">Valid: {formatDate(recommendation.validFrom)} - {recommendation.validTo ? formatDate(recommendation.validTo) : 'Ongoing'}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          className={isLiked ? "text-primary" : ""}
          onClick={() => onLike(recommendation.id)}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          {isLiked ? 'Liked' : 'Like'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={isSaved ? "bg-primary text-primary-foreground" : ""}
          onClick={() => onSave(recommendation.id)}
        >
          <BookmarkIcon className="mr-1 h-4 w-4" />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
}
