import { createClient } from '@/lib/supabase/server';
import { fetchMyPropertiesPaginated } from '@/lib/queries/properties';
import { MyPropertiesClient } from './MyPropertiesClient';
import { redirect } from 'next/navigation';
import type { CustomerAccess } from '@/types';

export const metadata = {
  title: 'My Properties — Bulk Bricks',
  description: 'View your unlocked properties on Bulk Bricks.',
};

export default async function MyPropertiesPage() {
  // Get authenticated user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?next=/my-properties');
  }

  // Fetch first page of user's unlocked properties.
  // Cast needed: Supabase infers `property` as an array from the join,
  // but our CustomerAccess interface declares it as a single object.
  const { data: rawAccesses, count: totalCount } = await fetchMyPropertiesPaginated(
    user.id,
    0,
    '',
    10
  );

  const initialAccesses = (rawAccesses ?? []) as unknown as CustomerAccess[];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <MyPropertiesClient
        initialAccesses={initialAccesses}
        totalCount={totalCount ?? 0}
        customerId={user.id}
      />
    </div>
  );
}
