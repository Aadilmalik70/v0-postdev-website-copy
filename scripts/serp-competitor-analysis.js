/**
 * SerpAPI Competitor Analysis Script
 * Fetches top 10 Google results for priority keywords and analyzes:
 * - Title tags
 * - Meta descriptions
 * - Content structure
 * - SERP features (AI Overviews, Featured Snippets, PAA)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SERPAPI_KEY = '7v62ByY9p5fM8p2PvmBXucSm';

// Priority keywords from GSC analysis
const KEYWORDS = [
  {
    query: 'ai seo tools competitive benchmarking 2025',
    impressions: 76,
    position: 19.5,
    ourPage: '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool'
  },
  {
    query: 'what is the best serp analyzer for seo in 2025',
    impressions: 33,
    position: 14.5,
    ourPage: '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool'
  },
  {
    query: 'what is geo',
    impressions: 37,
    position: 60.7,
    ourPage: '/blog/generative-engine-optimization-geo-guide'
  },
  {
    query: 'geo optimization',
    impressions: 34,
    position: 54.2,
    ourPage: '/blog/what-is-geo-optimization'
  },
  {
    query: 'generative engine optimization',
    impressions: 9,
    position: 54.9,
    ourPage: '/blog/generative-engine-optimization-geo-guide'
  },
  {
    query: 'ai seo tools 2025',
    impressions: 12,
    position: 26.8,
    ourPage: '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool'
  },
  {
    query: 'schema markup seo',
    impressions: 14,
    position: 78.4,
    ourPage: '/blog/schema-markup-seo-guide'
  },
  {
    query: 'best ai seo tools 2025',
    impressions: 10,
    position: 45.8,
    ourPage: '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool'
  }
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
 * Analyze competitor data
 */
function analyzeCompetitors(serpData, keyword) {
  const analysis = {
    keyword: keyword.query,
    ourPosition: keyword.position,
    ourPage: keyword.ourPage,
    impressions: keyword.impressions,
    searchedAt: new Date().toISOString(),
    serpFeatures: {
      aiOverview: !!serpData.ai_overview,
      aiOverviewContent: serpData.ai_overview?.text || null,
      featuredSnippet: !!serpData.featured_snippet,
      featuredSnippetType: serpData.featured_snippet?.type || null,
      featuredSnippetTitle: serpData.featured_snippet?.title || null,
      peopleAlsoAsk: (serpData.related_questions || []).map(q => q.question),
      relatedSearches: (serpData.related_searches || []).map(s => s.query)
    },
    organicResults: []
  };

  // Analyze organic results
  const results = serpData.organic_results || [];
  results.forEach((result, index) => {
    const position = index + 1;
    const isOurSite = result.link && result.link.includes('serpstrategists.com');
    
    analysis.organicResults.push({
      position,
      url: result.link,
      title: result.title,
      snippet: result.snippet,
      isOurSite,
      displayedLink: result.displayed_link,
      sitelinks: result.sitelinks || [],
      richSnippet: result.rich_snippet || null,
      // Analyze title characteristics
      titleAnalysis: {
        length: result.title?.length || 0,
        hasYear: /202[456]/.test(result.title || ''),
        hasBrackets: /[\[\(]/.test(result.title || ''),
        hasNumber: /\d+/.test(result.title || ''),
        hasQuestion: /\?/.test(result.title || ''),
        hasPowerWords: /best|top|ultimate|complete|guide|essential|proven/i.test(result.title || ''),
        startsWithKeyword: (result.title || '').toLowerCase().startsWith(keyword.query.split(' ')[0])
      },
      // Analyze meta description characteristics
      snippetAnalysis: {
        length: result.snippet?.length || 0,
        hasCallToAction: /learn|discover|find out|get|try|start|explore|check/i.test(result.snippet || ''),
        hasNumbers: /\d+/.test(result.snippet || ''),
        hasBenefit: /help|improve|increase|boost|optimize|enhance|maximize/i.test(result.snippet || ''),
        hasEmoji: /[\u{1F300}-\u{1F9FF}]/u.test(result.snippet || '')
      }
    });
  });

  return analysis;
}

/**
 * Generate insights and recommendations
 */
function generateInsights(allAnalyses) {
  const insights = {
    generatedAt: new Date().toISOString(),
    summary: {},
    patterns: {
      titles: {},
      snippets: {},
      serpFeatures: {}
    },
    recommendations: []
  };

  // Aggregate patterns from all analyses
  let totalAIOverviews = 0;
  let totalFeaturedSnippets = 0;
  const titlePatterns = {
    avgLength: 0,
    hasYear: 0,
    hasBrackets: 0,
    hasNumber: 0,
    hasQuestion: 0,
    hasPowerWords: 0,
    startsWithKeyword: 0
  };
  const snippetPatterns = {
    avgLength: 0,
    hasCallToAction: 0,
    hasNumbers: 0,
    hasBenefit: 0
  };

  let totalResults = 0;

  allAnalyses.forEach(analysis => {
    if (analysis.serpFeatures.aiOverview) totalAIOverviews++;
    if (analysis.serpFeatures.featuredSnippet) totalFeaturedSnippets++;

    analysis.organicResults.forEach(result => {
      totalResults++;
      titlePatterns.avgLength += result.titleAnalysis.length;
      if (result.titleAnalysis.hasYear) titlePatterns.hasYear++;
      if (result.titleAnalysis.hasBrackets) titlePatterns.hasBrackets++;
      if (result.titleAnalysis.hasNumber) titlePatterns.hasNumber++;
      if (result.titleAnalysis.hasQuestion) titlePatterns.hasQuestion++;
      if (result.titleAnalysis.hasPowerWords) titlePatterns.hasPowerWords++;
      if (result.titleAnalysis.startsWithKeyword) titlePatterns.startsWithKeyword++;

      snippetPatterns.avgLength += result.snippetAnalysis.length;
      if (result.snippetAnalysis.hasCallToAction) snippetPatterns.hasCallToAction++;
      if (result.snippetAnalysis.hasNumbers) snippetPatterns.hasNumbers++;
      if (result.snippetAnalysis.hasBenefit) snippetPatterns.hasBenefit++;
    });
  });

  // Calculate percentages
  insights.patterns.titles = {
    avgLength: Math.round(titlePatterns.avgLength / totalResults),
    hasYearPct: Math.round((titlePatterns.hasYear / totalResults) * 100),
    hasBracketsPct: Math.round((titlePatterns.hasBrackets / totalResults) * 100),
    hasNumberPct: Math.round((titlePatterns.hasNumber / totalResults) * 100),
    hasQuestionPct: Math.round((titlePatterns.hasQuestion / totalResults) * 100),
    hasPowerWordsPct: Math.round((titlePatterns.hasPowerWords / totalResults) * 100),
    startsWithKeywordPct: Math.round((titlePatterns.startsWithKeyword / totalResults) * 100)
  };

  insights.patterns.snippets = {
    avgLength: Math.round(snippetPatterns.avgLength / totalResults),
    hasCallToActionPct: Math.round((snippetPatterns.hasCallToAction / totalResults) * 100),
    hasNumbersPct: Math.round((snippetPatterns.hasNumbers / totalResults) * 100),
    hasBenefitPct: Math.round((snippetPatterns.hasBenefit / totalResults) * 100)
  };

  insights.patterns.serpFeatures = {
    aiOverviewPct: Math.round((totalAIOverviews / allAnalyses.length) * 100),
    featuredSnippetPct: Math.round((totalFeaturedSnippets / allAnalyses.length) * 100)
  };

  // Generate recommendations
  if (insights.patterns.titles.hasYearPct > 60) {
    insights.recommendations.push({
      type: 'title',
      priority: 'high',
      recommendation: 'Add year (2026) to titles - ' + insights.patterns.titles.hasYearPct + '% of competitors do this',
      impact: 'Signals freshness and relevance'
    });
  }

  if (insights.patterns.titles.hasPowerWordsPct > 50) {
    insights.recommendations.push({
      type: 'title',
      priority: 'high',
      recommendation: 'Use power words (Best, Top, Ultimate, Complete) - ' + insights.patterns.titles.hasPowerWordsPct + '% of competitors do this',
      impact: 'Increases click-through rate'
    });
  }

  if (insights.patterns.titles.hasNumberPct > 50) {
    insights.recommendations.push({
      type: 'title',
      priority: 'medium',
      recommendation: 'Include specific numbers in titles - ' + insights.patterns.titles.hasNumberPct + '% of competitors do this',
      impact: 'Makes promises concrete and specific'
    });
  }

  if (insights.patterns.snippets.hasCallToActionPct > 40) {
    insights.recommendations.push({
      type: 'meta-description',
      priority: 'high',
      recommendation: 'Add call-to-action phrases (Learn, Discover, Get) - ' + insights.patterns.snippets.hasCallToActionPct + '% of competitors do this',
      impact: 'Drives engagement and clicks'
    });
  }

  if (insights.patterns.snippets.hasBenefitPct > 50) {
    insights.recommendations.push({
      type: 'meta-description',
      priority: 'high',
      recommendation: 'Emphasize benefits (improve, boost, optimize) - ' + insights.patterns.snippets.hasBenefitPct + '% of competitors do this',
      impact: 'Communicates value proposition'
    });
  }

  if (insights.patterns.serpFeatures.aiOverviewPct > 50) {
    insights.recommendations.push({
      type: 'content',
      priority: 'critical',
      recommendation: 'Optimize for AI Overviews - present in ' + insights.patterns.serpFeatures.aiOverviewPct + '% of SERPs',
      impact: 'Increase visibility in AI-generated summaries'
    });
  }

  if (insights.patterns.serpFeatures.featuredSnippetPct > 30) {
    insights.recommendations.push({
      type: 'content',
      priority: 'high',
      recommendation: 'Target featured snippets - present in ' + insights.patterns.serpFeatures.featuredSnippetPct + '% of SERPs',
      impact: 'Gain position #0 and increased CTR'
    });
  }

  return insights;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Starting SerpAPI Competitor Analysis...\n');
  console.log(`Analyzing ${KEYWORDS.length} keywords\n`);

  const allAnalyses = [];
  
  for (const keyword of KEYWORDS) {
    try {
      console.log(`📊 Fetching: "${keyword.query}"`);
      console.log(`   Current position: ${keyword.position} | Impressions: ${keyword.impressions}`);
      
      const serpData = await fetchSerpResults(keyword.query);
      const analysis = analyzeCompetitors(serpData, keyword);
      allAnalyses.push(analysis);
      
      console.log(`   ✓ Found ${analysis.organicResults.length} organic results`);
      console.log(`   ✓ AI Overview: ${analysis.serpFeatures.aiOverview ? 'Yes' : 'No'}`);
      console.log(`   ✓ Featured Snippet: ${analysis.serpFeatures.featuredSnippet ? 'Yes' : 'No'}\n`);
      
      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ✗ Error fetching ${keyword.query}:`, error.message);
    }
  }

  // Generate insights
  console.log('\n📈 Generating insights and recommendations...\n');
  const insights = generateInsights(allAnalyses);

  // Save results
  const outputDir = path.join(__dirname, '..', 'analysis-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save detailed analysis
  fs.writeFileSync(
    path.join(outputDir, `competitor-analysis-${timestamp}.json`),
    JSON.stringify(allAnalyses, null, 2)
  );

  // Save insights
  fs.writeFileSync(
    path.join(outputDir, `insights-${timestamp}.json`),
    JSON.stringify(insights, null, 2)
  );

  // Generate markdown report
  const report = generateMarkdownReport(allAnalyses, insights);
  fs.writeFileSync(
    path.join(outputDir, `competitor-report-${timestamp}.md`),
    report
  );

  console.log('✅ Analysis complete!');
  console.log(`\nResults saved to:`);
  console.log(`   - ${outputDir}/competitor-analysis-${timestamp}.json`);
  console.log(`   - ${outputDir}/insights-${timestamp}.json`);
  console.log(`   - ${outputDir}/competitor-report-${timestamp}.md`);
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(analyses, insights) {
  let report = `# SerpAPI Competitor Analysis Report
Generated: ${new Date().toISOString()}

## Executive Summary

Analyzed ${analyses.length} keywords with ${analyses.reduce((sum, a) => sum + a.organicResults.length, 0)} total competitor pages.

### Key Patterns Discovered

#### Title Tag Patterns
- **Average Length:** ${insights.patterns.titles.avgLength} characters
- **Include Year:** ${insights.patterns.titles.hasYearPct}% of titles
- **Use Power Words:** ${insights.patterns.titles.hasPowerWordsPct}% of titles
- **Include Numbers:** ${insights.patterns.titles.hasNumberPct}% of titles
- **Start with Keyword:** ${insights.patterns.titles.startsWithKeywordPct}% of titles

#### Meta Description Patterns
- **Average Length:** ${insights.patterns.snippets.avgLength} characters
- **Include CTA:** ${insights.patterns.snippets.hasCallToActionPct}% of descriptions
- **Include Numbers:** ${insights.patterns.snippets.hasNumbersPct}% of descriptions
- **Emphasize Benefits:** ${insights.patterns.snippets.hasBenefitPct}% of descriptions

#### SERP Features
- **AI Overview Present:** ${insights.patterns.serpFeatures.aiOverviewPct}% of queries
- **Featured Snippet Present:** ${insights.patterns.serpFeatures.featuredSnippetPct}% of queries

---

## Recommendations (Priority Order)

`;

  insights.recommendations
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .forEach((rec, idx) => {
      report += `### ${idx + 1}. [${rec.priority.toUpperCase()}] ${rec.type.toUpperCase()}\n`;
      report += `**Recommendation:** ${rec.recommendation}\n`;
      report += `**Impact:** ${rec.impact}\n\n`;
    });

  report += `---

## Detailed Analysis by Keyword

`;

  analyses.forEach(analysis => {
    report += `### "${analysis.keyword}"\n\n`;
    report += `- **Our Position:** ${analysis.ourPosition}\n`;
    report += `- **Our Page:** ${analysis.ourPage}\n`;
    report += `- **Impressions:** ${analysis.impressions}\n`;
    report += `- **AI Overview:** ${analysis.serpFeatures.aiOverview ? '✓ Yes' : '✗ No'}\n`;
    report += `- **Featured Snippet:** ${analysis.serpFeatures.featuredSnippet ? '✓ Yes' : '✗ No'}\n\n`;

    if (analysis.serpFeatures.peopleAlsoAsk.length > 0) {
      report += `**People Also Ask:**\n`;
      analysis.serpFeatures.peopleAlsoAsk.forEach(q => {
        report += `- ${q}\n`;
      });
      report += `\n`;
    }

    report += `**Top 10 Competitors:**\n\n`;
    report += `| # | Title | Length | Year | Power Words | Numbers |\n`;
    report += `|---|-------|--------|------|-------------|----------|\n`;
    
    analysis.organicResults.forEach(result => {
      const title = result.title.replace(/\|/g, '\\|').substring(0, 60);
      report += `| ${result.position} | ${title}... | ${result.titleAnalysis.length} | ${result.titleAnalysis.hasYear ? '✓' : ''} | ${result.titleAnalysis.hasPowerWords ? '✓' : ''} | ${result.titleAnalysis.hasNumber ? '✓' : ''} |\n`;
    });

    report += `\n---\n\n`;
  });

  return report;
}

// Run the script
main().catch(console.error);
