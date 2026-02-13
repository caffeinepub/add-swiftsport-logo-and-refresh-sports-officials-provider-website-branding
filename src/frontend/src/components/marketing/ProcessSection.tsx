import { Calendar, Search, CheckCircle, Gamepad2, ClipboardCheck } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: Calendar,
      title: 'Submit Your Request',
      description: 'Tell us your sport, date, time, location, and competition level. Takes less than 2 minutes.'
    },
    {
      icon: Search,
      title: 'We Match You Instantly',
      description: 'Our system finds qualified officials based on certification, experience, and availability—no waiting around.'
    },
    {
      icon: CheckCircle,
      title: 'Get Confirmation Fast',
      description: 'Receive official assignments with credentials and contact info 48 hours before game time. Guaranteed.'
    },
    {
      icon: Gamepad2,
      title: 'Officials Arrive Ready',
      description: 'Your officials show up on time, fully equipped, and briefed on your league rules. No surprises.'
    },
    {
      icon: ClipboardCheck,
      title: 'Rate & Improve',
      description: 'Share feedback after the game. We use your input to maintain the highest quality standards.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            From Request to Game Day in 3 Clicks
          </h2>
          <p className="text-lg text-muted-foreground">
            No phone tag. No uncertainty. Just fast, reliable officiating—every single time.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col md:flex-row gap-6 items-start">
                  {/* Step number and icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <Icon size={28} />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 pt-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>

                  {/* Connector line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 hidden md:block h-full w-0.5 bg-border" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl"
          >
            Start Your Request Now
          </button>
        </div>
      </div>
    </section>
  );
}
