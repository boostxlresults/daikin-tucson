const https = require('https');
const fs = require('fs');
const path = require('path');

const sitemapUrl = 'https://daikintucson.com/sitemap_index.xml';
const artifactsDir = path.join(__dirname, 'artifacts');

// Function to fetch the URL
const fetchURL = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => resolve(data));
        }).on('error', (error) => reject(error));
    });
};

// Function to parse XML and extract data
const parseXML = (xml) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    return Array.from(xmlDoc.getElementsByTagName('sitemap')).map(sitemap => ({
        loc: sitemap.getElementsByTagName('loc')[0].textContent,
        lastmod: sitemap.getElementsByTagName('lastmod')[0].textContent,
    }));
};

// Main function to fetch and process sitemaps
const processSitemaps = async () => {
    try {
        const xml = await fetchURL(sitemapUrl);
        const sitemaps = parseXML(xml);

        // Create artifacts directory if it doesn't exist
        if (!fs.existsSync(artifactsDir)) {
            fs.mkdirSync(artifactsDir);
        }

        // Prepare data to write to files
        const urlInventory = [];
        const sitemapCounts = {};

        for (const sitemap of sitemaps) {
            const childXml = await fetchURL(sitemap.loc);
            const urls = parseXML(childXml);
            urls.forEach(url => {
                urlInventory.push(url);
            });
            sitemapCounts[sitemap.loc] = urls.length;
        }

        // Write url-inventory.json
        fs.writeFileSync(path.join(artifactsDir, 'url-inventory.json'), JSON.stringify(urlInventory, null, 2));

        // Write url-inventory.csv
        const csvContent = 'loc,lastmod\n' + urlInventory.map(url => `${url.loc},${url.lastmod}`).join('\n');
        fs.writeFileSync(path.join(artifactsDir, 'url-inventory.csv'), csvContent);

        // Write sitemap-counts.json
        fs.writeFileSync(path.join(artifactsDir, 'sitemap-counts.json'), JSON.stringify(sitemapCounts, null, 2));

        console.log('Artifacts generated successfully in artifacts directory.');
    } catch (error) {
        console.error('Error processing sitemaps:', error);
    }
};

processSitemaps();