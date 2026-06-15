/**
 * FAQ Schema Configurations for Specific Blog Posts
 * Maps blog slugs to their FAQ schemas
 */

import { FAQItem, getFAQSchema } from "./schema"

// Define FAQs for specific pages
const faqDatabase: Record<string, FAQItem[]> = {
  "generative-engine-optimization-geo-guide": [
    {
      question: "What is Generative Engine Optimization?",
      answer:
        "Generative Engine Optimization (GEO) is the process of optimizing content to be cited or summarized by AI search engines such as Google AI Overviews, Perplexity, ChatGPT Search, and Gemini. It focuses on content structure, factual specificity, and attribution — the signals AI systems use to decide what to include in a generated answer.",
    },
    {
      question: "How is GEO different from traditional SEO?",
      answer:
        "Traditional SEO optimizes for ranking position in blue-link results. GEO optimizes for citation frequency in AI-generated answers. SEO success is measured by click-through rate; GEO success is measured by brand mention and citation rate inside AI responses. They share many foundational signals — domain authority, content quality, technical health — but differ in content format and intent.",
    },
    {
      question: "How long does GEO take to see results?",
      answer:
        "Perplexity responds fastest — you can see new citations in 3–6 weeks after publishing well-structured, fresh content. Google AI Overviews are slower, typically 8–16 weeks, because they're tied to traditional index trust signals. ChatGPT Search falls in the middle. Most clients see measurable movement in their target citation queries within 90 days of consistent GEO work.",
    },
    {
      question: "Does GEO replace SEO?",
      answer:
        "No. GEO complements SEO — it doesn't replace it. Many GEO signals (domain authority, backlinks, technical health) are identical to SEO signals. The difference is in content format and strategy. Sites that do both well — strong traditional SEO foundation plus GEO-optimized content structure — consistently outperform those that focus on either in isolation.",
    },
    {
      question: "How do I know if my content is being cited by AI search engines?",
      answer:
        "The most reliable manual method is to search your target queries in Perplexity and note whether your domain appears in the Sources panel. For Google AI Overviews, monitor branded impressions in Google Search Console for unexplained increases. Brand monitoring tools (Brand24, Mention) can surface some AI-related mentions. Enterprise tools like BrightEdge and Semrush now include AI visibility tracking dashboards for more systematic monitoring.",
    },
  ],

  "what-is-geo-optimization": [
    {
      question: "What does GEO stand for?",
      answer:
        "GEO stands for Generative Engine Optimization — the practice of optimizing content so AI-powered search engines can cite, summarize, and trust it in generated answers.",
    },
    {
      question: "What is GEO in SEO?",
      answer:
        "In SEO, GEO refers to optimizing your content for AI search engines like ChatGPT, Perplexity, and Google AI Overviews. While traditional SEO focuses on ranking in Google's blue links, GEO focuses on getting your content cited inside AI-generated answers.",
    },
    {
      question: "What is GEO vs SEO?",
      answer:
        "SEO optimizes for ranking position in search results. GEO optimizes for citation frequency in AI-generated answers. SEO aims to get clicks; GEO aims to get cited. They work together — most GEO signals (domain authority, content quality) are identical to SEO signals, but GEO requires more structured, quotable content.",
    },
    {
      question: "Is GEO replacing SEO?",
      answer:
        "No. GEO complements SEO rather than replacing it. Sites need both: traditional SEO for ranking in Google's blue links, and GEO for appearing in AI-generated answers. The brands doing both will capture traffic from traditional search AND AI search.",
    },
    {
      question: "How much does GEO optimization cost?",
      answer:
        "GEO optimization cost depends on your approach. DIY GEO (adding schema markup, FAQs, and structured content yourself) costs only time. Hiring an SEO agency to add GEO to their services typically adds $1,000-$5,000/month. AI-powered SEO agents like SERP Strategists start at $99/month and handle GEO optimization automatically.",
    },
    {
      question: "How long does GEO take to work?",
      answer:
        "GEO typically shows results faster than traditional SEO. Perplexity citations can appear in 3-6 weeks after publishing optimized content. Google AI Overviews take longer (8-16 weeks) because they're tied to traditional ranking signals. Most sites see measurable AI citation increases within 90 days of consistent GEO work.",
    },
  ],

  "best-serp-analyzer-tools-2026": [
    {
      question: "What is the best practice for SEO in 2025?",
      answer:
        "The best SEO practice in 2025 is combining traditional ranking optimization with GEO (Generative Engine Optimization). Focus on technical SEO fundamentals, high-quality content, and fast page speed, while also optimizing for AI citations through structured data, FAQ sections, and quotable factual content. Use AI-powered SERP analyzer tools to identify opportunities faster than manual analysis.",
    },
    {
      question: "Is SEO still relevant in 2025?",
      answer:
        "Yes, SEO is more relevant than ever in 2025. While AI search engines are growing, traditional Google search still drives the majority of organic traffic. The key is evolving your SEO strategy to work across both traditional search results and AI-generated answers. Sites that optimize for both see compound growth.",
    },
    {
      question: "What is the best AI SEO tool 2025?",
      answer:
        "The best AI SEO tool depends on your needs. Ahrefs excels at competitive analysis and backlink research. Semrush offers the most comprehensive all-in-one platform. Surfer SEO provides the best on-page content optimization. For teams that need execution beyond analysis, AI SEO agents like SERP Strategists automate the full workflow from analysis to implementation.",
    },
  ],

  "top-seo-analysis-tools-2025-best-seo-ai-tool": [
    {
      question: "What is the best AI SEO tool 2025?",
      answer:
        "The best AI SEO tool for 2025 depends on your workflow. Ahrefs leads in backlink analysis and competitor research. Semrush provides the most comprehensive all-in-one platform. Surfer SEO excels at content optimization. Clearscope offers the best content briefs. For teams wanting automated execution, AI SEO agents that implement changes autonomously are emerging as the next category.",
    },
    {
      question: "How is AI changing SEO in 2025?",
      answer:
        "AI is changing SEO in three ways: 1) AI-powered analysis tools make competitive research 10x faster, 2) AI search engines (ChatGPT, Perplexity, Google AI Overviews) require new optimization strategies (GEO), and 3) AI agents can now execute SEO tasks autonomously rather than just providing recommendations. The biggest shift is from analysis-only tools to execution-capable agents.",
    },
    {
      question: "Is SEO dead or evolving in 2026?",
      answer:
        "SEO is evolving, not dying. Traditional search still drives majority traffic, but AI search is capturing growing share. The successful SEO strategy in 2026 optimizes for both: traditional Google rankings AND AI citation visibility. Sites doing both see 2-3x better organic growth than those focusing on only one channel.",
    },
    {
      question: "Which AI tool is best for SEO analysis?",
      answer:
        "For comprehensive SEO analysis, Semrush and Ahrefs remain the gold standards. For AI-specific features, tools like MarketMuse and Clearscope excel at content intelligence. For SERP analysis specifically, tools that combine traditional metrics with AI Overview tracking provide the most complete picture. The best choice depends on whether you need breadth (Semrush) or depth (specialized tools).",
    },
  ],

  "schema-markup-seo-guide": [
    {
      question: "What is schema markup?",
      answer:
        "Schema markup is structured data you add to your website using the schema.org vocabulary that tells search engines exactly what your content means. The most common format is JSON-LD, which appears as a script tag in your page's HTML. Schema helps you get rich snippets in search results and improves your content's visibility in AI search engines.",
    },
    {
      question: "What is an example of a schema markup?",
      answer:
        'An Article schema example: {"@context": "https://schema.org", "@type": "Article", "headline": "Your Title", "author": {"@type": "Person", "name": "Author Name"}, "datePublished": "2026-01-01"}. This tells search engines your page is an article, who wrote it, and when it was published, enabling rich snippets in search results.',
    },
    {
      question: "Is schema markup still relevant?",
      answer:
        "Yes, schema markup is more relevant than ever in 2026. While only 33% of websites use it, schema directly impacts rich snippet eligibility, AI search citations, and click-through rates. Pages with proper schema get 58% more clicks on average and are preferred by AI search engines like ChatGPT and Perplexity when generating answers.",
    },
    {
      question: "How to use schema for SEO?",
      answer:
        "To use schema for SEO, add JSON-LD structured data to your page's <head> or <body>. Start with Article schema for blog posts, Organization schema for your homepage, FAQ schema for Q&A content, and HowTo schema for tutorials. Use Google's Rich Results Test to validate your markup, then monitor Google Search Console for rich result appearance and CTR improvements.",
    },
  ],

  "google-ai-overviews-guide": [
    {
      question: "How to get featured in Google AI Overviews?",
      answer:
        "To get featured in Google AI Overviews, add FAQ schema markup to your pages, include statistics with proper attribution, structure content with clear headings, add expert quotes, ensure your domain has strong E-E-A-T signals, and optimize for question-based queries. Content that's quotable, factual, and properly structured gets cited more frequently.",
    },
    {
      question: "What percentage of searches have AI Overviews?",
      answer:
        "As of 2026, approximately 45% of Google searches trigger AI Overviews. This percentage has grown significantly from the initial 2024 rollout and continues to expand across more query types including medical, product comparison, how-to, and local service queries.",
    },
    {
      question: "Do AI Overviews reduce organic clicks?",
      answer:
        "AI Overviews reduce clicks to organic results by up to 58% when they appear. However, sites that get cited within the AI Overview often see increased traffic from brand searches and direct visits. The key is getting cited inside the Overview rather than ranking below it.",
    },
    {
      question: "How long does it take to appear in AI Overviews?",
      answer:
        "Appearing in Google AI Overviews typically takes 8-16 weeks because they're tied to traditional Google ranking signals and domain trust. Sites with established authority and proper content structure can see citations faster (4-6 weeks), especially if they're already ranking in positions 1-10 for the target query.",
    },
    {
      question: "What content format works best for AI Overviews?",
      answer:
        "AI Overviews favor content with clear structure, factual statements with attribution, FAQ sections, numbered lists, comparison tables, and expert quotes. Question-format headings, statistic-heavy paragraphs, and content that can be quoted in 2-3 sentences perform best.",
    },
  ],

  "geo-vs-seo-vs-aeo-2026": [
    {
      question: "What is GEO vs SEO?",
      answer:
        "SEO (Search Engine Optimization) optimizes for ranking in traditional Google search results. GEO (Generative Engine Optimization) optimizes for citation in AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews. SEO focuses on clicks; GEO focuses on citations. Both share core signals like domain authority and content quality, but GEO requires more structured, quotable content.",
    },
    {
      question: "What does AEO stand for?",
      answer:
        "AEO stands for Answer Engine Optimization — optimizing for featured snippets, knowledge panels, and voice search results. It predates GEO and originally focused on Google's Answer Box and voice assistants. Now it's often used interchangeably with GEO, though GEO specifically targets AI-powered search engines.",
    },
    {
      question: "Do I need GEO if I already do SEO?",
      answer:
        "Yes, you need both in 2026. Traditional SEO still drives the majority of organic traffic, but AI search is capturing 20-30% of queries. Sites optimizing for both SEO and GEO see compound growth: traditional rankings for direct traffic plus AI citations for brand visibility. The tactics overlap significantly (quality content, E-E-A-T, structure), making dual optimization efficient.",
    },
    {
      question: "Is GEO replacing SEO in 2026?",
      answer:
        "No, GEO is complementing SEO, not replacing it. Google's traditional blue-link results still generate most organic traffic. However, AI search is growing rapidly, and sites ignoring GEO lose visibility in AI-generated answers. The most successful strategy is optimizing for both: traditional rankings AND AI citations.",
    },
  ],

  "perplexity-ai-seo": [
    {
      question: "How does Perplexity AI work?",
      answer:
        "Perplexity AI is an AI-powered search engine that generates answers by synthesizing information from multiple web sources. It processes over 150 million queries monthly (as of 2026) and shows its sources in a citation panel. Unlike traditional search, Perplexity generates conversational answers while linking to the original content.",
    },
    {
      question: "How to get cited in Perplexity AI?",
      answer:
        "To get cited in Perplexity, publish factual content with clear structure, add proper schema markup, include statistics with attribution, ensure your site is easily crawlable, build topical authority through content clusters, and optimize for question-based queries. Perplexity favors content that's quotable, recent, and from domains with established expertise.",
    },
    {
      question: "Can you track Perplexity traffic?",
      answer:
        "Perplexity traffic can be partially tracked through referral data in Google Analytics (it shows as referral traffic from perplexity.ai), but many citations don't result in direct clicks. The best tracking method is manually searching your key queries in Perplexity monthly and noting when your domain appears in the Sources panel. Brand mention monitoring tools can also catch some Perplexity citations.",
    },
    {
      question: "Is Perplexity better than Google?",
      answer:
        "Perplexity excels at research queries where users want synthesized answers from multiple sources. Google remains better for navigational queries, local searches, and shopping. For content creators, Perplexity offers faster citation opportunities (3-6 weeks vs 8-16 weeks for Google AI Overviews) and growing user base, making it valuable alongside traditional Google SEO.",
    },
    {
      question: "How long does Perplexity citation take?",
      answer:
        "Perplexity citations typically appear 3-6 weeks after publishing optimized content, significantly faster than Google AI Overviews (8-16 weeks). Fresh content from established domains can appear within 2 weeks. The key is proper structure, factual accuracy, and content that directly answers common queries in your niche.",
    },
  ],

  "ai-seo-agent-vs-agency": [
    {
      question: "What is an AI SEO agent?",
      answer:
        "An AI SEO agent is autonomous software that performs SEO tasks automatically — analyzing competitors, optimizing content, fixing technical issues, and executing changes without manual intervention. Unlike traditional SEO tools that provide recommendations, AI agents actually implement the changes. Typical cost is $99-499/month vs $2,000-10,000/month for traditional agencies.",
    },
    {
      question: "AI SEO agent vs traditional agency: which is better?",
      answer:
        "AI SEO agents excel at speed (instant execution vs weeks), cost ($99/mo vs $5,000/mo), and scale (unlimited tasks vs bandwidth constraints). Traditional agencies are better for complex strategy, relationship-building, and situations requiring human judgment. For most businesses doing standard SEO, AI agents deliver better ROI. For high-stakes enterprise SEO, a hybrid approach works best.",
    },
    {
      question: "Can AI replace SEO agencies?",
      answer:
        "AI can replace agencies for execution-heavy SEO work: technical audits, content optimization, schema implementation, internal linking, and competitor tracking. Agencies remain valuable for strategic planning, relationship-building with publishers, crisis management, and complex technical migrations. The trend is toward hybrid models: AI agents for execution, humans for strategy.",
    },
    {
      question: "How much does an AI SEO agent cost?",
      answer:
        "AI SEO agents typically cost $99-499 per month depending on features and scale. Entry-level agents start at $99/month for basic optimization. Mid-tier agents ($199-299/month) include content generation and technical fixes. Enterprise agents ($499+/month) handle multi-site management. All are significantly cheaper than traditional agencies ($2,000-10,000/month).",
    },
  ],

  "eeat-practical-guide": [
    {
      question: "What is E-E-A-T in SEO?",
      answer:
        "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — Google's framework for evaluating content quality. Google added the first E (Experience) in 2022. E-E-A-T isn't a direct ranking factor but influences how Google's algorithms assess content quality, especially for YMYL (Your Money Your Life) topics.",
    },
    {
      question: "How to improve E-E-A-T score?",
      answer:
        "Improve E-E-A-T by adding author bios with credentials, citing credible sources, getting backlinks from authoritative sites, displaying trust signals (SSL, privacy policy, contact info), updating content regularly, showcasing real experience (case studies, original data), and building topic authority through comprehensive content clusters. Schema markup for authors and organizations also helps.",
    },
    {
      question: "Does E-E-A-T affect rankings?",
      answer:
        "E-E-A-T indirectly affects rankings by influencing Google's quality signals. Sites with strong E-E-A-T tend to get more backlinks, better user engagement, and preferential treatment in algorithm updates. For YMYL topics (health, finance, legal), E-E-A-T is especially critical. Google's helpful content update specifically targets sites lacking genuine experience and expertise.",
    },
    {
      question: "What is the difference between expertise and experience?",
      answer:
        "Expertise means formal knowledge and qualifications (degrees, certifications, professional credentials). Experience means real-world practice and first-hand involvement. For example, a certified nutritionist has expertise; someone who successfully lost 50 pounds has experience. Google values both, but experience became an explicit E-E-A-T factor in 2022 because it indicates genuine, tested knowledge.",
    },
  ],

  "internal-linking-strategy": [
    {
      question: "What is internal linking in SEO?",
      answer:
        "Internal linking is the practice of connecting pages within your own website using hyperlinks. It helps search engines discover pages, understand site structure, distribute authority (PageRank) across pages, and helps users navigate your content. Strategic internal linking can significantly improve rankings for target pages.",
    },
    {
      question: "How many internal links per page?",
      answer:
        "There's no strict limit, but best practice is 3-5 contextual internal links within content, plus navigation links. Focus on quality over quantity — every internal link should add value for users. Too many links (50+) can dilute authority and confuse search engines about which pages are most important.",
    },
    {
      question: "What is the best internal linking structure?",
      answer:
        "The best internal linking structure combines a hierarchical pillar-cluster model with strategic cross-linking. Create pillar pages for main topics, cluster pages for subtopics, and link clusters to pillars. Add cross-links between related clusters. This structure helps search engines understand topical relationships and distributes authority effectively. Aim for every page being within 3 clicks of homepage.",
    },
    {
      question: "Do internal links help SEO?",
      answer:
        "Yes, internal links are one of the most powerful on-page SEO factors. They help search engines discover and index pages, pass authority to important pages, establish topical relationships, reduce bounce rate, and increase time on site. Strategic internal linking can move pages from position 10 to top 5 without any external backlinks.",
    },
  ],

  "core-web-vitals-what-matters": [
    {
      question: "What are Core Web Vitals?",
      answer:
        "Core Web Vitals are Google's user experience metrics: Largest Contentful Paint (LCP) measures loading speed, Interaction to Next Paint (INP) measures responsiveness, and Cumulative Layout Shift (CLS) measures visual stability. These metrics became a ranking factor in 2021 and are part of Google's Page Experience signals.",
    },
    {
      question: "What is a good LCP score?",
      answer:
        "A good LCP (Largest Contentful Paint) score is under 2.5 seconds. LCP between 2.5-4.0 seconds needs improvement. LCP over 4.0 seconds is poor and likely hurting your rankings. LCP measures how long it takes for the largest visible element to load, usually a hero image or headline.",
    },
    {
      question: "How to improve Core Web Vitals score?",
      answer:
        "Improve Core Web Vitals by optimizing images (compress, use WebP, add dimensions), reducing JavaScript execution time, using a CDN, implementing lazy loading, minimizing CSS, preloading critical resources, and removing layout shift causes. Focus on LCP first (biggest ranking impact), then INP, then CLS.",
    },
    {
      question: "Do Core Web Vitals affect SEO?",
      answer:
        "Yes, Core Web Vitals are a confirmed ranking factor since Google's Page Experience update in 2021. However, their impact is relatively small compared to content quality and backlinks. Core Web Vitals matter most when competing pages have similar content quality — good CWV scores can be the tiebreaker. They also directly impact user experience and conversion rates.",
    },
  ],

  "ai-seo-tools-pricing-comparison-2026": [
    {
      question: "What is the best AI SEO tool?",
      answer:
        "The best AI SEO tool depends on your needs. Semrush ($139/mo) offers the most comprehensive all-in-one platform. Ahrefs ($129/mo) leads in backlink analysis. Surfer SEO ($89/mo) excels at content optimization. Clearscope ($189/mo) provides the best content briefs. AI SEO agents ($99-299/mo) offer automated execution. Choose based on whether you need breadth (Semrush) or specialized depth.",
    },
    {
      question: "How much does SEO software cost?",
      answer:
        "SEO software ranges from $99/month for basic tools to $500+/month for enterprise platforms. Popular pricing: Semrush ($139/mo), Ahrefs ($129/mo), Surfer SEO ($89/mo), Clearscope ($189/mo), MarketMuse ($149/mo), and AI SEO agents ($99-299/mo). Enterprise versions can cost $1,000-5,000/month for agencies managing multiple clients.",
    },
    {
      question: "Is Semrush better than Ahrefs?",
      answer:
        "Semrush and Ahrefs excel at different things. Ahrefs has a larger backlink index and better link analysis features. Semrush offers broader marketing tools (PPC, social, content) and better keyword tracking. For pure SEO, Ahrefs edges ahead. For integrated marketing, Semrush wins. Both cost ~$130/month for entry plans.",
    },
    {
      question: "Are AI SEO agents worth it?",
      answer:
        "AI SEO agents are worth it if you need execution automation rather than just analysis. At $99-299/month, they cost 90% less than traditional agencies ($2,000-10,000/month) while handling technical audits, content optimization, and competitor tracking automatically. However, they're not suitable for complex strategy work or relationship-building that requires human judgment.",
    },
  ],
}

/**
 * Get FAQ schema for a specific blog post slug
 */
export function getFAQSchemaForPost(slug: string): object | null {
  const faqs = faqDatabase[slug]
  if (!faqs || faqs.length === 0) return null

  return getFAQSchema(faqs)
}

/**
 * Check if a post has FAQ schema
 */
export function hasFAQSchema(slug: string): boolean {
  return !!faqDatabase[slug] && faqDatabase[slug].length > 0
}

/**
 * Get all slugs that have FAQ schemas
 */
export function getSlugsWithFAQSchema(): string[] {
  return Object.keys(faqDatabase)
}
