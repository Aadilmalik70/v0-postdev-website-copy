import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/50 bg-accent/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent uppercase tracking-widest">Early Access — Limited Seats</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-4">
          POST<span className="text-primary">DEV</span>
        </h1>

        {/* Sub-headline */}
        <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mb-8 tracking-tight">
          Design ships. Code follows.
        </p>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-12 leading-relaxed">
          Paste a Figma link. Get production-ready <span className="text-foreground font-medium">React + Tailwind</span>{" "}
          — not snippets, not templates. <span className="text-accent">A working UI.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg shadow-[0_0_30px_rgba(255,59,48,0.4)] hover:shadow-[0_0_50px_rgba(255,59,48,0.6)] transition-all"
          >
            Request early access
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary text-foreground px-8 py-6 text-lg group bg-transparent"
          >
            <Play className="w-4 h-4 mr-2 group-hover:text-accent transition-colors" />
            See it in action
          </Button>
        </div>

        {/* Micro-text */}
        <p className="text-sm text-muted-foreground font-mono">
          For teams who refuse to rebuild what's already designed.
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
