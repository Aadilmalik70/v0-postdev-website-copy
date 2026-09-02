"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface TocItem {
  title: string
  href: string
}

/**
 * Sticky table of contents with scroll-spy. The active section is resolved by
 * an IntersectionObserver band near the top of the viewport, so the highlight
 * tracks the heading the reader is actually under.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(() => items[0]?.href.slice(1) ?? "")
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ids = items.map((item) => item.href.slice(1))
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id)
          return
        }

        // Nothing in the band: fall back to the last heading scrolled past.
        const passed = headings.filter((el) => el.getBoundingClientRect().top < 120)
        if (passed.length > 0) {
          setActiveId(passed[passed.length - 1].id)
        }
      },
      { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  // When the rail scrolls internally, keep the active item in view. Adjust the
  // container's scrollTop directly rather than using scrollIntoView, which
  // would also scroll the window and fight the reader.
  useEffect(() => {
    const list = listRef.current
    const container = list?.closest<HTMLElement>("[data-toc-scroll]")
    const link = list?.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`)
    if (!container || !link) return
    if (container.scrollHeight <= container.clientHeight) return

    const containerBox = container.getBoundingClientRect()
    const linkBox = link.getBoundingClientRect()
    const padding = 16

    if (linkBox.top < containerBox.top + padding) {
      container.scrollTop -= containerBox.top + padding - linkBox.top
    } else if (linkBox.bottom > containerBox.bottom - padding) {
      container.scrollTop += linkBox.bottom - (containerBox.bottom - padding)
    }
  }, [activeId])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <p className="eyebrow mb-4">On this page</p>
      <ul ref={listRef} className="space-y-px border-l border-line">
        {items.map((item, index) => {
          const id = item.href.slice(1)
          const isActive = id === activeId

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative flex gap-2.5 py-1.5 pl-4 pr-1 text-[13px] leading-6 transition-colors",
                  isActive
                    ? "text-ink font-medium"
                    : "text-neutral-600 hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1.5 bottom-1.5 w-px transition-colors",
                    isActive ? "bg-signal" : "bg-transparent group-hover:bg-line-strong",
                  )}
                />
                <span className="font-mono text-[10px] pt-0.5 tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Collapsed accordion variant shown above the article on small screens. */
export function ArticleTocMobile({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <details className="group lg:hidden mb-10 rounded-2xl border border-line bg-surface/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="eyebrow !mb-0">On this page</span>
        <span className="font-mono text-[11px] text-neutral-600">
          <span className="group-open:hidden">{items.length} sections &darr;</span>
          <span className="hidden group-open:inline">Hide &uarr;</span>
        </span>
      </summary>
      <ol className="border-t border-line px-5 py-4 space-y-2.5">
        {items.map((item, index) => (
          <li key={item.href} className="flex gap-3 text-sm leading-6">
            <span className="font-mono text-[11px] pt-0.5 tabular-nums text-neutral-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <a href={item.href} className="text-neutral-700 hover:text-signal">
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
