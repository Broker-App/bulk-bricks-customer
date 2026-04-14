'use server';
import { createClient } from '@/lib/supabase/server';

export async function fetchSavedProperties(ids: string[]) {
  if (ids.length === 0) return { data: [] };
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select(`
      id, title, description, category, status, target_price,
      location_city, location_area, is_featured, is_group_enabled,
      group_size, slots_filled, created_at,
      builder:builders(id, company_name, logo_url, status),
      images:property_images(url, alt_text, is_cover, sort_order),
      property_type
    `)
    .in('id', ids)
    .eq('status', 'active')
    .is('deleted_at', null);
  return { data: data ?? [] };
}
