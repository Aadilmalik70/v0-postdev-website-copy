import { Rocket, Code, Building2 } from "lucide-react"

const personas = [
  {
    icon: Rocket,
    title: "Founders & product teams",
    quote: "You want to ship UI fast without hiring a huge frontend team.",
  },
  {
    icon: Code,
    title: "Engineers",
    quote: "You'd rather focus on logic, performance, and architecture — not CSS pixel nudging.",
  },
  {
    icon: Building2,
    title: "Agencies & studios",
    quote: "You deliver many screens a month and every handoff burns hours of dev time.",
  },
]

export function WhoItsForSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight text-center text-balance">
          If this sounds like you, POSTDEV was built for you.
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Used by builders who are tired of waiting weeks for simple screens.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl border border-border bg-gradient-to-b from-card to-background hover:border-primary/50 transition-all group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <persona.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{persona.title}</h3>

              {/* Quote */}
              <p className="text-foreground/70 italic leading-relaxed">"{persona.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
