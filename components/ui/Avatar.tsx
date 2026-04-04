import Image from 'next/image';
import { getInitials } from '@/utils/format';

type AvatarSize = 'sm' | 'md' | 'lg';

const SIZES: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 48 };
const FONT: Record<AvatarSize, string>  = { sm: '10px', md: '13px', lg: '17px' };

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  style?: React.CSSProperties;
}

export function Avatar({ name, src, size = 'md', style }: AvatarProps) {
  const px = SIZES[size];

  if (src) {
    return (
      <div
        style={{
          width: px,
          height: px,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--color-img-placeholder)',
          ...style,
        }}
      >
        <Image
          src={src}
          alt={name}
          width={px}
          height={px}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        background: 'var(--color-terra-muted)',
        color: 'var(--color-terra-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: FONT[size],
        fontWeight: 700,
        fontFamily: 'var(--font-ui)',
        flexShrink: 0,
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      {getInitials(name)}
    </div>
  );
}
