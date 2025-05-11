// src/pages/api/newsImpact.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro-exp-03-25';

// Initialize the Google GenAI client only if API key is available
const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;

type Article = { 
  title: string; 
  description: string; 
  url: string;
  source: { 
    id: string | null; 
    name: string;
  };
  author: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

type Analysis = { impact: 'UP'|'DOWN'|'NEUTRAL'; confidence: number; reason: string }

async function fetchNews(): Promise<Article[]> {
  try {
    if (!NEWSAPI_KEY) {
      throw new Error('NEWS_API_KEY environment variable is not configured');
    }

    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent("gold economics OR XAUUSD OR FOREX")}&language=en&sortBy=relevancy&from=2025-04-11&to=2025-05-10&pageSize=5&apiKey=${NEWSAPI_KEY}`  
    )
    
    
    if (!res.ok) {
      throw new Error(`Error: News API responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.status !== 'ok' || !Array.isArray(data.articles)) {
      throw new Error('Invalid response from News API');
    }
    
    //console.log(`Found ${data.articles.length} articles from News API`);
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function analyzeArticle(article: Article): Promise<Analysis> {
  try {
    // Check if Gemini API key is configured
    if (!GEMINI_KEY || !genAI) {
      console.error('GEMINI_API_KEY environment variable is not configured');
      return {
        impact: 'NEUTRAL',
        confidence: 50,
        reason: 'AI analysis unavailable - Gemini API key not configured. This is a fallback response.',
      };
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0,
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

    // Create chat instance
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a world-class financial analyst.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'I am a world-class financial analyst specialized in gold markets and forex trading. I analyze economic data, news, and market trends to provide insights on how they might impact gold prices, particularly the XAU/USD exchange rate. I can evaluate the bullish or bearish implications of various events and provide confidence levels for my predictions based on historical patterns and economic fundamentals. How can I assist you today?' }],
        },
      ],
    });

    // Prepare the prompt
    const prompt = `
Analyze the effect on XAU/USD:

Title: ${article.title}
Description: ${article.description}
article link: ${article.url}
content: ${article.content || 'No content available'}
source: ${article.source?.name || 'Unknown source'}
author: ${article.author || 'Unknown author'}
published at: ${article.publishedAt || 'Unknown date'}

Respond with EXACTLY this JSON schema:
{
  "impact": "UP"|"DOWN"|"NEUTRAL",
  "confidence": number,
  "reason": string
}`;

    //console.log(`Analyzing article: ${article.title}`);
    
    // Send the message to the model
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON response
    try {
      // Handle cases where the model returns a markdown code block with JSON
      const jsonContent = extractJsonFromText(text);
      return JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Failed to parse model response as JSON:', text, parseError);
      return {
        impact: 'NEUTRAL',
        confidence: 0,
        reason: `Parse error: The model didn't return valid JSON. Raw response: ${text.substring(0, 100)}...`,
      };
    }
  } catch (error) {
    console.error('Error analyzing article with Gemini:', error);
    return {
      impact: 'NEUTRAL',
      confidence: 0,
      reason: `Analysis error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// Helper function to extract JSON from text that might be wrapped in markdown code blocks
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

export async function GET() {
  try {
    //console.log('Fetching news articles...');
    
    // Check environment variables on startup
    if (!NEWSAPI_KEY) {
      console.error('NEWS_API_KEY environment variable is not configured');
      return NextResponse.json(
        { error: 'NEWS_API_KEY environment variable is not configured' }, 
        { status: 500 }
      );
    }
    
    if (!GEMINI_KEY) {
      console.warn('GEMINI_API_KEY environment variable is not configured - analysis will be limited');
    }
    
    const articles = await fetchNews();

    if (articles.length === 0) {
      return NextResponse.json({ error: 'No news articles found' }, { status: 404 });
    }
    
    //console.log(`Analyzing ${articles.length} articles...`);
    
    const analyses = await Promise.all(
      articles.map(async (article) => ({
        article: { 
          title: article.title, 
          description: article.description, 
          url: article.url,
          source: article.source,
          author: article.author,
          publishedAt: article.publishedAt,
          urlToImage: article.urlToImage
        },
        analysis: await analyzeArticle(article),
      }))
    );
    
    //console.log('All articles analyzed successfully');
    return NextResponse.json(analyses);
  } catch (error) {
    console.error('Error in newsImpact API route:', error);
    return NextResponse.json(
      { error: 'Failed to process news impact' }, 
      { status: 500 }
    );
  }
}
