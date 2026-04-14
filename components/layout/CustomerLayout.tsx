import { BottomNav } from './BottomNav';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { MobileTopBar } from './MobileTopBar';
import { LoginNagModal } from '../auth/LoginNagModal';

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Desktop-only top nav */}
      <TopNav />
      {/* Mobile-only native top bar with back button + page title */}
      <MobileTopBar />
      {/* Main content — bottom padding on mobile prevents bottom nav overlap */}
      <main style={{ flex: 1 }} className="md:pb-0 pb-[68px]">
        {children}
        <Footer />
      </main>
      {/* Mobile-only bottom nav */}
      <BottomNav />
      
      {/* Global Auth Nag Modal for Guests */}
      <LoginNagModal />
    </div>
  );
}

