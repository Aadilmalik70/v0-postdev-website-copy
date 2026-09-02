"use client"

import { useState } from "react"
import { Check, Link2, Linkedin, X as XIcon } from "lucide-react"

interface ShareRowProps {
  url: string
  title: string
}

/**
 * The async Clipboard API rejects in insecure contexts and whenever the
 * document is not focused, so fall back to the legacy selection copy before
 * giving up. Returns whether the text actually reached the clipboard.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fall through to the legacy path.
  }

  try {
    const area = document.createElement("textarea")
    area.value = text
    area.setAttribute("readonly", "")
    area.style.position = "fixed"
    area.style.top = "-9999px"
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

type CopyStatus = "idle" | "copied" | "failed"

export function ShareRow({ url, title }: ShareRowProps) {
  const [status, setStatus] = useState<CopyStatus>("idle")

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  async function handleCopy() {
    const ok = await copyToClipboard(url)
    // Always report the outcome — a silent no-op leaves the reader guessing.
    setStatus(ok ? "copied" : "failed")
    window.setTimeout(() => setStatus("idle"), 2000)
  }

  const itemClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-neutral-600 transition-colors hover:border-line-strong hover:text-ink"

  return (
    <div>
      <p className="eyebrow mb-3">Share</p>
      <div className="flex items-center gap-2">
        <a
          href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={itemClass}
        >
          {/* X wordmark — lucide has no current X glyph */}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={itemClass}
        >
          <Linkedin className="h-4 w-4" strokeWidth={1.75} />
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={
            status === "copied"
              ? "Link copied"
              : status === "failed"
                ? "Copy failed — select the address bar instead"
                : "Copy link"
          }
          title={status === "failed" ? "Couldn't copy — copy the URL from the address bar" : undefined}
          className={itemClass}
        >
          {status === "copied" ? (
            <Check className="h-4 w-4 text-signal" strokeWidth={2.25} />
          ) : status === "failed" ? (
            <XIcon className="h-4 w-4 text-coral" strokeWidth={2.25} />
          ) : (
            <Link2 className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {status === "copied" ? "Link copied to clipboard" : status === "failed" ? "Could not copy link" : ""}
      </p>
    </div>
  )
}
