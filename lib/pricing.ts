export interface PricingTier {
  name: string
  price: string
  period: string
  availability: string
  description: string
  features: string[]
  teaserFeatures: string[]
  cta: string
  featured?: boolean
}

export const pricingStatus = {
  label: "Early-access pricing",
  summary:
    "Paid prices are current early-access targets for approved accounts. Joining early access does not start a subscription or charge a card.",
  billing:
    "Final scope, activation date, included limits, and billing start are confirmed before activation. No annual discount, automatic overage pricing, or paid-plan trial is currently published.",
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Audit",
    price: "$0",
    period: "",
    availability: "Available now",
    description: "See the first evidence-backed opportunities before enabling execution.",
    features: [
      "One submitted website",
      "Technical SEO and GEO readiness review",
      "Impact-ranked opportunity queue",
      "No automated fixes or paid subscription",
    ],
    teaserFeatures: [
      "One submitted website",
      "Technical SEO and GEO readiness review",
      "Impact-ranked opportunity queue",
      "No automated fixes",
    ],
    cta: "Run Free Growth Audit",
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    availability: "Early-access target",
    description: "Governed execution for one site after scope and access are approved.",
    features: [
      "Everything in Audit",
      "Approval-gated technical and content actions",
      "Up to 4 content actions per month",
      "Monitoring, action logs, and outcome windows",
      "One connected site",
      "Email summaries",
    ],
    teaserFeatures: [
      "Everything in Audit",
      "Approval-gated execution",
      "Up to 4 content actions per month",
      "One connected site",
    ],
    cta: "Join early access",
    featured: true,
  },
  {
    name: "Scale",
    price: "$99",
    period: "/month",
    availability: "Early-access target",
    description: "More capacity for multi-site monitoring and governed execution.",
    features: [
      "Everything in Growth",
      "AI citation and prompt monitoring",
      "Up to 12 content actions per month",
      "Competitor source-gap monitoring",
      "Up to 3 connected sites",
      "Priority onboarding support",
    ],
    teaserFeatures: [
      "Everything in Growth",
      "AI citation and prompt monitoring",
      "Up to 12 content actions per month",
      "Up to 3 connected sites",
    ],
    cta: "Join early access",
  },
]
