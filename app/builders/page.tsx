import { fetchBuildersPaginated } from '@/lib/queries/builders';
import { BuildersClient } from '@/components/builder/BuildersClient';

// ISR: Revalidate every 5 minutes (300 seconds) for builder listings
export const revalidate = 300;

export const metadata = {
  title: 'Builders - Bulk Bricks',
  description: 'Browse verified property builders on Bulk Bricks.',
};

export default async function BuildersPage() {
  const { data: initialBuilders, totalCount } = await fetchBuildersPaginated({ 
    page: 0, 
    pageSize: 10 
  });

  return (
    <div style={{ padding: '24px 16px 60px', background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <BuildersClient 
        initialBuilders={initialBuilders} 
        initialTotalCount={totalCount} 
      />
    </div>
  );
}
