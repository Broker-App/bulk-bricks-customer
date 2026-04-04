import { createClient } from '@/lib/supabase/server';
import type { PropertyFilters } from '@/types';

export async function fetchProperties(filters: PropertyFilters = {}) {
  const supabase = await createClient();
  const { search = '', category, city, isFeatured, isGroupEnabled, page = 0, pageSize = 12 } = filters;

  let query = supabase
    .from('properties')
    .select(
      `
      id, title, description, category, status,
      target_price, location_city, location_area,
      is_featured, is_group_enabled, group_size, slots_filled,
      created_at,
      builder:builders(id, company_name, logo_url, status),
      images:property_images(url, alt_text, is_cover, sort_order),
      property_type:categories(name, slug)
    `,
      { count: 'exact' }
    )
    .eq('status', 'active')
    .is('deleted_at', null);

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,location_city.ilike.%${search}%,location_area.ilike.%${search}%,category.ilike.%${search}%`
    );
  }
  if (category)         query = query.eq('category', category);
  if (city)             query = query.eq('location_city', city);
  if (isFeatured)       query = query.eq('is_featured', true);
  if (isGroupEnabled)   query = query.eq('is_group_enabled', true);
  if (filters.minPrice) query = query.gte('target_price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('target_price', filters.maxPrice);
  if (filters.typeId)   query = query.eq('property_type_id', filters.typeId);

  return query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);
}

export async function fetchPropertyDetail(id: string) {
  const supabase = await createClient();
  return supabase
    .from('properties')
    .select(
      `
      *,
      builder:builders(id, company_name, logo_url, status, website_url, verified_at),
      images:property_images(id, url, alt_text, sort_order, is_cover),
      amenities:property_amenities(amenity:amenities(id, title, icon_url)),
      property_type:categories(id, name, slug)
    `
    )
    .eq('id', id)
    .eq('status', 'active')
    .is('deleted_at', null)
    .single();
}

export async function checkAccess(customerId: string, propertyId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('customer_access')
    .select('id, granted_at')
    .eq('customer_id', customerId)
    .eq('property_id', propertyId)
    .maybeSingle();
  return data;
}

export async function fetchMyProperties(customerId: string) {
  const supabase = await createClient();
  return supabase
    .from('customer_access')
    .select(
      `
      id, granted_at,
      property:properties(
        id, title, target_price, location_city, location_area,
        whatsapp_group_link, status,
        builder:builders(company_name, logo_url, status),
        images:property_images(url, is_cover)
      )
    `
    )
    .eq('customer_id', customerId)
    .order('granted_at', { ascending: false });
}

export async function fetchMyQueries(customerId: string) {
  const supabase = await createClient();
  return supabase
    .from('queries')
    .select(
      `
      id, message, status, priority, created_at, updated_at,
      property:properties(id, title, location_city),
      builder:builders(id, company_name, logo_url),
      responses:query_responses(id, message, is_internal, created_at)
    `
    )
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });
}

export async function fetchQueryDetail(queryId: string, customerId: string) {
  const supabase = await createClient();
  return supabase
    .from('queries')
    .select(
      `
      id, message, status, priority, created_at, updated_at,
      property:properties(id, title, location_city, location_area),
      builder:builders(id, company_name, logo_url),
      responses:query_responses(id, message, is_internal, created_at)
    `
    )
    .eq('id', queryId)
    .eq('customer_id', customerId)
    .single();
}

export async function submitQuery(payload: {
  property_id?: string;
  builder_id?: string;
  message: string;
  customer_id?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}) {
  const supabase = await createClient();
  return supabase.from('queries').insert(payload).select('id').single();
}
