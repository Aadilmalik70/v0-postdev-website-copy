import { X } from "lucide-react"

const problems = [
  "Designers ship. Developers rebuild from scratch.",
  "Every sprint burns days on UI — not features.",
  "Redesigns mean starting over. Again.",
  "Your best engineers are stuck in CSS purgatory.",
]

export function ProblemSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight text-balance">
          You're not a pixel pusher.
          <br />
          <span className="text-muted-foreground">So why are you acting like one?</span>
        </h2>

        <div className="space-y-6 mb-16">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <X className="w-4 h-4 text-primary" />
              </span>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-accent pl-6 py-2">
          <p className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
            The handoff loop is dead.
          </p>
          <p className="text-xl text-accent font-mono">Your Figma file is your frontend now.</p>
        </div>
      </div>
    </section>
  )
}
