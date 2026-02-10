#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const SITEMAP_INDEX_URL = "https://daikintucson.com/sitemap_index.xml";
const ARTIFACTS_DIR = path.join(process.cwd(), "artifacts");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  parseTagValue: true,
  parseAttributeValue: true,
});

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return await res.text();
}

function asArray(x) {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}

function parseSitemapIndex(xml) {
  const json = parser.parse(xml);
  const sitemaps = asArray(json?.sitemapindex?.sitemap).map((s) => ({
    loc: s?.loc || "",
    lastmod: s?.lastmod || "",
  }));
  return sitemaps.filter((s) => s.loc);
}

function parseUrlset(xml) {
  const json = parser.parse(xml);
  const urls = asArray(json?.urlset?.url).map((u) => ({
    loc: u?.loc || "",
    lastmod: u?.lastmod || "",
    priority: u?.priority || "",
    changefreq: u?.changefreq || "",
  }));
  return urls.filter((u) => u.loc);
}

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

function writeJson(filename, data) {
  fs.writeFileSync(path.join(ARTIFACTS_DIR, filename), JSON.stringify(data, null, 2), "utf8");
}

function writeText(filename, data) {
  fs.writeFileSync(path.join(ARTIFACTS_DIR, filename), data, "utf8");
}

async function main() {
  ensureArtifactsDir();

  console.log(`Fetching sitemap index: ${SITEMAP_INDEX_URL}`);
  const indexXml = await fetchText(SITEMAP_INDEX_URL);
  const sitemapRefs = parseSitemapIndex(indexXml);

  if (sitemapRefs.length === 0) {
    throw new Error("No sitemaps discovered in sitemap_index.xml");
  }

  const inventory = [];
  const counts = [];

  let totalUrls = 0;

  for (const ref of sitemapRefs) {
    console.log(`Fetching sitemap: ${ref.loc}`);
    const smXml = await fetchText(ref.loc);

    // Some child sitemaps can themselves be sitemap indexes, so handle both
    const childIndex = parseSitemapIndex(smXml);
    if (childIndex.length > 0) {
      // Nested sitemap index
      for (const nested of childIndex) {
        console.log(`  Nested sitemap: ${nested.loc}`);
        const nestedXml = await fetchText(nested.loc);
        const urls = parseUrlset(nestedXml);
        counts.push({ sitemap: nested.loc, urlCount: urls.length });
        totalUrls += urls.length;
        for (const u of urls) inventory.push({ ...u, sitemap: nested.loc });
      }
      continue;
    }

    // Normal urlset
    const urls = parseUrlset(smXml);
    counts.push({ sitemap: ref.loc, urlCount: urls.length });
    totalUrls += urls.length;
    for (const u of urls) inventory.push({ ...u, sitemap: ref.loc });
  }

  // JSON
  writeJson("url-inventory.json", {
    metadata: {
      discoveredAt: new Date().toISOString(),
      sitemapIndexUrl: SITEMAP_INDEX_URL,
      totalUrls,
      sitemapsDiscovered: counts.length,
    },
    urls: inventory,
    sitemapCounts: counts,
  });

  // CSV
  const header = ["loc", "lastmod", "priority", "changefreq", "sitemap"];
  const csvRows = [header.join(",")].concat(
    inventory.map((u) =>
      [
        u.loc,
        u.lastmod || "",
        u.priority || "",
        u.changefreq || "",
        u.sitemap || "",
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
  );
  writeText("url-inventory.csv", csvRows.join("\n"));

  // counts JSON
  writeJson("sitemap-counts.json", {
    discoveredAt: new Date().toISOString(),
    sitemapIndexUrl: SITEMAP_INDEX_URL,
    totals: { totalUrlsDiscovered: totalUrls, sitemapsFound: counts.length },
    sitemaps: counts,
  });

  console.log(`Done. URLs: ${totalUrls}, sitemaps: ${counts.length}, output: ${ARTIFACTS_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
