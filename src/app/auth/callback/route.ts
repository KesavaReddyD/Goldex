import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  // Get the auth code from the query params
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = await createClient();
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Redirect to dashboard after successful authentication
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Redirect to sign-in page if there's an error
  return NextResponse.redirect(new URL('/sign-in?error=auth', request.url));
} 