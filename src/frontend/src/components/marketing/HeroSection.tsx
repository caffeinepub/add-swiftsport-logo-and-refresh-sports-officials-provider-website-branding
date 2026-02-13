import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 md:py-28 lg:py-36">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CheckCircle2 size={16} />
              Trusted by 1,000+ Organizations
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Certified Officials,{' '}
              <span className="text-primary">Delivered Fast</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Stop scrambling for referees. SwiftSport connects you with vetted, professional sports officials in minutes—so your games run smoothly, every time.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl"
              >
                Book Officials Now
                <ArrowRight size={18} />
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-8 py-3 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                See How It Works
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Certified Officials</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Sports Covered</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/generated/swiftsport-hero.dim_1600x900.png" 
                alt="Professional sports referee officiating a game with confidence and authority"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
