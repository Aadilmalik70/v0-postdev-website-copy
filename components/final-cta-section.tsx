import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
          Still coding UI by hand?
        </h2>

        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          The shift is already happening. Teams using <span className="text-accent font-semibold">POSTDEV</span> ship
          faster, stress less, and spend time on what actually matters — building product, not rebuilding pixels.
        </p>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-7 text-xl shadow-[0_0_40px_rgba(255,59,48,0.5)] hover:shadow-[0_0_60px_rgba(255,59,48,0.7)] transition-all group"
        >
          Claim your spot
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="mt-8 text-sm text-muted-foreground font-mono max-w-md mx-auto">
          Early access is intentionally limited. We're building with a few teams, not for everyone.
        </p>
      </div>
    </section>
  )
}
