export function SkeletonCard() {
  return (
    <div
      className="pwa-card"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Image placeholder */}
      <div
        className="skeleton"
        style={{ width: '100%', aspectRatio: '4/3', borderRadius: 0 }}
      />
      <div style={{ padding: '12px' }}>
        {/* Chips row */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
          <div className="skeleton" style={{ width: '64px', height: '20px' }} />
          <div className="skeleton" style={{ width: '80px', height: '20px' }} />
        </div>
        {/* Title */}
        <div className="skeleton" style={{ width: '85%', height: '16px', marginBottom: '6px' }} />
        <div className="skeleton" style={{ width: '60%', height: '14px', marginBottom: '12px' }} />
        {/* Price */}
        <div className="skeleton" style={{ width: '45%', height: '22px', marginBottom: '12px' }} />
        {/* Builder row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="skeleton" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
          <div className="skeleton" style={{ width: '35%', height: '12px' }} />
        </div>
      </div>
    </div>
  );
}
