import { HeroSection } from '../components/marketing/HeroSection';
import { ServicesSection } from '../components/marketing/ServicesSection';
import { ProcessSection } from '../components/marketing/ProcessSection';
import { ContactLeadSection } from '../components/marketing/ContactLeadSection';
import { ChatbotLeadWidget } from '../components/lead/ChatbotLeadWidget';
import { QuickRequestsAdminView } from '../components/admin/QuickRequestsAdminView';
import { useIsCallerAdmin } from '../hooks/useQueries';

export function LandingPage() {
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();

  // Only render admin section when admin status is confirmed true
  const showAdminSection = !isAdminLoading && isAdmin === true;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ContactLeadSection />
      {showAdminSection && <QuickRequestsAdminView />}
      <ChatbotLeadWidget />
    </div>
  );
}
