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
  const [builderRes, userRes, propertiesRes, statsRes] = await Promise.all([
    supabase
      .from('builders')
      .select('id, user_id, company_name, company_description, business_address, logo_url, status, website_url, verified_at, created_at')
      .eq('id', id)
      .single(),
    supabase
      .from('users')
      .select('id, email, phone, full_name, last_login_at, created_at')
      .eq('id', supabase.from('builders').select('user_id').eq('id', id).single())
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
      .is('deleted_at', null)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('properties')
      .select('status, created_at')
      .eq('builder_id', id)
      .is('deleted_at', null),
  ]);

  // Calculate activity stats
  const stats = statsRes.data ?? [];
  const activityStats: any = {
    total_properties: stats.length,
    active_listings: stats.filter(p => p.status === 'active').length,
    pending_approval: stats.filter(p => p.status === 'pending_approval').length,
    draft: stats.filter(p => p.status === 'draft').length,
    sold: stats.filter(p => p.status === 'sold').length,
  };

  // Get customer accesses and queries stats (simplified for now)
  const [customerAccessRes, queriesRes] = await Promise.all([
    supabase
      .from('customer_access')
      .select('id')
      .eq('builder_id', id),
    supabase
      .from('queries')
      .select('status')
      .eq('builder_id', id),
  ]);

  activityStats.customer_accesses = customerAccessRes.data?.length ?? 0;
  activityStats.total_queries = queriesRes.data?.length ?? 0;
  activityStats.open_queries = queriesRes.data?.filter(q => q.status === 'open').length ?? 0;

  return { 
    builder: builderRes.data, 
    user: userRes.data,
    properties: propertiesRes.data ?? [],
    stats: activityStats
  };
}
