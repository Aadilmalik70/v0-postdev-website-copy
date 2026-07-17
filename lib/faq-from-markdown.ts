import { getFAQSchema, type FAQItem } from "./schema"

const FAQ_HEADING_PATTERN = /^##\s+(?:FAQ|Frequently Asked Questions)\s*$/i
const H2_PATTERN = /^##\s+/
const H3_PATTERN = /^###\s+(.+)$/

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_`~#]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function getFAQItemsFromMarkdown(content: string): FAQItem[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const faqHeadingIndex = lines.findIndex((line) => FAQ_HEADING_PATTERN.test(line.trim()))

  if (faqHeadingIndex === -1) return []

  const items: FAQItem[] = []
  let question: string | null = null
  let answerLines: string[] = []

  const flushCurrentItem = () => {
    if (!question) return

    const answer = stripMarkdown(answerLines.join("\n"))
    if (answer) {
      items.push({
        question: stripMarkdown(question),
        answer,
      })
    }

    question = null
    answerLines = []
  }

  for (const rawLine of lines.slice(faqHeadingIndex + 1)) {
    const line = rawLine.trim()

    if (H2_PATTERN.test(line)) {
      break
    }

    const questionMatch = line.match(H3_PATTERN)
    if (questionMatch) {
      flushCurrentItem()
      question = questionMatch[1]
      continue
    }

    if (question) {
      answerLines.push(rawLine)
    }
  }

  flushCurrentItem()
  return items
}

export function getFAQSchemaFromMarkdown(content: string): object | null {
  const items = getFAQItemsFromMarkdown(content)
  return items.length > 0 ? getFAQSchema(items) : null
}
