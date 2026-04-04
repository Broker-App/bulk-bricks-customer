import { createClient } from '@/lib/supabase/server';

export async function fetchBuilders() {
  const supabase = await createClient();
  return supabase
    .from('builders')
    .select('id, company_name, logo_url, status, website_url, verified_at, created_at')
    .eq('status', 'verified')
    .order('created_at', { ascending: false });
}

export async function fetchBuilderDetail(id: string) {
  const supabase = await createClient();
  const [builderRes, propertiesRes] = await Promise.all([
    supabase
      .from('builders')
      .select('id, company_name, company_description, logo_url, status, website_url, verified_at')
      .eq('id', id)
      .single(),
    supabase
      .from('properties')
      .select(
        `
        id, title, target_price, location_city, location_area,
        is_featured, is_group_enabled, group_size, slots_filled, status, created_at,
        images:property_images(url, is_cover, sort_order),
        property_type:categories(name, slug)
      `
      )
      .eq('builder_id', id)
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false }),
  ]);
  return { builder: builderRes.data, properties: propertiesRes.data ?? [] };
}
