import { createClient } from '@/lib/supabase/server';

export async function fetchCategories() {
  const supabase = await createClient();
  return supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .is('parent_id', null)   // top-level only for filter UI
    .order('name');
}

export async function fetchAllCategories() {
  const supabase = await createClient();
  return supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .order('name');
}
