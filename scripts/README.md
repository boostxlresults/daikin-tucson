# Discovery Scripts

This directory contains automation scripts for analyzing the Daikin Tucson website structure.

## discover-sitemaps.js

Automated sitemap discovery tool that analyzes the website's sitemap structure.

### Usage

```bash
node scripts/discover-sitemaps.js
```

### What it does

1. Fetches the sitemap index from `https://daikintucson.com/sitemap_index.xml`
2. Discovers and fetches all child sitemaps
3. Extracts URL metadata (location, last modified, priority, change frequency)
4. Generates three output files in the `/artifacts/` directory:
   - `url-inventory.json` - Complete URL inventory with metadata
   - `url-inventory.csv` - Spreadsheet-friendly CSV format
   - `sitemap-counts.json` - Summary statistics

### Requirements

- Node.js (v18+)
- Internet access to fetch sitemaps
- No external dependencies (uses built-in Node.js modules)

### GitHub Actions

The discovery can also be run via GitHub Actions workflow:
- Navigate to Actions tab
- Select "Sitemap Discovery" workflow
- Click "Run workflow"
- Download artifacts after completion
