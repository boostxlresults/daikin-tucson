#!/usr/bin/env node

/**
 * Daikin Tucson Sitemap Discovery Tool
 * Analyzes sitemap structure and generates URL inventory artifacts
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const PRIMARY_SITEMAP_URL = 'https://daikintucson.com/sitemap_index.xml';
const OUTPUT_DIR = path.join(__dirname, '..', 'artifacts');

/**
 * Retrieves content from a URL via HTTPS
 */
function retrieveWebContent(targetUrl) {
  return new Promise((fulfill, reject) => {
    const requestOptions = {
      headers: {
        'User-Agent': 'Daikin-Tucson-Discovery-Bot/1.0'
      }
    };

    https.get(targetUrl, requestOptions, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${targetUrl}`));
        return;
      }

      let accumulatedData = '';
      response.on('data', chunk => accumulatedData += chunk);
      response.on('end', () => fulfill(accumulatedData));
    }).on('error', reject);
  });
}

/**
 * Extracts text content from XML tags
 */
function extractTagContent(xmlContent, tagName) {
  const openingPattern = new RegExp(`<${tagName}[^>]*>`, 'g');
  const closingPattern = new RegExp(`</${tagName}>`, 'g');
  
  const matches = [];
  let position = 0;
  
  while (position < xmlContent.length) {
    openingPattern.lastIndex = position;
    const openMatch = openingPattern.exec(xmlContent);
    
    if (!openMatch) break;
    
    closingPattern.lastIndex = openMatch.index + openMatch[0].length;
    const closeMatch = closingPattern.exec(xmlContent);
    
    if (!closeMatch) break;
    
    const innerContent = xmlContent.substring(
      openMatch.index + openMatch[0].length,
      closeMatch.index
    );
    
    matches.push(innerContent.trim());
    position = closeMatch.index + closeMatch[0].length;
  }
  
  return matches;
}

/**
 * Analyzes individual sitemap and extracts URL records
 */
async function analyzeSitemapFile(sitemapLocation) {
  console.log(`  → Analyzing: ${sitemapLocation}`);
  
  try {
    const xmlData = await retrieveWebContent(sitemapLocation);
    const urlBlocks = xmlData.match(/<url>[\s\S]*?<\/url>/g) || [];
    
    const parsedRecords = urlBlocks.map(block => {
      const record = {};
      
      const locMatches = extractTagContent(block, 'loc');
      if (locMatches.length > 0) record.loc = locMatches[0];
      
      const lastmodMatches = extractTagContent(block, 'lastmod');
      if (lastmodMatches.length > 0) record.lastmod = lastmodMatches[0];
      
      const priorityMatches = extractTagContent(block, 'priority');
      if (priorityMatches.length > 0) record.priority = priorityMatches[0];
      
      const changefreqMatches = extractTagContent(block, 'changefreq');
      if (changefreqMatches.length > 0) record.changefreq = changefreqMatches[0];
      
      return record;
    });
    
    return parsedRecords;
  } catch (err) {
    console.error(`  ✗ Failed to process ${sitemapLocation}: ${err.message}`);
    return [];
  }
}

/**
 * Main discovery orchestration
 */
async function executeDiscovery() {
  console.log('=== Daikin Tucson Sitemap Discovery ===\n');
  console.log(`Primary sitemap: ${PRIMARY_SITEMAP_URL}\n`);
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}\n`);
  }
  
  // Step 1: Retrieve sitemap index
  console.log('Step 1: Fetching sitemap index...');
  let indexXml;
  try {
    indexXml = await retrieveWebContent(PRIMARY_SITEMAP_URL);
    console.log('  ✓ Index retrieved successfully\n');
  } catch (err) {
    console.error(`  ✗ Failed to retrieve index: ${err.message}`);
    process.exit(1);
  }
  
  // Step 2: Discover child sitemaps
  console.log('Step 2: Discovering child sitemaps...');
  const childSitemapUrls = extractTagContent(indexXml, 'loc');
  console.log(`  ✓ Found ${childSitemapUrls.length} child sitemap(s)\n`);
  
  // Step 3: Process each child sitemap
  console.log('Step 3: Processing child sitemaps...');
  const sitemapCollection = [];
  const countingSummary = {
    sitemaps: [],
    totals: {
      sitemapsFound: 0,
      totalUrlsDiscovered: 0
    }
  };
  
  for (const childUrl of childSitemapUrls) {
    const urlRecords = await analyzeSitemapFile(childUrl);
    
    sitemapCollection.push({
      url: childUrl,
      entries: urlRecords
    });
    
    countingSummary.sitemaps.push({
      url: childUrl,
      urlCount: urlRecords.length
    });
    
    countingSummary.totals.totalUrlsDiscovered += urlRecords.length;
    console.log(`    Found ${urlRecords.length} URL(s)`);
  }
  
  countingSummary.totals.sitemapsFound = childSitemapUrls.length;
  console.log(`  ✓ Processing complete\n`);
  
  // Step 4: Generate artifacts
  console.log('Step 4: Generating output artifacts...');
  const timestamp = new Date().toISOString();
  
  // Artifact 1: url-inventory.json
  const inventoryData = {
    metadata: {
      discoveredAt: timestamp,
      sitemapIndexUrl: PRIMARY_SITEMAP_URL,
      totalUrls: countingSummary.totals.totalUrlsDiscovered,
      sitemapsDiscovered: countingSummary.totals.sitemapsFound
    },
    sitemaps: sitemapCollection
  };
  
  const inventoryPath = path.join(OUTPUT_DIR, 'url-inventory.json');
  fs.writeFileSync(inventoryPath, JSON.stringify(inventoryData, null, 2));
  console.log(`  ✓ Created: url-inventory.json`);
  
  // Artifact 2: url-inventory.csv
  const csvRows = ['URL,LastModified,Priority,ChangeFrequency,Sitemap'];
  
  for (const sitemap of sitemapCollection) {
    const sitemapFilename = sitemap.url.split('/').pop();
    
    for (const entry of sitemap.entries) {
      const csvRow = [
        entry.loc || '',
        entry.lastmod || '',
        entry.priority || '',
        entry.changefreq || '',
        sitemapFilename
      ].map(field => `"${field}"`).join(',');
      
      csvRows.push(csvRow);
    }
  }
  
  const csvPath = path.join(OUTPUT_DIR, 'url-inventory.csv');
  fs.writeFileSync(csvPath, csvRows.join('\n'));
  console.log(`  ✓ Created: url-inventory.csv`);
  
  // Artifact 3: sitemap-counts.json
  const countsData = {
    discoveredAt: timestamp,
    sitemapIndex: PRIMARY_SITEMAP_URL,
    ...countingSummary
  };
  
  const countsPath = path.join(OUTPUT_DIR, 'sitemap-counts.json');
  fs.writeFileSync(countsPath, JSON.stringify(countsData, null, 2));
  console.log(`  ✓ Created: sitemap-counts.json\n`);
  
  // Summary
  console.log('=== Discovery Complete ===');
  console.log(`Total sitemaps analyzed: ${countingSummary.totals.sitemapsFound}`);
  console.log(`Total URLs discovered: ${countingSummary.totals.totalUrlsDiscovered}`);
  console.log(`Artifacts saved to: ${OUTPUT_DIR}`);
}

// Execute discovery
executeDiscovery().catch(err => {
  console.error('\n✗ Discovery failed:', err.message);
  process.exit(1);
});
