import { NextResponse } from 'next/server';
import { getUserPredictions } from '@/lib/predictions';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  // Use the shared createClient utility for cookie-based Supabase auth
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const predictions = await getUserPredictions(data.user.id);
    return NextResponse.json({ predictions });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
  }
} 