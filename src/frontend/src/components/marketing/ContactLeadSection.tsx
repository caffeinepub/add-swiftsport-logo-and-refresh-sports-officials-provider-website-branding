import { Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function ContactLeadSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Let's Get Your Game Covered
            </h2>
            <p className="text-lg text-muted-foreground">
              Reach out today and secure certified officials for your next game. Fast response guaranteed—we're here to make officiating effortless.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Drop us a line with your requirements—expect a reply within 24 hours.
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href="mailto:swiftsports1512@gmail.com"
                        className="text-primary hover:underline font-medium"
                      >
                        swiftsports1512@gmail.com
                      </a>
                      <button
                        onClick={() => copyToClipboard('swiftsports1512@gmail.com', 'email')}
                        className="p-1 hover:bg-secondary rounded transition-colors"
                        aria-label="Copy email"
                      >
                        {copiedEmail ? (
                          <Check size={16} className="text-primary" />
                        ) : (
                          <Copy size={16} className="text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                    <Phone size={24} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Talk to our team directly for instant answers and bookings.
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+918431680623"
                        className="text-primary hover:underline font-medium"
                      >
                        843-168-0623
                      </a>
                      <button
                        onClick={() => copyToClipboard('8431680623', 'phone')}
                        className="p-1 hover:bg-secondary rounded transition-colors"
                        aria-label="Copy phone"
                      >
                        {copiedPhone ? (
                          <Check size={16} className="text-primary" />
                        ) : (
                          <Copy size={16} className="text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">Emergency Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Last-minute cancellation? We've got you covered with 24/7 emergency official replacements.
                    </p>
                    <p className="text-primary font-medium">Available anytime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Form */}
            <div className="rounded-xl border bg-card p-8 shadow-soft">
              <h3 className="text-xl font-semibold mb-6">Quick Request</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="sport" className="text-sm font-medium">
                    Sport
                  </label>
                  <input
                    id="sport"
                    type="text"
                    placeholder="e.g., Soccer, Basketball"
                    className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Game Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="level" className="text-sm font-medium">
                    Competition Level
                  </label>
                  <select
                    id="level"
                    className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select level</option>
                    <option value="youth">Youth</option>
                    <option value="high-school">High School</option>
                    <option value="college">College</option>
                    <option value="adult-rec">Adult Recreation</option>
                    <option value="competitive">Competitive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Any special requirements or details..."
                    className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Fill out the form and click below to send us your request via email.
                </p>

                <button
                  onClick={() => {
                    const sport = (document.getElementById('sport') as HTMLInputElement)?.value;
                    const date = (document.getElementById('date') as HTMLInputElement)?.value;
                    const level = (document.getElementById('level') as HTMLSelectElement)?.value;
                    const notes = (document.getElementById('notes') as HTMLTextAreaElement)?.value;
                    
                    const subject = encodeURIComponent('Official Request - SwiftSport');
                    const body = encodeURIComponent(
                      `Sport: ${sport}\nDate: ${date}\nLevel: ${level}\nNotes: ${notes}`
                    );
                    
                    window.location.href = `mailto:swiftsports1512@gmail.com?subject=${subject}&body=${body}`;
                  }}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  Send via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
