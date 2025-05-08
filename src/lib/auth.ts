import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { prisma } from './prisma';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Function to get the current user server-side
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return null;
  }
  
  // Fetch user from our database
  try {
    const user = await prisma.user.findUnique({
      where: {
        authId: data.user.id
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Function to require authentication for protected routes
export async function requireAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return redirect('/sign-in');
  }
  
  return data.user;
}

// Function to create or update user in our database after Supabase auth
export async function syncUserWithDatabase(authUser: SupabaseUser) {
  if (!authUser) return null;
  
  try {
    // Fetch or create user in our database
    const existingUser = await prisma.user.findUnique({
      where: {
        authId: authUser.id
      }
    });
    
    if (existingUser) {
      // Update user if needed
      return await prisma.user.update({
        where: {
          authId: authUser.id
        },
        data: {
          email: authUser.email,
          name: authUser.user_metadata?.name || existingUser.name,
          avatar: authUser.user_metadata?.avatar_url || existingUser.avatar,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          authId: authUser.id,
          email: authUser.email ?? '',
          name: authUser.user_metadata?.name || null,
          avatar: authUser.user_metadata?.avatar_url || null
        }
      });
      
      // Create default user preferences
      await prisma.userPreference.create({
        data: {
          userId: newUser.id,
          theme: 'light'
        }
      });
      
      // Create free subscription by default
      await prisma.subscription.create({
        data: {
          userId: newUser.id,
          plan: 'free',
          status: 'active',
          startDate: new Date(),
          features: {}
        }
      });
      
      return newUser;
    }
  } catch (error) {
    console.error('Error syncing user with database:', error);
    return null;
  }
} 