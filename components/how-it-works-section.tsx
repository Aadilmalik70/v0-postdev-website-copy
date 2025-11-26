import { Eye, Brain, Code2, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Eye,
    label: "Extract",
    description: "Pulls structure, hierarchy, and design tokens directly from Figma.",
  },
  {
    icon: Brain,
    label: "Model",
    description: "Builds an internal layout representation — understands your UI like a senior dev would.",
  },
  {
    icon: Code2,
    label: "Generate",
    description: "Outputs clean React + Tailwind, wired to a runnable project scaffold.",
  },
  {
    icon: CheckCircle,
    label: "Validate",
    description: "Renders, compares, corrects. Loops until the output matches the original design.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-tight text-center">
          Under the hood
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-accent/50 to-transparent" />
              )}

              <div className="relative bg-background border border-border rounded-2xl p-6 hover:border-accent/50 transition-all">
                {/* Step Number */}
                <div className="absolute -top-3 left-6 px-2 py-0.5 bg-background border border-accent rounded font-mono text-xs text-accent">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mt-2">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>

                {/* Label */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.label}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center border-t border-border pt-12">
          <p className="text-lg text-foreground/80 mb-2">Not another "AI code assistant" —</p>
          <p className="font-display text-2xl md:text-3xl font-bold text-accent">
            an autonomous agent that builds, tests, and ships UI.
          </p>
        </div>
      </div>
    </section>
  )
}
