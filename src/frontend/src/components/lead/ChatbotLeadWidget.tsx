import { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmitRefereeRequest, type RefereeRequest } from '@/hooks/useQueries';

type ChatStep = 
  | 'welcome'
  | 'sport'
  | 'officials'
  | 'date'
  | 'location'
  | 'level'
  | 'name'
  | 'contact'
  | 'review'
  | 'success'
  | 'error';

export function ChatbotLeadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>('welcome');
  const [formData, setFormData] = useState<Partial<RefereeRequest>>({});
  const [referenceId, setReferenceId] = useState('');
  
  const submitMutation = useSubmitRefereeRequest();

  const resetChat = () => {
    setStep('welcome');
    setFormData({});
    setReferenceId('');
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.name || !formData.phone || !formData.sport || 
        !formData.numberOfOfficials || !formData.dateTime || !formData.location || 
        !formData.competitionLevel) {
      setStep('error');
      return;
    }

    try {
      await submitMutation.mutateAsync(formData as RefereeRequest);
      const refId = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setReferenceId(refId);
      setStep('success');
    } catch (error) {
      console.error('Failed to submit request:', error);
      setStep('error');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">
                  Hi! I'm here to help you request sports officials. I'll need a few details about your game. Ready to get started?
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep('sport')} className="gap-2">
                Let's Go <Send size={16} />
              </Button>
            </div>
          </div>
        );

      case 'sport':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">What sport do you need officials for?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="e.g., Soccer, Basketball, Baseball"
                value={formData.sport || ''}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.sport) {
                    setStep('officials');
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('officials')} 
                  disabled={!formData.sport}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 'officials':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">How many officials do you need?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                min="1"
                placeholder="e.g., 3"
                value={formData.numberOfOfficials || ''}
                onChange={(e) => setFormData({ ...formData, numberOfOfficials: parseInt(e.target.value) || 0 })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.numberOfOfficials) {
                    setStep('date');
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('date')} 
                  disabled={!formData.numberOfOfficials || formData.numberOfOfficials < 1}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">When is your game?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="datetime-local"
                value={formData.dateTime || ''}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('location')} 
                  disabled={!formData.dateTime}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">Where will the game take place?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="e.g., Central Sports Complex, City Name"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.location) {
                    setStep('level');
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('level')} 
                  disabled={!formData.location}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 'level':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">What's the competition level?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Select
                value={formData.competitionLevel || ''}
                onValueChange={(value) => {
                  setFormData({ ...formData, competitionLevel: value });
                  setTimeout(() => setStep('name'), 100);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="adult-recreation">Adult Recreation</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">Great! Now I need your contact information. What's your name?</p>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Your full name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.name) {
                    setStep('contact');
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('contact')} 
                  disabled={!formData.name}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm">Finally, please provide your email and phone number.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep('review')} 
                  disabled={!formData.email || !formData.phone}
                  size="sm"
                >
                  Review Request
                </Button>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm font-medium mb-3">Please review your request:</p>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Sport:</span> {formData.sport}</div>
                  <div><span className="font-medium">Officials needed:</span> {formData.numberOfOfficials}</div>
                  <div><span className="font-medium">Date & Time:</span> {formData.dateTime ? new Date(formData.dateTime).toLocaleString() : ''}</div>
                  <div><span className="font-medium">Location:</span> {formData.location}</div>
                  <div><span className="font-medium">Level:</span> {formData.competitionLevel}</div>
                  <div><span className="font-medium">Name:</span> {formData.name}</div>
                  <div><span className="font-medium">Email:</span> {formData.email}</div>
                  <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep('welcome')} size="sm">
                Start Over
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={submitMutation.isPending}
                size="sm"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium mb-2">Request submitted successfully!</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      We'll review your request and contact you within 24 hours.
                    </p>
                    <div className="bg-background rounded p-2 border">
                      <p className="text-xs text-muted-foreground">Reference ID:</p>
                      <p className="text-sm font-mono font-medium">{referenceId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => { resetChat(); setIsOpen(false); }} size="sm">
                Close
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img 
                src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                alt="SwiftSport assistant avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium mb-1">Submission failed</p>
                    <p className="text-sm text-muted-foreground">
                      We couldn't submit your request. Please try again or contact us directly at{' '}
                      <a href="mailto:swiftsports1512@gmail.com" className="text-primary hover:underline">
                        swiftsports1512@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetChat} size="sm">
                Start Over
              </Button>
              <Button onClick={() => setStep('review')} size="sm">
                Try Again
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
      <div className="rounded-lg border bg-card shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
              alt="SwiftSport assistant avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-sm">SwiftSport Assistant</h3>
              <p className="text-xs opacity-90">Request Officials</p>
            </div>
          </div>
          <button
            onClick={() => { setIsOpen(false); resetChat(); }}
            className="hover:bg-primary-foreground/20 rounded p-1 transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Content */}
        <div className="p-4 max-h-[500px] overflow-y-auto bg-background">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
