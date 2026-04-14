# SEO Audit & Upgrade — v26

**Date:** 2026-04-14
**Scope:** Technical SEO + Authority Schema hardening for ahmetcanyesildag.com
**Goal:** Maximize organic traffic via Google's ranking, rich-result, and Knowledge Graph systems.

---

## Baseline State (what was already strong)

The v25 baseline was already unusually comprehensive for a personal brand site:

- **Person schema** with 9 credentials, 5 employers, alumni links, memberships, awards, knowsAbout, sameAs across 7 social platforms
- **Organization + WebSite + WebPage** wired via `@id` references (proper graph)
- **BreadcrumbList** on every key page
- **Article schema** on all 3 blog posts
- **CollectionPage + ItemList** on /books with Book/Review entities
- **Clean URL redirects** in netlify.toml (`/orophile` → `/orophile.html`, etc.)
- **CSP headers** configured
- **canonical + OG + Twitter** meta tags consistent across pages

The upgrade below is **surgical**, not a rebuild.

---

## Gaps Identified & Fixed

### 1. Sitemap — dead entry + stale `lastmod`

**Problem:** `sitemap.xml` listed `/signals-and-noise`, but the file does not exist. Crawling this URL wastes crawl budget and downgrades site quality signals. All `<lastmod>` values were frozen at `2026-04-07`, which discourages recrawl after the v25 content push.

**Fix:**

- Removed `/signals-and-noise` entry entirely
- Updated every `<lastmod>` to `2026-04-14`
- Bumped `/blog` and blog-post priority from 0.7→0.8 (these are the growth engine)
- Added richer `<image:image>` entries for Orophile and homepage portraits to improve Google Images inclusion
- Bumped `/orophile` priority from 0.8→0.9 (commercial intent)

### 2. Article schema — weak `image`, no `wordCount`, stale `dateModified`

**Problem:** All three blog posts had:

- `"image": "..."` as a bare URL string (Google prefers `ImageObject` with dimensions for rich-result eligibility)
- `dateModified` identical to `datePublished` (no signal of freshness)
- No `wordCount`, `timeRequired`, or `about` entities
- Flat `keywords` array (Google expects comma-separated string)

**Fix:** All three `Article` JSON-LD blocks now include:

- `image` as full `ImageObject` with `url`, `width`, `height`, `caption`
- `thumbnailUrl`
- `dateModified: "2026-04-14"` (freshness signal)
- `wordCount` (1132 / 1015 / 1290)
- `timeRequired` (ISO-8601 duration)
- Comma-separated `keywords` string (Google-compliant format)
- `about` array with `Thing` / `Place` / `CollegeOrUniversity` entities for topical linking
- Each post now uses a **unique** image relevant to its content (Skål / Orophile mountain / Cornell class) instead of all sharing the generic OG image

**Why it matters:** Article rich results (Top Stories carousel, Google Discover) require `ImageObject` with minimum dimensions. This change unlocks eligibility.

### 3. documents.html — no `DigitalDocument` entities

**Problem:** The CollectionPage schema on `/documents` listed only two vague placeholder `DigitalDocument` stubs. The actual downloadable PDFs (CV, Insider's Guide to Wellness Retreats, Orophile Overview) were not semantically linked.

**Fix:** Expanded `hasPart` to include four properly-typed entities:

1. **Resume.pdf** as `DigitalDocument` with `url`, `encodingFormat`, `author`, `publisher`, `datePublished`
2. **Insider's Guide to Wellness Retreats** as `DigitalDocument + CreativeWork` with full metadata, `isAccessibleForFree: true`, keywords, and `about` topics
3. **Orophile Company Overview** as `DigitalDocument + AboutPage` with `publisher` linked to `#orophile` entity and `about` back-link to the Orophile entity
4. Cornell GMP certificate (existing, preserved)

**Why it matters:** Google can now crawl the PDFs as first-class resources with proper authorship and topical signals. Also increases the chance the Wellness Retreats guide surfaces for queries like "luxury wellness retreat guide pdf".

### 4. Person schema — missing high-value properties

**Added to Person entity in index.html:**

- **`hasOccupation`** — three `Occupation` entities (Hotel Operations Manager, Hospitality Educator, Orophile Founder) with BLS occupational codes. This is a known Knowledge Graph signal.
- **`contactPoint`** — `ContactPoint` entity for "speaking and media enquiries" with email + languages + area served. Drives media/press discoverability.
- **`speakable`** — `SpeakableSpecification` targeting `.hero-headline`, `.cred-summary`, `.section-lead` CSS selectors. Enables Google Assistant / voice-search to read content aloud.
- **`sameAs`** — added `https://orophilejourneys.com` and `https://www.skal.org` for stronger entity disambiguation
- **`knowsAbout`** — added "Service Excellence Governance", "Hotel General Management", "Longevity Tourism", "Retreat Design" to broaden topical authority

### 5. Core Web Vitals — CLS + LCP hygiene

**Problem:** index.html had 5 `<img>` tags. Only 1 had `loading="lazy"`, none had `width`/`height` attributes → causes **Cumulative Layout Shift** (CLS) during load, which is a direct CWV ranking factor. No LCP hints for the hero image or fonts.

**Fix:**

- Added `width`, `height`, `loading="lazy"`, `decoding="async"` to all 4 below-fold images on index.html (intrinsic dimensions read from the actual files: 923×612, 1024×768, 1600×1600, 1125×1141)
- Added `<link rel="preload" as="image" href="/images/hero-portrait.jpg" fetchpriority="high">` — tells the browser to fetch the LCP image before CSS blocks, accelerating Largest Contentful Paint
- Added `<link rel="preload" as="style">` for Google Fonts CSS

**Why it matters:** CLS and LCP are core Google ranking signals. Adding explicit dimensions eliminates layout shift; preload shaves 300–800ms off LCP on mobile.

### 6. Mobile polish

Added to index.html `<head>`:

- `<meta name="theme-color" content="#0f1a14">` for both light and dark color schemes — sets the mobile browser chrome to brand green, improves shareability screenshots and PWA install polish
- `<meta name="format-detection" content="telephone=no">` — prevents iOS Safari from auto-linking numbers in body copy as phone links

---

## Post-Deploy Actions (yours, not mine)

After `git push origin main` → Netlify auto-deploy completes, run these in Google Search Console:

1. **Submit the updated sitemap** — Search Console → Sitemaps → resubmit `sitemap.xml` to trigger a fresh crawl pass
2. **Request indexing** on `/documents` (new content) and `/` (new schema) via the URL Inspection tool
3. **Remove** the `/signals-and-noise` URL via the Removals tool if it was previously indexed
4. **Run the Rich Results Test** on:
   - `https://ahmetcanyesildag.com/`  — should show Person + Organization + WebSite eligible
   - `https://ahmetcanyesildag.com/blog/excellence-governed-at-the-top` — should show Article eligible
   - `https://ahmetcanyesildag.com/documents` — should show CollectionPage + DigitalDocument items
5. **PageSpeed Insights** — run on `/` and confirm LCP drops below 2.5s and CLS stays ≤ 0.05

---

## What was NOT changed (and why)

- **WebSite `SearchAction`** — intentionally skipped. Google's sitelinks searchbox requires a *real* `/search?q=...` target, which the static site doesn't have. Declaring a fake one risks a schema warning. Add this *after* a search page exists.
- **FAQPage schema** — index.html has no FAQ content to mark up. Adding fake FAQs would violate Google's structured-data guidelines.
- **CSS/JS minification** — not touched. `site.css` is ~1500 lines; worth a separate pass if CWV still needs work after deploy.
- **Image format conversion (JPG → WebP/AVIF)** — deferred; would require resizing all hero images. ~30–50% payload reduction available but is a bigger change.
- **Blog-post content** — not touched. Content quality is already strong; this audit is technical only.

---

## Files changed in v26

```
sitemap.xml
index.html
documents.html
blog/excellence-governed-at-the-top.html
blog/mountain-as-boardroom.html
blog/cornell-standards-canadian-classroom.html
SEO_AUDIT_v26.md   (new)
```

All JSON-LD validated (`14/14 valid`). Sitemap validated as well-formed XML.
