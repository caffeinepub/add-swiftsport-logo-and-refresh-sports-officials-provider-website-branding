import { HeroSection } from '../components/marketing/HeroSection';
import { ServicesSection } from '../components/marketing/ServicesSection';
import { ProcessSection } from '../components/marketing/ProcessSection';
import { ContactLeadSection } from '../components/marketing/ContactLeadSection';
import { ChatbotLeadWidget } from '../components/lead/ChatbotLeadWidget';
import { QuickRequestsAdminView } from '../components/admin/QuickRequestsAdminView';

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ContactLeadSection />
      <QuickRequestsAdminView />
      <ChatbotLeadWidget />
    </div>
  );
}
