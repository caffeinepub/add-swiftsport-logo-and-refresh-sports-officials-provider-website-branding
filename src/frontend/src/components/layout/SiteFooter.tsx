import { Logo } from '../branding/Logo';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { getPublicSiteHostname } from '@/utils/publicSiteBaseUrl';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(getPublicSiteHostname());

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-lg font-bold">SwiftSport</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional sports officials provider. Quality referees, umpires, and officials for your games and events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:swiftsports1512@gmail.com" className="hover:text-foreground transition-colors">
                  swiftsports1512@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+918431680623" className="hover:text-foreground transition-colors">
                  843-168-0623
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span>Serving communities nationwide</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Availability</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 8am - 8pm</li>
              <li>Saturday: 9am - 6pm</li>
              <li>Sunday: 10am - 4pm</li>
              <li className="pt-2 text-primary font-medium">24/7 Emergency Support</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} SwiftSport. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
