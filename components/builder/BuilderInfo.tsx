import { Globe, MapPin, Calendar, Building, ShieldCheck, Award } from 'lucide-react';

interface BuilderInfoProps {
  builder: {
    company_name: string;
    company_description?: string | null;
    business_address?: string | null;
    website_url?: string | null;
    created_at: string;
    status?: string;
  };
}

export function BuilderInfo({ builder }: BuilderInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const yearsInBusiness = Math.floor(
    (new Date().getTime() - new Date(builder.created_at).getTime()) / 
    (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--color-surface), var(--color-canvas))',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '32px',
      boxShadow: 'var(--shadow-card)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'var(--color-terra-muted)',
        opacity: 0.1
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--color-terra)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
          }}>
            <Building size={24} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.2
            }}>
              About {builder.company_name}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: '4px 0 0',
              fontWeight: 500
            }}>
              Trusted real estate partner
            </p>
          </div>
        </div>

        {/* Description */}
        {builder.company_description && (
          <div style={{ 
            marginBottom: '28px',
            padding: '20px',
            background: 'var(--color-canvas)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              width: '4px',
              height: 'calc(100% - 16px)',
              background: 'var(--color-terra)',
              borderRadius: '2px'
            }} />
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: '12px'
            }}>
              {builder.company_description}
            </p>
          </div>
        )}

        {/* Info Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px' 
        }}>
          {/* Verification Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: builder.status === 'verified' ? 'var(--color-success-bg)' : 'var(--color-canvas)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${builder.status === 'verified' ? 'var(--color-success)' : 'var(--color-border-subtle)'}`
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: builder.status === 'verified' ? 'var(--color-success)' : 'var(--color-terra-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color={builder.status === 'verified' ? 'white' : 'var(--color-terra)'} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                marginBottom: '2px'
              }}>
                Status
              </div>
              <div style={{ 
                color: builder.status === 'verified' ? 'var(--color-success)' : 'var(--color-text-primary)', 
                fontSize: '0.95rem',
                fontWeight: 700
              }}>
                {builder.status === 'verified' ? 'Verified' : 'Pending'}
              </div>
            </div>
          </div>

          {/* Years in Business */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: 'var(--color-canvas)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--color-terra-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} color="var(--color-terra)" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                marginBottom: '2px'
              }}>
                Experience
              </div>
              <div style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '0.95rem',
                fontWeight: 700
              }}>
                {yearsInBusiness} {yearsInBusiness === 1 ? 'year' : 'years'}
              </div>
            </div>
          </div>

          {/* Address */}
          {builder.business_address && (
            <div style={{
              gridColumn: 'span 2',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--color-terra-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={20} color="var(--color-terra)" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  fontWeight: 600,
                  marginBottom: '4px'
                }}>
                  Location
                </div>
                <div style={{ 
                  color: 'var(--color-text-primary)', 
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  lineHeight: 1.4
                }}>
                  {builder.business_address}
                </div>
              </div>
            </div>
          )}

          {/* Website */}
          {builder.website_url && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--color-terra-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe size={20} color="var(--color-terra)" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  fontWeight: 600,
                  marginBottom: '2px'
                }}>
                  Website
                </div>
                <a 
                  href={builder.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'var(--color-terra)', 
                    fontSize: '0.95rem', 
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Visit Site
                  <Globe size={12} />
                </a>
              </div>
            </div>
          )}

          {/* Member Since */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: 'var(--color-canvas)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--color-terra-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={20} color="var(--color-terra)" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                marginBottom: '2px'
              }}>
                Member Since
              </div>
              <div style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '0.95rem',
                fontWeight: 700
              }}>
                {formatDate(builder.created_at)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
