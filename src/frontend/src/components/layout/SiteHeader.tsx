import { Logo } from '../branding/Logo';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { useIsCallerAdmin } from '@/hooks/useQueries';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size="md" />
          <span className="text-xl font-bold">SwiftSport</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </button>
          {!isAdminLoading && isAdmin && (
            <button
              onClick={() => scrollToSection('admin-requests')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Shield size={16} />
              Admin
            </button>
          )}
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Request Officials
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col gap-4 py-4">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </button>
            {!isAdminLoading && isAdmin && (
              <button
                onClick={() => scrollToSection('admin-requests')}
                className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Shield size={16} />
                Admin
              </button>
            )}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Request Officials
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
