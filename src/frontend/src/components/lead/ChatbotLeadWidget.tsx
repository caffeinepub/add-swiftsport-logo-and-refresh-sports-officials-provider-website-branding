import { MessageCircle, X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useSubmitRefereeRequest, type RefereeRequest } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trackConversion } from '@/utils/analytics/ga4';

type ChatStep = 
  | 'welcome'
  | 'sport'
  | 'date'
  | 'numberOfReferees'
  | 'eventType'
  | 'location'
  | 'competitionLevel'
  | 'numberOfDays'
  | 'contact'
  | 'submitting'
  | 'success'
  | 'error';

export function ChatbotLeadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [formData, setFormData] = useState<Partial<RefereeRequest>>({
    numberOfOfficials: 1,
    numberOfDaysEvent: 1,
  });

  const submitMutation = useSubmitRefereeRequest();

  const resetChat = () => {
    setCurrentStep('welcome');
    setFormData({
      numberOfOfficials: 1,
      numberOfDaysEvent: 1,
    });
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!formData.sport || !formData.dateTime || !formData.numberOfOfficials || 
        !formData.eventType || !formData.location || !formData.competitionLevel || 
        !formData.numberOfDaysEvent || !formData.name || !formData.email || !formData.phone) {
      setCurrentStep('error');
      return;
    }

    setCurrentStep('submitting');
    try {
      await submitMutation.mutateAsync(formData as RefereeRequest);
      
      // Track successful chatbot submission (no PII)
      trackConversion('chatbot_request', {
        sport: formData.sport,
        event_type: formData.eventType,
        number_of_officials: formData.numberOfOfficials,
        competition_level: formData.competitionLevel,
        number_of_days: formData.numberOfDaysEvent,
      });
      
      setCurrentStep('success');
    } catch (error) {
      console.error('Failed to submit:', error);
      setCurrentStep('error');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">
                    Hi! I'm here to help you request certified sports referees. Let's get started—this will only take a minute!
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={() => setCurrentStep('sport')} className="w-full">
              Start Request
            </Button>
          </div>
        );

      case 'sport':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">What sport do you need referees for?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport">Sport *</Label>
              <Input
                id="sport"
                type="text"
                placeholder="e.g., Soccer, Basketball, Baseball"
                value={formData.sport || ''}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.sport?.trim()) {
                    setCurrentStep('date');
                  }
                }}
              />
            </div>
            <Button 
              onClick={() => setCurrentStep('date')} 
              disabled={!formData.sport?.trim()}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 'date':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">When do you need the referees?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTime">Date & Time *</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={formData.dateTime || ''}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('sport')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('numberOfReferees')} 
                disabled={!formData.dateTime}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'numberOfReferees':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">How many referees do you need?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfOfficials">Number of Referees *</Label>
              <Input
                id="numberOfOfficials"
                type="number"
                min="1"
                placeholder="1"
                value={formData.numberOfOfficials || 1}
                onChange={(e) => setFormData({ ...formData, numberOfOfficials: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('date')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('eventType')} 
                disabled={!formData.numberOfOfficials || formData.numberOfOfficials < 1}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'eventType':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">What type of event is this?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type *</Label>
              <Select
                value={formData.eventType}
                onValueChange={(value: 'Corporate' | 'Community' | 'School/College') => 
                  setFormData({ ...formData, eventType: value })
                }
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('numberOfReferees')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('location')} 
                disabled={!formData.eventType}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">Where will the event take place?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                placeholder="City, State or Venue Name"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.location?.trim()) {
                    setCurrentStep('competitionLevel');
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('eventType')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('competitionLevel')} 
                disabled={!formData.location?.trim()}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'competitionLevel':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">What's the competition level?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitionLevel">Competition Level *</Label>
              <Input
                id="competitionLevel"
                type="text"
                placeholder="e.g., Youth, High School, College, Professional"
                value={formData.competitionLevel || ''}
                onChange={(e) => setFormData({ ...formData, competitionLevel: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.competitionLevel?.trim()) {
                    setCurrentStep('numberOfDays');
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('location')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('numberOfDays')} 
                disabled={!formData.competitionLevel?.trim()}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'numberOfDays':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">How many days is the event?</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfDaysEvent">Number of Days *</Label>
              <Input
                id="numberOfDaysEvent"
                type="number"
                min="1"
                placeholder="1"
                value={formData.numberOfDaysEvent || 1}
                onChange={(e) => setFormData({ ...formData, numberOfDaysEvent: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('competitionLevel')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('contact')} 
                disabled={!formData.numberOfDaysEvent || formData.numberOfDaysEvent < 1}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm">Great! Last step—how can we reach you?</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('numberOfDays')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()}
                className="flex-1"
              >
                <Send size={16} className="mr-2" />
                Submit
              </Button>
            </div>
          </div>
        );

      case 'submitting':
        return (
          <div className="space-y-4 text-center py-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-sm text-muted-foreground">Submitting your request...</p>
          </div>
        );

      case 'success':
        return (
          <div className="space-y-4 text-center py-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle size={48} className="text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Request Submitted!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you! We've received your request and will contact you shortly to confirm the details.
              </p>
            </div>
            <Button onClick={resetChat} className="w-full">
              Submit Another Request
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-4 text-center py-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle size={48} className="text-destructive" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Submission Failed</h3>
              <p className="text-sm text-muted-foreground">
                We couldn't submit your request. Please try again or contact us directly.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetChat} className="flex-1">
                Start Over
              </Button>
              <Button onClick={() => setCurrentStep('contact')} className="flex-1">
                Try Again
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-chatbot hover:scale-110 transition-transform"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
          <div className="bg-card border rounded-xl shadow-chatbot overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/generated/swiftsport-chatbot-avatar.dim_256x256.png" 
                  alt="SwiftSport Assistant"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">SwiftSport Assistant</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 max-h-[500px] overflow-y-auto">
              {renderStepContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
