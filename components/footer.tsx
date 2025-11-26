export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            POST<span className="text-primary">DEV</span>
          </span>
          <span className="text-muted-foreground text-sm">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
