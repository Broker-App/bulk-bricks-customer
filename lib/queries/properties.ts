import { createClient } from '@/lib/supabase/server';
import type { PropertyFilters } from '@/types';

/** Distinct cities from active properties — used for dynamic city dropdown */
export async function fetchDistinctCities(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('location_city')
    .eq('status', 'active')
    .is('deleted_at', null);
  if (!data) return [];
  return [...new Set(data.map((r) => r.location_city as string).filter(Boolean))].sort();
}

/** All amenities — used for amenity filter chips */
export async function fetchAmenities() {
  const supabase = await createClient();
  return supabase
    .from('amenities')
    .select('id, title, icon_url')
    .order('title');
}

export async function fetchProperties(filters: PropertyFilters = {}) {
  const supabase = await createClient();
  const {
    search = '', category, city, area, isFeatured, isGroupEnabled,
    minPrice, maxPrice, typeId, sortBy, amenityIds,
    page = 0, pageSize = 10,
  } = filters;

  let query = supabase
    .from('properties')
    .select(
      `
      id, title, description, category, status,
      target_price, dev_price, location_city, location_area,
      is_featured, is_group_enabled, group_size, slots_filled,
      created_at,
      builder:builders(id, company_name, logo_url, status),
      images:property_images(url, alt_text, is_cover, sort_order),
      property_type
    `,
      { count: 'exact' }
    )
    .eq('status', 'active')
    .is('deleted_at', null);

  if (search)         query = query.or(
    `title.ilike.%${search}%,location_city.ilike.%${search}%,location_area.ilike.%${search}%`
  );
  if (category)         query = query.eq('category', category);
  if (city)             query = query.eq('location_city', city);
  if (area)             query = query.ilike('location_area', `%${area}%`);
  if (isFeatured)       query = query.eq('is_featured', true);
  if (isGroupEnabled)   query = query.eq('is_group_enabled', true);
  if (minPrice)         query = query.gte('target_price', minPrice);
  if (maxPrice)         query = query.lte('target_price', maxPrice);
  if (typeId)           query = query.eq('property_type', typeId);

  // Amenity filter — two-step: get matching property IDs first
  if (amenityIds && amenityIds.length > 0) {
    const { data: paRows } = await supabase
      .from('property_amenities')
      .select('property_id')
      .in('amenity_id', amenityIds);
    const ids = [...new Set((paRows ?? []).map((r) => r.property_id as string))];
    if (ids.length === 0) {
      // No properties have these amenities — return empty immediately
      return { data: [], count: 0, error: null, status: 200, statusText: 'OK' };
    }
    query = query.in('id', ids);
  }

  // Sorting
  if (sortBy === 'price_asc')  return query.order('target_price', { ascending: true }).range(page * pageSize, (page + 1) * pageSize - 1);
  if (sortBy === 'price_desc') return query.order('target_price', { ascending: false }).range(page * pageSize, (page + 1) * pageSize - 1);
  if (sortBy === 'newest')     return query.order('created_at', { ascending: false }).range(page * pageSize, (page + 1) * pageSize - 1);

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
      property_type
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
        id, title, target_price, dev_price, location_city, location_area,
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
