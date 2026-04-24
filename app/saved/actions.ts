'use server';
import { createClient } from '@/lib/supabase/server';

export async function fetchSavedProperties(ids: string[]) {
  try {
    console.log('Fetching saved properties for IDs:', ids);
    
    if (!ids || ids.length === 0) {
      console.log('No IDs provided, returning empty array');
      return { data: [] };
    }
    
    const supabase = await createClient();
    console.log('Supabase client created successfully');
    
    // First try a simple query
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, status')
      .in('id', ids)
      .eq('status', 'active');
    
    console.log('Query result:', { data, error });
    
    if (error) {
      console.error('Supabase error:', error);
      return { data: [] };
    }
    
    console.log('Successfully fetched properties:', data?.length || 0);
    return { data: data ?? [] };
    
  } catch (error) {
    console.error('Error in fetchSavedProperties:', error);
    return { data: [] };
  }
}
