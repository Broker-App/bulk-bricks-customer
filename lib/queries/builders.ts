import { createClient } from '@/lib/supabase/server';

export interface BuilderStat {
  total: number;
  active: number;
  sold: number;
  customers: number;
}

export interface BuilderWithStats {
  id: string;
  company_name: string;
  logo_url: string | null;
  status: string;
  website_url: string | null;
  business_address: string | null;
  verified_at: string | null;
  created_at: string;
  stats: BuilderStat;
}

export interface FetchBuildersOptions {
  page: number;
  pageSize: number;
  query?: string;
}

export async function fetchBuildersPaginated(options: FetchBuildersOptions): Promise<{ data: BuilderWithStats[]; totalCount: number; error: unknown }> {
  const { page, pageSize, query } = options;
  const supabase = await createClient();
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // 1. Fetch paginated builders with search and count
  let buildersQuery = supabase
    .from('builders')
    .select('id, company_name, logo_url, status, website_url, business_address, verified_at, created_at', { count: 'exact' })
    .eq('status', 'verified')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (query && query.trim()) {
    buildersQuery = buildersQuery.ilike('company_name', `%${query.trim()}%`);
  }

  const buildersRes = await buildersQuery;
  const builders = buildersRes.data ?? [];
  const totalCount = buildersRes.count ?? 0;

  // 2. Extract builder IDs from this page
  const builderIds = builders.map(b => b.id);

  // 3. Fetch stats data only for these builders
  const [propertiesRes, accessRes] = await Promise.all([
    supabase
      .from('properties')
      .select('builder_id, status')
      .is('deleted_at', null)
      .in('builder_id', builderIds),
    supabase
      .from('customer_access')
      .select('builder_id')
      .in('builder_id', builderIds),
  ]);

  const properties = propertiesRes.data ?? [];
  const accesses = accessRes.data ?? [];

  // 4. Merge stats into each builder
  const data: BuilderWithStats[] = builders.map(builder => {
    const builderProps = properties.filter(p => p.builder_id === builder.id);
    return {
      ...builder,
      stats: {
        total: builderProps.length,
        active: builderProps.filter(p => p.status === 'active').length,
        sold: builderProps.filter(p => p.status === 'sold').length,
        customers: accesses.filter(a => a.builder_id === builder.id).length,
      },
    };
  });

  return { data, totalCount, error: buildersRes.error };
}

// Legacy function for backward compatibility
export async function fetchBuilders(): Promise<{ data: BuilderWithStats[]; error: unknown }> {
  const result = await fetchBuildersPaginated({ page: 0, pageSize: 1000 });
  return { data: result.data, error: result.error };
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
