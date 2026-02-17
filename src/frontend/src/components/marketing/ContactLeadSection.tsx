import { Mail, Phone, MessageSquare, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useSubmitQuickRequest, type QuickRequest } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ContactLeadSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // Quick Request form state
  const [formData, setFormData] = useState<QuickRequest>({
    name: '',
    email: '',
    phone: '',
    sport: '',
    gameDate: '',
    numberOfReferees: 1,
    eventType: 'Community',
    notes: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationError, setValidationError] = useState('');

  const submitMutation = useSubmitQuickRequest();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setShowSuccess(false);
    setShowError(false);
    setValidationError('');

    // Validate required fields
    if (!formData.name.trim()) {
      setValidationError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setValidationError('Please enter your email');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Please enter your phone number');
      return;
    }
    if (!formData.sport.trim()) {
      setValidationError('Please enter the sport');
      return;
    }
    if (!formData.gameDate) {
      setValidationError('Please select a game date');
      return;
    }
    if (!formData.numberOfReferees || formData.numberOfReferees < 1) {
      setValidationError('Please enter at least 1 referee');
      return;
    }
    if (!formData.eventType) {
      setValidationError('Please select an event type');
      return;
    }

    try {
      await submitMutation.mutateAsync(formData);
      setShowSuccess(true);
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        sport: '',
        gameDate: '',
        numberOfReferees: 1,
        eventType: 'Community',
        notes: '',
      });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit request:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
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
              Reach out today and secure certified referees for your next game. Fast response guaranteed—we're here to make officiating effortless.
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
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our chatbot in the bottom-right corner for instant assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Request Form */}
            <div className="rounded-xl border bg-card p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Quick Request</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sport">Sport *</Label>
                  <Input
                    id="sport"
                    type="text"
                    placeholder="Basketball, Soccer, etc."
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gameDate">Game Date *</Label>
                  <Input
                    id="gameDate"
                    type="date"
                    value={formData.gameDate}
                    onChange={(e) => setFormData({ ...formData, gameDate: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfReferees">Number of Referees *</Label>
                  <Input
                    id="numberOfReferees"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.numberOfReferees}
                    onChange={(e) => setFormData({ ...formData, numberOfReferees: parseInt(e.target.value) || 1 })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value as 'Corporate' | 'Community' | 'School/College' })}
                    disabled={submitMutation.isPending}
                  >
                    <SelectTrigger id="eventType">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="School/College">School/College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or details..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={submitMutation.isPending}
                  />
                </div>

                {validationError && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle size={16} />
                    <span>{validationError}</span>
                  </div>
                )}

                {showSuccess && (
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
                    <CheckCircle size={16} />
                    <span>Request submitted successfully! We'll contact you soon.</span>
                  </div>
                )}

                {showError && (
                  <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    <span>Failed to submit request. Please try again or contact us directly.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
