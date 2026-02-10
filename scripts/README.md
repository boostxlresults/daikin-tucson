# Discovery Scripts

This directory contains automation scripts for analyzing the Daikin Tucson website structure.

## discover-sitemaps.js

Automated sitemap discovery tool that fetches and analyzes the website's sitemap structure to extract URL metadata for rebuild scope planning.

### How to Run

**Preferred: GitHub Actions Workflow**

The discovery workflow can be triggered manually via GitHub Actions:
- Navigate to the **Actions** tab
- Select **"Discover Sitemaps"** workflow
- Click **"Run workflow"**
- Download artifacts after completion

**Local Execution**

To run locally, ensure dependencies are installed and execute:

```bash
npm ci
node scripts/discover-sitemaps.js
```

### What It Does

1. Fetches the sitemap index from `https://daikintucson.com/sitemap_index.xml`
2. Discovers and fetches all referenced child sitemaps
3. Parses URL entries and extracts metadata: `loc`, `lastmod`, `priority`, `changefreq`
4. Generates three output files in the `/artifacts/` directory:
   - `url-inventory.json` - Complete URL inventory with metadata
   - `url-inventory.csv` - Spreadsheet-friendly CSV format
   - `sitemap-counts.json` - Summary statistics per sitemap

### Requirements

- Node.js v20 or higher
- `fast-xml-parser` dependency (installed via `npm ci`)
- Internet access to fetch sitemaps from daikintucson.com

### GitHub Actions Workflow

The discovery is automated via `.github/workflows/discover-sitemaps.yml`:
- **Trigger:** `workflow_dispatch` (manual trigger only)
- **Actions:** checkout@v4, setup-node@v4 (Node 20), npm ci
- **Output:** Artifacts uploaded with 30-day retention