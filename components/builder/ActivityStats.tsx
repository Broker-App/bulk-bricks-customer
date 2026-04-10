import { Building, Users, CheckCircle, TrendingUp, Star } from 'lucide-react';

interface ActivityStatsProps {
  stats: {
    total_properties: number;
    active_listings: number;
    sold: number;
    customer_accesses: number;
  };
}

export function ActivityStats({ stats }: ActivityStatsProps) {
  const statItems = [
    {
      label: 'Total Properties',
      value: stats.total_properties,
      icon: Building,
      color: 'var(--color-terra)',
      description: 'Properties listed by this builder'
    },
    {
      label: 'Available Now',
      value: stats.active_listings,
      icon: CheckCircle,
      color: 'var(--color-success)',
      description: 'Currently available for purchase'
    },
    {
      label: 'Properties Sold',
      value: stats.sold,
      icon: TrendingUp,
      color: 'var(--color-success)',
      description: 'Successfully sold properties'
    },
    {
      label: 'Happy Customers',
      value: stats.customer_accesses,
      icon: Users,
      color: 'var(--color-terra)',
      description: 'Customers who connected with this builder'
    }
  ];

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
        bottom: '-30px',
        left: '-30px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'var(--color-terra-muted)',
        opacity: 0.08
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px'
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
            <Star size={24} color="white" strokeWidth={2.5} />
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
              Builder Performance
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: '4px 0 0',
              fontWeight: 500
            }}>
              Track record of excellence
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gap: '16px',
          marginBottom: '28px'
        }} className="activity-stats-grid">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-subtle)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '80px'
                }}
              >
                {/* Hover effect overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `${item.color}05`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} />
                
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${item.color}30`,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Icon size={24} color={item.color} strokeWidth={2.5} />
                </div>
                <div style={{ position: 'relative', zIndex: 1, flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                    marginBottom: '4px',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {item.value}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.3,
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Trust Badge */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-terra-muted), var(--color-success-bg))',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          border: '1px solid var(--color-terra)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background pattern */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            width: '80px',
            height: '80px',
            opacity: 0.1
          }}>
            <Star size={80} color="var(--color-terra)" fill="var(--color-terra)" />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              marginBottom: '12px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--color-terra)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
              }}>
                <Star size={18} color="white" fill="white" strokeWidth={2} />
              </div>
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-terra)',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  Trusted Builder
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-secondary)',
                  margin: '2px 0 0',
                  fontWeight: 500
                }}>
                  Verified & Reliable
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-terra)',
                  fontFamily: 'var(--font-display)',
                  marginBottom: '2px'
                }}>
                  {stats.customer_accesses}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Happy Customers
                </div>
              </div>
              
              <div style={{ 
                width: '1px', 
                background: 'var(--color-terra)', 
                opacity: 0.3 
              }} />
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-terra)',
                  fontFamily: 'var(--font-display)',
                  marginBottom: '2px'
                }}>
                  {stats.sold}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Properties Sold
                </div>
              </div>
            </div>
            
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              margin: '16px 0 0',
              lineHeight: 1.5,
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              This builder has been thoroughly verified and has successfully served {stats.customer_accesses} customers with excellence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
