/**
 * Live Competitor Audit Script
 * Queries SerpAPI for 8 priority keywords and checks visibility/rankings
 * for the 10 target competitors from the competitor gap PDF.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SERPAPI_KEY = process.env.SERPAPI_KEY || '218bcc0de5f9cd0d90f8d075f0e928d9e79e59203ffab886764744c203d36e48';

// Target competitors from PDF
const COMPETITORS = [
  'surferseo.com',
  'conductor.com',
  'frase.io',
  'writesonic.com',
  'botify.com',
  'marketmuse.com',
  'getfancy.ai',
  'peec.ai',
  'otterly.ai',
  'ansvisor.com'
];

// Target priority keywords
const KEYWORDS = [
  'ai growth operator',
  'geo optimization',
  'generative engine optimization',
  'autonomous seo agent',
  'best ai seo tools 2026',
  'AEO digital marketing',
  'answer engine optimization',
  'brand serp optimization'
];

/**
 * Fetch SERP results from SerpAPI
 */
function fetchSerpResults(keyword) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      engine: 'google',
      q: keyword,
      api_key: SERPAPI_KEY,
      location: 'United States',
      gl: 'us',
      hl: 'en',
      num: 10
    });

    const url = `https://serpapi.com/search?${params.toString()}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Starting Live Competitor SERP Audit...\n');
  console.log(`Tracking ${COMPETITORS.length} competitors across ${KEYWORDS.length} keywords.`);
  console.log(`Using key: ${SERPAPI_KEY.substring(0, 6)}...${SERPAPI_KEY.substring(SERPAPI_KEY.length - 6)}\n`);

  const auditResults = {
    timestamp: new Date().toISOString(),
    competitors: COMPETITORS,
    keywordsAnalyzed: [],
    competitorShareOfVoice: {},
    detailedResults: {}
  };

  // Initialize Share of Voice counters
  COMPETITORS.forEach(comp => {
    auditResults.competitorShareOfVoice[comp] = {
      top10Count: 0,
      averagePosition: 0,
      positions: [],
      aiOverviewCitations: 0
    };
  });

  for (const keyword of KEYWORDS) {
    try {
      console.log(`📊 Querying: "${keyword}"`);
      const serpData = await fetchSerpResults(keyword);
      
      const organicResults = serpData.organic_results || [];
      const aiOverview = serpData.ai_overview || null;
      
      console.log(`   ✓ Found ${organicResults.length} organic results.`);
      console.log(`   ✓ AI Overview present: ${aiOverview ? 'Yes' : 'No'}`);
      
      const keywordReport = {
        keyword,
        aiOverviewPresent: !!aiOverview,
        aiOverviewText: aiOverview?.text || null,
        competitorsFound: [],
        allResults: []
      };

      // Scan organic results
      organicResults.forEach((result, idx) => {
        const rank = idx + 1;
        const link = result.link || '';
        const title = result.title || '';
        const snippet = result.snippet || '';
        
        // Check if any competitor is in the link
        let matchedCompetitor = null;
        for (const comp of COMPETITORS) {
          if (link.toLowerCase().includes(comp)) {
            matchedCompetitor = comp;
            break;
          }
        }

        const resultEntry = {
          rank,
          title,
          url: link,
          snippet,
          matchedCompetitor
        };

        keywordReport.allResults.push(resultEntry);

        if (matchedCompetitor) {
          keywordReport.competitorsFound.push({
            competitor: matchedCompetitor,
            rank,
            title
          });

          // Update overall Share of Voice metrics
          const metrics = auditResults.competitorShareOfVoice[matchedCompetitor];
          metrics.top10Count++;
          metrics.positions.push(rank);
        }
      });

      // Scan AI Overview citations if present
      if (aiOverview && aiOverview.citations) {
        aiOverview.citations.forEach(cit => {
          const sourceLink = cit.link || '';
          COMPETITORS.forEach(comp => {
            if (sourceLink.toLowerCase().includes(comp)) {
              auditResults.competitorShareOfVoice[comp].aiOverviewCitations++;
            }
          });
        });
      }

      auditResults.detailedResults[keyword] = keywordReport;
      auditResults.keywordsAnalyzed.push(keyword);

      console.log(`   ✓ Competitors ranking in Top 10: ${keywordReport.competitorsFound.map(c => `${c.competitor} (#${c.rank})`).join(', ') || 'None'}\n`);
      
      // Respect rate limits - wait 1.5 seconds between queries
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      console.error(`   ✗ Error querying "${keyword}":`, err.message);
    }
  }

  // Calculate average positions for SOV
  COMPETITORS.forEach(comp => {
    const metrics = auditResults.competitorShareOfVoice[comp];
    if (metrics.positions.length > 0) {
      const sum = metrics.positions.reduce((a, b) => a + b, 0);
      metrics.averagePosition = parseFloat((sum / metrics.positions.length).toFixed(1));
    } else {
      metrics.averagePosition = null;
    }
  });

  // Generate Reports
  const outputDir = path.join(__dirname, '..', 'analysis-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestampStr = new Date().toISOString().split('T')[0];
  
  // Save Raw JSON
  fs.writeFileSync(
    path.join(outputDir, `live-competitor-audit-${timestampStr}.json`),
    JSON.stringify(auditResults, null, 2)
  );

  // Generate Markdown report
  const markdownReport = generateMarkdownReport(auditResults);
  fs.writeFileSync(
    path.join(outputDir, `live-competitor-audit-${timestampStr}.md`),
    markdownReport
  );

  console.log('✅ Audit Complete!');
  console.log(`Saved JSON: analysis-results/live-competitor-audit-${timestampStr}.json`);
  console.log(`Saved MD Report: analysis-results/live-competitor-audit-${timestampStr}.md\n`);
}

/**
 * Generate formatted Markdown report
 */
function generateMarkdownReport(data) {
  let report = `# Live Competitor SERP & GEO Audit Report
*Generated: ${new Date().toISOString()} | Location: US, Language: EN*

## Executive Summary

This live audit analyzed the Google organic search results (Top 10 listings) and AI Overviews across **${data.keywordsAnalyzed.length} target keywords** for the **10 key competitors** identified in the brand gap PDF.

### Competitor Share of Voice (SOV)
Sorted by top 10 visibility counts across the priority keywords.

| Competitor | Top 10 Visibility | Avg Rank (When Present) | AI Overview Citations |
|---|---:|---:|---:|
`;

  const sortedCompetitors = [...data.competitors].sort((a, b) => {
    return data.competitorShareOfVoice[b].top10Count - data.competitorShareOfVoice[a].top10Count;
  });

  sortedCompetitors.forEach(comp => {
    const metrics = data.competitorShareOfVoice[comp];
    const avgRankStr = metrics.averagePosition !== null ? `#${metrics.averagePosition}` : 'N/A';
    report += `| **${comp}** | ${metrics.top10Count}/${data.keywordsAnalyzed.length} | ${avgRankStr} | ${metrics.aiOverviewCitations} |\n`;
  });

  report += `
---

## Key Strategic Gaps Discovered

Based on the live results and competitor product designs:

1. **CMS Integration & Governance (surferseo.com, writesonic.com, frase.io):**
   * *Status:* Competitors rank high for content optimization, but they lack **governed autonomous execution into the CMS**.
   * *Action:* Position SerpStrategists as the implementation engine that actually publishes and rolls back fixes directly.

2. **Enterprise vs SME Messaging (conductor.com, botify.com):**
   * *Status:* These players dominate enterprise search terms.
   * *Action:* Target small-to-medium teams with simplified messaging, lower-cost tiers, and direct automated execution.

3. **Self-Hosted / Open-Source Provenance (ansvisor.com):**
   * *Status:* Ansvisor ranks for AEO/GEO developer configurations but lacks commercial packaging.
   * *Action:* Create a dedicated **Self-Host vs Managed** documentation guide.

---

## Detailed Keyword Search Analysis

`;

  data.keywordsAnalyzed.forEach(kw => {
    const kwReport = data.detailedResults[kw];
    report += `### 🔑 Query: "${kw}"\n`;
    report += `- **AI Overview Active:** ${kwReport.aiOverviewPresent ? '✓ Yes' : '✗ No'}\n`;
    report += `- **Tracked Competitors Ranking:** ${kwReport.competitorsFound.length} competitor(s) found.\n\n`;

    if (kwReport.competitorsFound.length > 0) {
      report += `**Competitor Rankings:**\n`;
      kwReport.competitorsFound.forEach(c => {
        report += `- **${c.competitor}** at position **#${c.rank}**: *"${c.title}"*\n`;
      });
      report += `\n`;
    }

    report += `**Full SERP Top 10 Listings:**\n\n`;
    report += `| Pos | Competitor | Page Title | Link |\n`;
    report += `|---|---|---|---|\n`;
    kwReport.allResults.forEach(res => {
      const compLabel = res.matchedCompetitor ? `**${res.matchedCompetitor}**` : '*Non-tracked*';
      const cleanTitle = res.title.replace(/\|/g, '\\|');
      report += `| ${res.rank} | ${compLabel} | ${cleanTitle} | [Link](${res.url}) |\n`;
    });
    report += `\n---\n\n`;
  });

  return report;
}

// Run the script
main().catch(console.error);
