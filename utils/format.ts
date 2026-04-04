/** Format price in Indian locale: Cr / L / plain INR */
export function formatINR(amount: number): string {
  if (amount >= 1_00_00_000) {
    const cr = amount / 1_00_00_000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 1_00_000) {
    const l = amount / 1_00_000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(2)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Get 1–2 character initials from a builder/person name */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Truncate text with ellipsis */
export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}
