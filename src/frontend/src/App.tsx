import { useEffect } from 'react';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { LandingPage } from './pages/LandingPage';
import { trackPageView } from './utils/analytics/ga4';

function App() {
  // Track initial page view on app load
  useEffect(() => {
    trackPageView('SwiftSport Hub - Home', '/');
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
