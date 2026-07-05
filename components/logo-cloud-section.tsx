import Image from "next/image"

const logos = [
  { name: "WordPress", logo: "/logos/wordpress.svg" },
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "Next.js", logo: "/logos/nextdotjs.svg" },
  { name: "Webflow", logo: "/logos/webflow.svg" },
  { name: "Ghost", logo: "/logos/ghost.svg" },
  { name: "Wix", logo: "/logos/wix.svg" },
  { name: "Sanity", logo: "/logos/sanity.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "Netlify", logo: "/logos/netlify.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
]

export function LogoCloudSection() {
  return (
    <section className="py-14 border-y border-line bg-surface/50">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 text-center mb-8">
          Executes safely in the stack you already run
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track gap-14 items-center">
            {[...logos, ...logos].map((item, i) => (
              <div
                key={item.name + i}
                className="flex items-center gap-2.5 opacity-100 transition-opacity duration-300 shrink-0"
              >
                <Image src={item.logo} alt={item.name} width={22} height={22} className="brightness-0 opacity-90" />
                <span className="text-sm font-medium text-neutral-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
