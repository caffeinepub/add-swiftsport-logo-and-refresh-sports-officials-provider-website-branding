import { Flag, Users, Trophy, Shield, Clock, Star } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Flag,
      title: 'Certified Referees',
      description: 'Vetted, background-checked officials for soccer, basketball, football, and more—ready when you need them.'
    },
    {
      icon: Users,
      title: 'Umpires & Judges',
      description: 'Professional umpires for baseball and softball, plus judges for gymnastics, diving, and competitive events.'
    },
    {
      icon: Trophy,
      title: 'Tournament Coverage',
      description: 'Full officiating crews for tournaments and multi-day events. We handle scheduling, coordination, and backups.'
    },
    {
      icon: Shield,
      title: 'Liability Protection',
      description: 'Every official carries professional liability insurance—your organization stays protected on every assignment.'
    },
    {
      icon: Clock,
      title: 'Fast Replacements',
      description: 'Last-minute cancellation? Our 24/7 emergency support gets you a replacement official—fast.'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'All officials are rated and evaluated. Consistent, high-quality officiating you can count on, game after game.'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Everything You Need for Seamless Games
          </h2>
          <p className="text-lg text-muted-foreground">
            From youth leagues to competitive tournaments, we provide reliable, certified officials who show up prepared and on time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group rounded-xl border bg-card p-6 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Sports Coverage with Image */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  15+ Sports Covered
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    'Soccer', 'Basketball', 'Baseball', 'Softball',
                    'Football', 'Volleyball', 'Hockey', 'Lacrosse',
                    'Tennis', 'Track & Field', 'Swimming', 'Wrestling',
                    'Gymnastics', 'Rugby', 'And more...'
                  ].map((sport, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{sport}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/generated/swiftsport-support-1.dim_1200x800.png" 
                  alt="Diverse group of professional sports officials ready to officiate various sports"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
