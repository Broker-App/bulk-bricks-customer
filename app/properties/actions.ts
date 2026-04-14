'use server';

import { fetchProperties } from '@/lib/queries/properties';
import type { PropertyFilters } from '@/types';

export async function loadMoreProperties(filters: PropertyFilters, page: number) {
  return fetchProperties({ ...filters, page, pageSize: 10 });
}
