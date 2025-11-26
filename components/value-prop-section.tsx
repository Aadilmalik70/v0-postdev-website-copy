import { FileCode2, RefreshCw, Blocks } from "lucide-react"

const valueProps = [
  {
    icon: FileCode2,
    title: "Figma in. React out.",
    points: [
      "Paste a link. That's it.",
      "POSTDEV reads layout, tokens, hierarchy.",
      "You get clean React + TypeScript + Tailwind.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Self-healing code",
    points: [
      "Runs in a sandbox. Catches its own errors.",
      "Auto-corrects until pixel-perfect.",
      "No babysitting. No debugging AI output.",
    ],
  },
  {
    icon: Blocks,
    title: "Production-grade. Not a demo.",
    points: [
      "Real components. Real architecture.",
      "Slots into your design system.",
      "Ready for your API, your logic, your stack.",
    ],
  },
]

export function ValuePropSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight text-center">
          Static design to live UI
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 font-mono">— in minutes, not sprints.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              {/* Number Badge */}
              <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent text-accent-foreground font-mono text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <prop.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{prop.title}</h3>

              {/* Points */}
              <ul className="space-y-3">
                {prop.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3 text-foreground/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
