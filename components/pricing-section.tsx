import { Button } from "@/components/ui/button"
import { User, Users, Building } from "lucide-react"

const tiers = [
  {
    icon: User,
    name: "Solo",
    description: "For individual builders",
  },
  {
    icon: Users,
    name: "Team",
    description: "For startups and agencies",
    featured: true,
  },
  {
    icon: Building,
    name: "Scale",
    description: "For product orgs with big design systems",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Early access = unfair advantage.
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
          In early access, we're working closely with a small group of teams. They get better output. We get better
          product. <span className="text-accent font-medium">Everyone wins.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all ${
                tier.featured
                  ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-[0_0_40px_rgba(255,59,48,0.15)]"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono font-bold rounded-full">
                  POPULAR
                </span>
              )}

              <div
                className={`w-14 h-14 rounded-xl mx-auto mb-6 flex items-center justify-center ${
                  tier.featured ? "bg-primary/20" : "bg-accent/10"
                }`}
              >
                <tier.icon className={`w-7 h-7 ${tier.featured ? "text-primary" : "text-accent"}`} />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-6">{tier.description}</p>

              <p className="text-sm text-muted-foreground font-mono">Pricing coming soon</p>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-6 text-lg shadow-[0_0_30px_rgba(255,59,48,0.4)] hover:shadow-[0_0_50px_rgba(255,59,48,0.6)] transition-all"
        >
          Apply for early access
        </Button>
      </div>
    </section>
  )
}
