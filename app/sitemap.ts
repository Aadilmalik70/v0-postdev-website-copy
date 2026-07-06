import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/blog"
import type { MetadataRoute } from "next"

function getLastModified(relativePath: string) {
  const fullPath = path.join(process.cwd(), relativePath)
  if (!fs.existsSync(fullPath)) {
    return new Date()
  }

  return fs.statSync(fullPath).mtime
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `https://serpstrategists.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    {
      url: "https://serpstrategists.com",
      lastModified: getLastModified("app/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/blog",
      lastModified: getLastModified("app/blog/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/about",
      lastModified: getLastModified("app/about/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/pricing",
      lastModified: getLastModified("app/pricing/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/governance",
      lastModified: getLastModified("app/governance/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/integrations",
      lastModified: getLastModified("app/integrations/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/demo",
      lastModified: getLastModified("app/demo/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/contact",
      lastModified: getLastModified("app/contact/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/faq",
      lastModified: getLastModified("app/faq/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/privacy",
      lastModified: getLastModified("app/privacy/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/terms",
      lastModified: getLastModified("app/terms/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/cookies",
      lastModified: getLastModified("app/cookies/page.tsx"),
    },
    {
      url: "https://serpstrategists.com/disclaimer",
      lastModified: getLastModified("app/disclaimer/page.tsx"),
    },
    ...blogUrls,
  ]
}
