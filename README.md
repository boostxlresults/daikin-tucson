# Daikin Tucson Website Rebuild

This project is focused on rebuilding the Daikin Tucson website, aiming for improved performance and user experience.

## Phase 1: Discovery & Inventory

Automated sitemap discovery infrastructure to analyze the current website structure and populate the URL inventory for rebuild scope planning.

### Quick Start

Run the discovery script locally:

```bash
node scripts/discover-sitemaps.js
```

Or trigger via GitHub Actions:
1. Go to the Actions tab
2. Select "Sitemap Discovery" workflow
3. Click "Run workflow"
4. Download generated artifacts

### Output Artifacts

The discovery process generates three files in `/artifacts/`:

- **url-inventory.json** - Complete URL inventory with metadata
- **url-inventory.csv** - Spreadsheet-friendly format for analysis
- **sitemap-counts.json** - Summary statistics per sitemap

### Project Structure

```
.
├── scripts/
│   ├── discover-sitemaps.js    # Sitemap discovery automation
│   └── README.md               # Scripts documentation
├── .github/
│   └── workflows/
│       └── discover-sitemaps.yml  # GitHub Actions workflow
└── artifacts/                  # Generated output files (gitignored)
```

### Documentation

- [Scripts Documentation](./scripts/README.md)