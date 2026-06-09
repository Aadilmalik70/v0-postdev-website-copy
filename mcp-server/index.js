import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const LIBRECRAWL_URL = process.env.LIBRECRAWL_URL || "http://127.0.0.1:5080";

// Persist session cookie across all API calls (LibreCrawl requires this)
let sessionCookie = "";

async function callApi(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(sessionCookie ? { Cookie: sessionCookie } : {}),
    ...(options.headers || {}),
  };
  const resp = await fetch(`${LIBRECRAWL_URL}${path}`, {
    headers,
    signal: AbortSignal.timeout(600000),
    ...options,
  });
  // Capture Set-Cookie from response
  const setCookie = resp.headers.get("set-cookie");
  if (setCookie) {
    sessionCookie = setCookie.split(";")[0];
  }
  return resp;
}

const server = new McpServer({
  name: "librecrawl",
  version: "1.0.0",
});

// Tool: start_crawl
server.tool(
  "start_crawl",
  "Start crawling a website with LibreCrawl. Waits for completion and returns summary with pages crawled and issues found.",
  {
    url: z.string().describe("Full URL to crawl, e.g. https://serpstrategists.com"),
    max_pages: z.number().optional().default(100).describe("Maximum pages to crawl"),
  },
  async ({ url, max_pages }) => {
    try {
      const resp = await callApi("/api/start_crawl", {
        method: "POST",
        body: JSON.stringify({ url, max_pages }),
      });
      const startData = await resp.json();
      if (!startData.success) {
        return { content: [{ type: "text", text: JSON.stringify(startData, null, 2) }] };
      }

      // Poll until complete (check every 5s, max 5 minutes)
      let status = "running";
      let result = {};
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        const statusResp = await callApi("/api/crawl_status");
        result = await statusResp.json();
        status = result.status;
        if (status === "completed" || status === "idle" && result.stats?.crawled > 0) break;
        if (status === "error") break;
      }

      const summary = {
        status,
        pages_crawled: result.stats?.crawled || 0,
        pages_discovered: result.stats?.discovered || 0,
        issues_found: result.issues?.length || 0,
        issues_by_severity: {
          error: result.issues?.filter(i => i.severity === "error").length || 0,
          warning: result.issues?.filter(i => i.severity === "warning").length || 0,
        },
      };
      return { content: [{ type: "text", text: JSON.stringify(summary, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: crawl_status
server.tool(
  "crawl_status",
  "Check the current crawl progress — pages crawled, issues found, status",
  {},
  async () => {
    try {
      const resp = await callApi("/api/crawl_status");
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: stop_crawl
server.tool(
  "stop_crawl",
  "Stop the currently running crawl",
  {},
  async () => {
    try {
      const resp = await callApi("/api/stop_crawl", { method: "POST" });
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: export_data
server.tool(
  "export_data",
  "Export full crawl results — all pages with their SEO data, issues, links, schema info",
  {},
  async () => {
    try {
      const resp = await callApi("/api/export_data");
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: filter_issues
server.tool(
  "filter_issues",
  "Get SEO issues found during the crawl, optionally filtered by severity or type",
  {
    severity: z.string().optional().describe("Filter by severity: critical, warning, info"),
    category: z.string().optional().describe("Filter by category: title, meta, h1, links, images, schema, etc."),
  },
  async ({ severity, category }) => {
    try {
      const params = new URLSearchParams();
      if (severity) params.set("severity", severity);
      if (category) params.set("category", category);
      const resp = await callApi(`/api/filter_issues?${params.toString()}`);
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: get_settings
server.tool(
  "get_settings",
  "Get LibreCrawl crawler settings (user agent, max depth, rate limiting, etc.)",
  {},
  async () => {
    try {
      const resp = await callApi("/api/get_settings");
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: pause_crawl
server.tool(
  "pause_crawl",
  "Pause the currently running crawl (can be resumed later)",
  {},
  async () => {
    try {
      const resp = await callApi("/api/pause_crawl", { method: "POST" });
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Tool: resume_crawl
server.tool(
  "resume_crawl",
  "Resume a paused crawl",
  {},
  async () => {
    try {
      const resp = await callApi("/api/resume_crawl", { method: "POST" });
      const data = await resp.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (err) {
      return { content: [{ type: "text", text: JSON.stringify({ error: err.message }) }] };
    }
  }
);

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
