'use server';
import { fetchMyPropertiesPaginated } from '@/lib/queries/properties';

export async function loadMyProperties(
  customerId: string,
  page: number,
  search = ''
) {
  return fetchMyPropertiesPaginated(customerId, page, search, 10);
}
