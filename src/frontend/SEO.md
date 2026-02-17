# SEO Setup for SwiftSport Hub

This guide explains how to set up Google Search Console and optimize SwiftSport Hub for search engines.

## Overview

SwiftSport Hub is configured for SEO with:
- **Meta tags** for search engines and social media (Open Graph, Twitter Cards)
- **Structured data** (JSON-LD) for rich search results
- **Sitemap** for search engine crawling
- **Robots.txt** to control crawler access

## Production Domain

The primary SEO property for SwiftSport Hub is:
**https://swiftsportshub.com**

> **Note:** The Internet Computer boundary URL (e.g., `https://[canister-id].icp0.io`) is a technical fallback and should NOT be used as the primary SEO property. Always use the custom domain for Google Search Console and other SEO tools.

## Google Search Console Setup

### Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix** property type
4. Enter: `https://swiftsportshub.com`
5. Click **Continue**

### Step 2: Verify Ownership

Google offers multiple verification methods. Choose one:

#### Option A: DNS Verification (Recommended)

1. Google will provide a TXT record
2. Add this TXT record to your domain's DNS settings at your domain registrar
3. Wait for DNS propagation (can take up to 48 hours, usually much faster)
4. Click **Verify** in Google Search Console

**Advantages:**
- Verification persists even if you redeploy the site
- No files to manage in your codebase
- Recommended for production sites

#### Option B: HTML File Verification

1. Google will provide an HTML verification file (e.g., `google1234567890abcdef.html`)
2. Download the file
3. Place it in `frontend/public/` directory of your project
   ```
   frontend/
   └── public/
       ├── google1234567890abcdef.html  ← Place here
       ├── sitemap.xml
       └── robots.txt
   ```
4. Rebuild and redeploy your frontend:
   ```bash
   VITE_PUBLIC_SITE_BASE_URL=https://swiftsportshub.com dfx deploy frontend --network ic
   ```
5. Verify the file is accessible at: `https://swiftsportshub.com/google1234567890abcdef.html`
6. Click **Verify** in Google Search Console

**Important:**
- The verification file MUST be placed in `frontend/public/` (the static assets directory)
- Do NOT route verification files through backend logic
- The file will be served at the site root automatically
- Keep the file in place after verification to maintain verified status

### Step 3: Submit Sitemap

After verification:

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

Google will now crawl your sitemap and index your pages.

## Sitemap and Robots.txt

### Sitemap Location
- **File:** `frontend/public/sitemap.xml`
- **URL:** https://swiftsportshub.com/sitemap.xml

The sitemap currently includes the homepage. As you add more pages, update the sitemap with additional URLs.

### Robots.txt Location
- **File:** `frontend/public/robots.txt`
- **URL:** https://swiftsportshub.com/robots.txt

The robots.txt file allows all search engines to crawl the site and references the sitemap location.

## SEO Meta Tags

The site includes comprehensive meta tags in `frontend/index.html`:

- **Title & Description:** Basic SEO metadata
- **Canonical URL:** Prevents duplicate content issues
- **Open Graph tags:** For Facebook, LinkedIn, and other social platforms
- **Twitter Card tags:** For Twitter/X sharing
- **Robots meta:** Instructs search engines to index and follow links

These tags are automatically configured to use the production domain (`https://swiftsportshub.com`) when deployed with the correct environment variable.

## Structured Data (JSON-LD)

The site includes JSON-LD structured data for:
- **Organization:** SwiftSport Hub business information
- **WebSite:** Site metadata

This helps search engines understand your content and may enable rich results in search.

**Validation:**
Test your structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results).

## Deployment Configuration

When deploying to production, always set the public site base URL:

