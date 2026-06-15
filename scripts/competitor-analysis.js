/**
 * Comprehensive SERP Competitor Analysis
 * Analyzes top 10 results for key opportunity keywords
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SERPAPI_KEY = 'c367d5503be1fc1754434786abb252611119a0c1fc10efaaa9713ac83cd82770';

// Top opportunity keywords from GSC data
const TARGET_KEYWORDS = [
  'what is the best serp analyzer for seo in 2025',
  'ai seo tools competitive benchmarking 2025',
  'what is geo',
  'geo optimization',
  'generative engine optimization',
  'brand serp optimization',
  'ai seo tools 2025',
  'schema markup seo',
  'best ai seo tools 2025',
  'geo vs seo'
];

const results = {
  timestamp: new Date().toISOString(),
  keywords: []
};

function makeRequest(query) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      engine: 'google',
      q: query,
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
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function analyzeResult(result, position) {
  if (!result) return null;

  return {
    position,
    title: result.title || '',
    link: result.link || '',
    displayed_link: result.displayed_link || '',
    snippet: result.snippet || '',
    title_length: (result.title || '').length,
    snippet_length: (result.snippet || '').length,
    has_rich_snippet: !!(result.rich_snippet || result.sitelinks),
    sitelinks_count: (result.sitelinks?.inline || []).length,
    date: result.date || null,
    has_date_in_title: /202[456]|2026/i.test(result.title || ''),
    has_question_format: /^(what|how|why|when|where|who)/i.test(result.title || ''),
    has_numbers: /\d+/.test(result.title || ''),
    has_power_words: /(best|top|ultimate|complete|guide|essential|proven)/i.test(result.title || ''),
  };
}

function analyzeKeywordResults(data, keyword) {
  const keywordAnalysis = {
    keyword,
    total_results: data.search_information?.total_results || 0,
    search_time: data.search_information?.time_taken_displayed || 0,
    organic_results: [],
    common_patterns: {
      avg_title_length: 0,
      avg_snippet_length: 0,
      with_dates: 0,
      with_question_format: 0,
      with_numbers: 0,
      with_power_words: 0,
      with_rich_snippets: 0
    },
    top_domains: [],
    featured_snippet: null,
    people_also_ask: [],
    related_searches: []
  };

  // Featured Snippet
  if (data.answer_box) {
    keywordAnalysis.featured_snippet = {
      type: data.answer_box.type,
      title: data.answer_box.title,
      snippet: data.answer_box.snippet || data.answer_box.answer,
      link: data.answer_box.link
    };
  }

  // Organic Results
  if (data.organic_results) {
    keywordAnalysis.organic_results = data.organic_results
      .slice(0, 10)
      .map((result, index) => analyzeResult(result, index + 1))
      .filter(r => r !== null);

    // Calculate patterns
    const results = keywordAnalysis.organic_results;
    if (results.length > 0) {
      keywordAnalysis.common_patterns.avg_title_length = 
        Math.round(results.reduce((sum, r) => sum + r.title_length, 0) / results.length);
      keywordAnalysis.common_patterns.avg_snippet_length = 
        Math.round(results.reduce((sum, r) => sum + r.snippet_length, 0) / results.length);
      keywordAnalysis.common_patterns.with_dates = 
        results.filter(r => r.has_date_in_title).length;
      keywordAnalysis.common_patterns.with_question_format = 
        results.filter(r => r.has_question_format).length;
      keywordAnalysis.common_patterns.with_numbers = 
        results.filter(r => r.has_numbers).length;
      keywordAnalysis.common_patterns.with_power_words = 
        results.filter(r => r.has_power_words).length;
      keywordAnalysis.common_patterns.with_rich_snippets = 
        results.filter(r => r.has_rich_snippet).length;
    }

    // Top domains
    const domainCount = {};
    results.forEach(r => {
      const domain = new URL(r.link).hostname.replace('www.', '');
      domainCount[domain] = (domainCount[domain] || 0) + 1;
    });
    keywordAnalysis.top_domains = Object.entries(domainCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));
  }

  // People Also Ask
  if (data.related_questions) {
    keywordAnalysis.people_also_ask = data.related_questions
      .slice(0, 5)
      .map(q => ({
        question: q.question,
        snippet: q.snippet,
        link: q.link
      }));
  }

  // Related Searches
  if (data.related_searches) {
    keywordAnalysis.related_searches = data.related_searches
      .slice(0, 8)
      .map(s => s.query);
  }

  return keywordAnalysis;
}

async function runAnalysis() {
  console.log('🔍 Starting Comprehensive SERP Competitor Analysis\n');
  console.log(`Analyzing ${TARGET_KEYWORDS.length} keywords...\n`);

  for (let i = 0; i < TARGET_KEYWORDS.length; i++) {
    const keyword = TARGET_KEYWORDS[i];
    console.log(`[${i + 1}/${TARGET_KEYWORDS.length}] Analyzing: "${keyword}"`);

    try {
      const data = await makeRequest(keyword);
      const analysis = analyzeKeywordResults(data, keyword);
      results.keywords.push(analysis);
      
      console.log(`  ✓ Found ${analysis.organic_results.length} results`);
      console.log(`  ✓ Avg title length: ${analysis.common_patterns.avg_title_length} chars`);
      console.log(`  ✓ Featured snippet: ${analysis.featured_snippet ? 'YES' : 'NO'}`);
      console.log(`  ✓ Rich snippets: ${analysis.common_patterns.with_rich_snippets}/10`);
      console.log('');

      // Rate limiting - wait 2 seconds between requests
      if (i < TARGET_KEYWORDS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`  ✗ Error analyzing "${keyword}":`, error.message);
      console.log('');
    }
  }

  // Save results
  const outputPath = path.join(__dirname, '..', 'analysis', 'competitor-analysis.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Analysis complete! Results saved to: ${outputPath}`);

  // Generate insights report
  generateInsightsReport(results);
}

function generateInsightsReport(data) {
  const reportPath = path.join(__dirname, '..', 'analysis', 'insights-report.md');
  
  let report = `# SERP Competitor Analysis Report\n\n`;
  report += `**Generated:** ${new Date(data.timestamp).toLocaleString()}\n`;
  report += `**Keywords Analyzed:** ${data.keywords.length}\n\n`;
  
  report += `---\n\n`;

  data.keywords.forEach((kw, index) => {
    report += `## ${index + 1}. "${kw.keyword}"\n\n`;
    
    if (kw.featured_snippet) {
      report += `### 🎯 Featured Snippet Opportunity\n`;
      report += `- **Type:** ${kw.featured_snippet.type}\n`;
      report += `- **Current Owner:** ${kw.featured_snippet.link}\n`;
      report += `- **Content:** ${kw.featured_snippet.snippet?.substring(0, 150)}...\n\n`;
    }

    report += `### 📊 Top 10 Rankings Pattern Analysis\n\n`;
    report += `| Metric | Value | Insight |\n`;
    report += `|--------|-------|----------|\n`;
    report += `| Avg Title Length | ${kw.common_patterns.avg_title_length} chars | ${kw.common_patterns.avg_title_length < 60 ? '✓ Good' : '⚠️ Too long'} |\n`;
    report += `| Avg Snippet Length | ${kw.common_patterns.avg_snippet_length} chars | Target: 120-155 |\n`;
    report += `| Use Dates (2025/2026) | ${kw.common_patterns.with_dates}/10 | ${kw.common_patterns.with_dates >= 5 ? '⚠️ Date critical' : '✓ Date optional'} |\n`;
    report += `| Question Format | ${kw.common_patterns.with_question_format}/10 | ${kw.common_patterns.with_question_format >= 3 ? '💡 Consider Q format' : ''} |\n`;
    report += `| Use Numbers | ${kw.common_patterns.with_numbers}/10 | ${kw.common_patterns.with_numbers >= 5 ? '💡 Numbers boost CTR' : ''} |\n`;
    report += `| Power Words | ${kw.common_patterns.with_power_words}/10 | ${kw.common_patterns.with_power_words >= 5 ? '💡 Use power words' : ''} |\n`;
    report += `| Rich Snippets | ${kw.common_patterns.with_rich_snippets}/10 | ${kw.common_patterns.with_rich_snippets >= 3 ? '⚠️ Schema important' : ''} |\n\n`;

    report += `### 🏆 Top Ranking Domains\n\n`;
    kw.top_domains.forEach((d, i) => {
      report += `${i + 1}. **${d.domain}** (${d.count} listings)\n`;
    });
    report += `\n`;

    report += `### 📋 Top 3 Title Examples\n\n`;
    kw.organic_results.slice(0, 3).forEach((r, i) => {
      report += `**#${r.position}:** ${r.title}\n`;
      report += `- Link: ${r.link}\n`;
      report += `- Snippet: ${r.snippet.substring(0, 100)}...\n\n`;
    });

    if (kw.people_also_ask.length > 0) {
      report += `### 💬 People Also Ask (Content Ideas)\n\n`;
      kw.people_also_ask.forEach((q, i) => {
        report += `${i + 1}. ${q.question}\n`;
      });
      report += `\n`;
    }

    if (kw.related_searches.length > 0) {
      report += `### 🔗 Related Searches (Long-tail Opportunities)\n\n`;
      kw.related_searches.forEach((s, i) => {
        report += `- ${s}\n`;
      });
      report += `\n`;
    }

    report += `---\n\n`;
  });

  // Overall recommendations
  report += `## 🎯 Overall Optimization Recommendations\n\n`;
  
  const allPatterns = data.keywords.map(k => k.common_patterns);
  const avgTitleLength = Math.round(
    allPatterns.reduce((sum, p) => sum + p.avg_title_length, 0) / allPatterns.length
  );
  const avgDates = (allPatterns.reduce((sum, p) => sum + p.with_dates, 0) / allPatterns.length).toFixed(1);
  const avgNumbers = (allPatterns.reduce((sum, p) => sum + p.with_numbers, 0) / allPatterns.length).toFixed(1);
  const avgPowerWords = (allPatterns.reduce((sum, p) => sum + p.with_power_words, 0) / allPatterns.length).toFixed(1);

  report += `### Title Tag Best Practices\n`;
  report += `- **Optimal Length:** ${avgTitleLength} characters (based on top 10 competitors)\n`;
  report += `- **Include Year:** ${avgDates}/10 competitors use dates → ${avgDates >= 5 ? '⚠️ CRITICAL - Add 2025/2026' : 'Optional'}\n`;
  report += `- **Use Numbers:** ${avgNumbers}/10 use numbers → ${avgNumbers >= 5 ? '💡 Recommended' : 'Optional'}\n`;
  report += `- **Power Words:** ${avgPowerWords}/10 use power words → ${avgPowerWords >= 5 ? '💡 Boost CTR with power words' : ''}\n\n`;

  report += `### Featured Snippet Opportunities\n`;
  const withSnippets = data.keywords.filter(k => k.featured_snippet);
  report += `- ${withSnippets.length}/${data.keywords.length} keywords have featured snippets\n`;
  if (withSnippets.length > 0) {
    report += `- **Target these for position #0:**\n`;
    withSnippets.forEach(k => {
      report += `  - "${k.keyword}" (${k.featured_snippet.type})\n`;
    });
  }
  report += `\n`;

  report += `### Schema Markup Priority\n`;
  const needsSchema = data.keywords.filter(k => k.common_patterns.with_rich_snippets >= 3);
  report += `- ${needsSchema.length}/${data.keywords.length} keywords show heavy rich snippet usage\n`;
  if (needsSchema.length > 0) {
    report += `- **Implement schema for:**\n`;
    needsSchema.forEach(k => {
      report += `  - "${k.keyword}" (${k.common_patterns.with_rich_snippets}/10 competitors use it)\n`;
    });
  }

  fs.writeFileSync(reportPath, report);
  console.log(`📄 Insights report generated: ${reportPath}\n`);
}

// Run the analysis
runAnalysis().catch(console.error);
