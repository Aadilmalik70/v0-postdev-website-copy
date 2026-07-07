"use client"

import { useState } from "react"
import { CheckSquare, Square, Download } from "lucide-react"
import { EarlyAccessModal } from "./early-access-modal"

interface ChecklistItem {
  id: string
  text: string
}

interface ChecklistSection {
  title: string
  items: ChecklistItem[]
}

const checklistData: ChecklistSection[] = [
  {
    title: "1. Intent & Format Mapping",
    items: [
      { id: "intent-1", text: "What is the dominant Page Type? (Guide, Landing Page, Tool, Comparison)" },
      { id: "intent-2", text: "What is the core searcher intent? (Informational, Commercial, Navigational)" },
      { id: "intent-3", text: "What is the average word count of the top 3 results?" },
      { id: "intent-4", text: "What are the top 3 H2 headers repeating across competitor pages?" },
    ],
  },
  {
    title: "2. Feature Mapping",
    items: [
      { id: "feat-1", text: "Is there an AI Overview present?" },
      { id: "feat-2", text: "Is there a Featured Snippet present?" },
      { id: "feat-3", text: "Is there a Local 3-Pack present?" },
      { id: "feat-4", text: "Are there star ratings or review schema visible in organic links?" },
    ],
  },
  {
    title: "3. Competitor Gaps",
    items: [
      { id: "gap-1", text: "What is the average DR/UR of the top 5 ranking domains?" },
      { id: "gap-2", text: "Are the winning pages citing original statistics?" },
      { id: "gap-3", text: "Are the winning pages quoting named experts?" },
      { id: "gap-4", text: "When was the last time the top 3 ranking articles were updated?" },
    ],
  },
  {
    title: "4. Implementation Steps",
    items: [
      { id: "step-1", text: "Write a 40–60 word self-contained answer block answering the main query." },
      { id: "step-2", text: "Map out H2 and H3 structures to match or exceed competitor coverage." },
      { id: "step-3", text: "Write JSON-LD FAQ schema for the top questions." },
      { id: "step-4", text: "Inject at least 3 factual statistics with source attributions." },
    ],
  },
]

export function SerpChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalItems = checklistData.reduce((acc, section) => acc + section.items.length, 0)
  const checkedCount = Object.values(checkedItems).filter(Boolean).length
  const progressPercent = Math.round((checkedCount / totalItems) * 100)

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getProgressLabel = () => {
    if (progressPercent === 100) return "Ready to launch! All checkpoints completed."
    if (progressPercent >= 75) return "Pre-flight optimization checks..."
    if (progressPercent >= 25) return "Spotting competitive opportunities..."
    return "Gathering initial signals..."
  }

  const triggerDownload = () => {
    const markdownContent = `# SERP Analysis Audit Results

Date Created: ${new Date().toLocaleDateString()}
Audit Progress: ${checkedCount} of ${totalItems} (${progressPercent}% completed)

## 1. Intent & Format Mapping
- [${checkedItems["intent-1"] ? "x" : " "}] What is the dominant Page Type? (Guide, Landing Page, Tool, Comparison)
- [${checkedItems["intent-2"] ? "x" : " "}] What is the core searcher intent? (Informational, Commercial, Navigational)
- [${checkedItems["intent-3"] ? "x" : " "}] What is the average word count of the top 3 results?
- [${checkedItems["intent-4"] ? "x" : " "}] What are the top 3 H2 headers repeating across competitor pages?

## 2. Feature Mapping
- [${checkedItems["feat-1"] ? "x" : " "}] Is there an AI Overview present?
- [${checkedItems["feat-2"] ? "x" : " "}] Is there a Featured Snippet present?
- [${checkedItems["feat-3"] ? "x" : " "}] Is there a Local 3-Pack present?
- [${checkedItems["feat-4"] ? "x" : " "}] Are there star ratings or review schema visible in organic links?

## 3. Competitor Gaps
- [${checkedItems["gap-1"] ? "x" : " "}] What is the average DR/UR of the top 5 ranking domains?
- [${checkedItems["gap-2"] ? "x" : " "}] Are the winning pages citing original statistics?
- [${checkedItems["gap-3"] ? "x" : " "}] Are the winning pages quoting named experts?
- [${checkedItems["gap-4"] ? "x" : " "}] When was the last time the top 3 ranking articles were updated?

## 4. Implementation Steps
- [${checkedItems["step-1"] ? "x" : " "}] Write a 40–60 word self-contained answer block answering the main query.
- [${checkedItems["step-2"] ? "x" : " "}] Map out H2 and H3 structures to match or exceed competitor coverage.
- [${checkedItems["step-3"] ? "x" : " "}] Write JSON-LD FAQ schema for the top questions.
- [${checkedItems["step-4"] ? "x" : " "}] Inject at least 3 factual statistics with source attributions.

---
Audited via SERP Strategists AI Growth Operator Checklist. Find more templates at https://serpstrategists.com
`
    const element = document.createElement("a")
    const file = new Blob([markdownContent], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = "serp-analysis-audit-results.md"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="my-8 rounded-2xl border border-line bg-card p-6 md:p-8 shadow-md not-prose">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5 mb-6 gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-ink">Interactive SERP Auditor</h3>
          <p className="text-xs text-neutral-500 font-mono mt-1">{getProgressLabel()}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-neutral-600 bg-paper px-2.5 py-1 rounded-md border border-line">
            {checkedCount} / {totalItems} Done
          </span>
          <span className="text-sm font-bold text-signal font-mono">{progressPercent}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-paper rounded-full h-2 mb-8 overflow-hidden border border-line">
        <div
          className="bg-signal h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Sections */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {checklistData.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-ink border-b border-line/50 pb-1.5">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const isChecked = !!checkedItems[item.id]
                return (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-start gap-2.5 cursor-pointer group text-xs sm:text-sm text-neutral-700 hover:text-ink select-none"
                  >
                    <span className="shrink-0 mt-0.5 text-neutral-400 group-hover:text-signal transition-colors">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-signal" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </span>
                    <span className={isChecked ? "line-through text-neutral-400" : ""}>
                      {item.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Download Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-line pt-6 gap-4">
        <p className="text-xs text-neutral-500 max-w-md text-center sm:text-left leading-relaxed">
          Need a copy for your team or repository? Download the pre-formatted markdown template to run local audits offline.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-ink !bg-ink !text-warmwhite hover:!bg-neutral-800 px-5 py-2.5 text-xs font-semibold cursor-pointer rounded-full flex items-center gap-2 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Download Audit Template
        </button>
      </div>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Download Audit Template"
        description="Enter your details to download the editable Markdown SERP audit checklist and run a free automated site health check."
        submitText="Download Template & Start Audit →"
        leadSource="serp_checklist_download"
        onSuccess={triggerDownload}
      />
    </div>
  )
}
