'use server';

import { fetchBuildersPaginated, type FetchBuildersOptions } from '@/lib/queries/builders';

export async function loadBuilders(page: number, query?: string) {
  return fetchBuildersPaginated({ 
    page, 
    pageSize: 10, 
    query: query?.trim() || undefined 
  });
}
