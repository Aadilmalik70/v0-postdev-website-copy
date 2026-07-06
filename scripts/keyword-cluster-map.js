/**
 * Keyword Cluster Map Builder — serpstrategists.com
 * Fetches live SERP data for 24 keywords across 6 clusters via SerpAPI
 * Outputs: raw JSON + full Markdown cluster map report
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.SERPAPI_KEY || '218bcc0de5f9cd0d90f8d075f0e928d9e79e59203ffab886764744c203d36e48';

const CLUSTERS = {
  'Cluster 1: Brand Category — AI Growth Operator': [
    'ai growth operator',
    'ai growth ops',
    'autonomous growth operations'
  ],
  'Cluster 2: Core Product — AI SEO Agent': [
    'ai seo agent',
    'autonomous seo agent',
    'agentic seo',
    'ai seo agent vs agency',
    'seo automation software'
  ],
  'Cluster 3: GEO — Generative Engine Optimization': [
    'generative engine optimization',
    'geo optimization',
    'what is geo optimization',
    'geo vs seo',
    'geo seo guide'
  ],
  'Cluster 4: AEO — Answer Engine Optimization': [
    'answer engine optimization',
    'aeo vs seo',
    'how to appear in google ai overviews',
    'AEO digital marketing'
  ],
  'Cluster 5: AI Search & LLM Visibility': [
    'how to appear in perplexity',
    'get cited in chatgpt search',
    'llm seo optimization',
    'optimize for ai search engines'
  ],
  'Cluster 6: Commercial & Comparison': [
    'best ai seo tools 2026',
    'ai seo tools pricing comparison',
    'brand serp optimization'
  ]
};

const MAJOR_BRANDS = ['semrush.com', 'ahrefs.com', 'moz.com', 'hubspot.com', 'neilpatel.com', 'searchengineland.com', 'backlinko.com', 'coursera.org', 'forbes.com', 'wired.com'];

function fetchSerp(keyword) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      engine: 'google',
      q: keyword,
      api_key: KEY,
      location: 'United States',
      gl: 'us',
      hl: 'en',
      num: 10
    });
    const url = 'https://serpapi.com/search?' + params.toString();
    https.get(url, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function getDifficulty(organic, topDomains) {
  const hasMajorBrand = topDomains.some(d => MAJOR_BRANDS.some(b => d.includes(b)));
  if (organic.length <= 4) return 'CLAIM NOW';
  if (organic.length <= 6 && !hasMajorBrand) return 'LOW';
  if (hasMajorBrand && organic.length >= 8) return 'HIGH';
  return 'MEDIUM';
}

function diffLabel(d) {
  if (d === 'CLAIM NOW') return '🟢 **CLAIM NOW**';
  if (d === 'LOW') return '🟢 LOW';
  if (d === 'MEDIUM') return '🟡 MEDIUM';
  return '🔴 HIGH';
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'analysis-results');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const today = new Date().toISOString().split('T')[0];
  const totalKw = Object.values(CLUSTERS).flat().length;
  console.log('🔍 Keyword Cluster Research — serpstrategists.com');
  console.log('Total keywords: ' + totalKw + ' | Key: ' + KEY.substring(0, 8) + '...\n');

  const results = {};

  for (const [clusterName, keywords] of Object.entries(CLUSTERS)) {
    console.log('📂 ' + clusterName);
    results[clusterName] = [];

    for (const kw of keywords) {
      await new Promise(r => setTimeout(r, 1200));
      try {
        const data = await fetchSerp(kw);
        const organic = data.organic_results || [];
        const aiOverview = !!data.ai_overview;
        const paa = (data.related_questions || []).slice(0, 4).map(q => q.question);
        const relatedSearches = (data.related_searches || []).slice(0, 5).map(s => s.query);
        const topDomains = organic.slice(0, 5).map(r => {
          try { return new URL(r.link).hostname.replace('www.', ''); } catch (e) { return ''; }
        }).filter(Boolean);
        const top3Organic = organic.slice(0, 3).map(r => ({ title: r.title, url: r.link }));

        const difficulty = getDifficulty(organic, topDomains);

        results[clusterName].push({
          keyword: kw,
          difficulty,
          aiOverview,
          resultCount: organic.length,
          topDomains,
          top3Organic,
          paa,
          relatedSearches
        });

        console.log('  ✓ "' + kw + '" | ' + organic.length + ' results | AI OV: ' + (aiOverview ? 'YES' : 'NO') + ' | ' + difficulty);
      } catch (e) {
        console.log('  ✗ "' + kw + '" — ' + e.message);
        results[clusterName].push({ keyword: kw, error: e.message });
      }
    }
    console.log('');
  }

  // Save raw JSON
  const jsonPath = path.join(outputDir, 'keyword-cluster-raw-' + today + '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log('Raw JSON saved: ' + jsonPath);

  // Build Markdown cluster map
  const lines = [];
  lines.push('# Keyword Cluster Map — serpstrategists.com');
  lines.push('*Generated: ' + new Date().toISOString() + ' | Source: Live SerpAPI | US / EN*');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## How to Read This Map');
  lines.push('');
  lines.push('- **Difficulty** is derived from organic result count + major brand presence in Top 5');
  lines.push('- **AI Overview** = Google is synthesising an answer — ranking in these SERPs = AI citation opportunity');
  lines.push('- **People Also Ask** = sub-topic content briefs you should create');
  lines.push('- **Related Searches** = long-tail keyword expansion opportunities');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Priority table at top
  lines.push('## 🎯 Quick Priority Table (All Clusters Combined)');
  lines.push('');
  lines.push('| Keyword | Cluster | Difficulty | AI Overview | Result Count |');
  lines.push('|---|---|:---:|:---:|:---:|');

  const ORDER = ['CLAIM NOW', 'LOW', 'MEDIUM', 'HIGH'];
  const allKws = [];
  for (const [cn, kws] of Object.entries(results)) {
    for (const kw of kws) {
      if (!kw.error) allKws.push({ ...kw, cluster: cn.split('—')[1]?.trim() || cn });
    }
  }
  allKws.sort((a, b) => ORDER.indexOf(a.difficulty) - ORDER.indexOf(b.difficulty));
  for (const kw of allKws) {
    lines.push('| `' + kw.keyword + '` | ' + kw.cluster + ' | ' + diffLabel(kw.difficulty) + ' | ' + (kw.aiOverview ? '✓' : '✗') + ' | ' + kw.resultCount + ' |');
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Full cluster details
  for (const [clusterName, kws] of Object.entries(results)) {
    lines.push('## ' + clusterName);
    lines.push('');
    lines.push('| Keyword | Difficulty | AI Overview | Results | Top Ranking Domains |');
    lines.push('|---|---|:---:|:---:|---|');

    for (const kw of kws) {
      if (kw.error) {
        lines.push('| `' + kw.keyword + '` | ERROR | — | — | ' + kw.error + ' |');
        continue;
      }
      const domains = kw.topDomains.slice(0, 3).join(', ');
      lines.push('| `' + kw.keyword + '` | ' + diffLabel(kw.difficulty) + ' | ' + (kw.aiOverview ? '✓' : '✗') + ' | ' + kw.resultCount + ' | ' + domains + ' |');
    }
    lines.push('');

    for (const kw of kws) {
      if (kw.error) continue;
      lines.push('### Keyword: "' + kw.keyword + '"');
      lines.push('');

      if (kw.top3Organic && kw.top3Organic.length > 0) {
        lines.push('**Top 3 ranking pages today:**');
        kw.top3Organic.forEach((r, i) => {
          lines.push((i + 1) + '. [' + r.title + '](' + r.url + ')');
        });
        lines.push('');
      }

      if (kw.paa && kw.paa.length > 0) {
        lines.push('**People Also Ask — Content Brief Opportunities:**');
        kw.paa.forEach(q => lines.push('- ' + q));
        lines.push('');
      }

      if (kw.relatedSearches && kw.relatedSearches.length > 0) {
        lines.push('**Related Searches (long-tail expansion):** ' + kw.relatedSearches.join(' · '));
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('');
  }

  const mdPath = path.join(outputDir, 'keyword-cluster-map-' + today + '.md');
  fs.writeFileSync(mdPath, lines.join('\n'));
  console.log('Cluster map saved: ' + mdPath);
  console.log('\n✅ Done!');
}

main().catch(console.error);
