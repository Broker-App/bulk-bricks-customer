interface SlotBarProps {
  filled: number;
  total: number;
  showLabel?: boolean;
}

export function SlotBar({ filled, total, showLabel = true }: SlotBarProps) {
  const pct = total > 0 ? Math.min((filled / total) * 100, 100) : 0;
  const remaining = total - filled;
  const isFull = remaining <= 0;

  return (
    <div>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            {filled} of {total} joined
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isFull ? 'var(--color-text-muted)' : 'var(--color-group-buy)',
            }}
          >
            {isFull ? 'Group Full' : `${remaining} slot${remaining === 1 ? '' : 's'} left`}
          </span>
        </div>
      )}
      <div className="slot-bar">
        <div className="slot-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
