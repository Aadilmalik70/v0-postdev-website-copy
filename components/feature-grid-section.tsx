import { Check } from "lucide-react"

const features = [
  "React + TypeScript project, Vite-ready",
  "TailwindCSS utility classes based on your design",
  "Reusable components (buttons, cards, forms, layout blocks)",
  "Sandbox build & preview",
  "Visual similarity check between design and output",
  "CLI + (coming soon) VSCode + Figma integrations",
]

export function FeatureGridSection() {
  return (
    <section className="py-32 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-tight text-center">
          What you get out of the box.
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border hover:border-accent/30 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-accent" />
              </span>
              <span className="text-foreground/90 font-mono text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
