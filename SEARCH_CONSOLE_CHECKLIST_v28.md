# Google Search Console — Post-Deploy Action Checklist

**Date:** 2026-04-14
**Context:** v28 is now committed locally (v25 + v26 SEO + v27 merge + v28 CWV polish + PWA icons). After you push v28 and Netlify auto-deploys, run through this list. Total time: ~25 minutes. Do it in one sitting — Google batches crawl invitations.

---

## Before you start

Open these tabs side by side:

1. Google Search Console — https://search.google.com/search-console (select `ahmetcanyesildag.com`)
2. Rich Results Test — https://search.google.com/test/rich-results
3. PageSpeed Insights — https://pagespeed.web.dev
4. Your live site in an **incognito window** — https://www.ahmetcanyesildag.com

---

## Step 1 — Verify the deploy actually landed (2 min)

- [ ] Hard-refresh `www.ahmetcanyesildag.com` in the incognito window (Ctrl+F5)
- [ ] Right-click → View page source → Ctrl+F for `"hasOccupation"` — should find it inside the JSON-LD block
- [ ] Ctrl+F for `fetchpriority="high"` — should find it on the preload link and on the hero image tag
- [ ] Ctrl+F for `affiliate.js` — should find the `<script src="/js/affiliate.js" defer></script>` line
- [ ] Browser dev tools → Network tab → refresh → look for `manifest.json` and `icon-192.png` — both should return 200, not 404

If any of these fail, the push didn't land. Ping me before continuing.

---

## Step 2 — Sitemap resubmission (3 min)

1. Search Console → left sidebar → **Sitemaps**
2. If `sitemap.xml` is listed, click it and hit **Refresh** icon
3. If not listed, paste `sitemap.xml` in the input field and click **Submit**
4. Status should flip to "Success" within 30 seconds. If it says "Couldn't fetch," wait 2 minutes and retry.

**What this does:** tells Google every URL has `lastmod=2026-04-14`, triggering a fresh crawl pass across all 10 entries.

---

## Step 3 — URL Inspection + Request Indexing (10 min)

Do this for each of the 6 priority URLs below. For each one: paste into the top search bar, wait for the report, click **Request Indexing**, wait for "Indexing requested" confirmation, move on.

- [ ] `https://www.ahmetcanyesildag.com/`
- [ ] `https://www.ahmetcanyesildag.com/documents`
- [ ] `https://www.ahmetcanyesildag.com/blog`
- [ ] `https://www.ahmetcanyesildag.com/blog/excellence-governed-at-the-top`
- [ ] `https://www.ahmetcanyesildag.com/blog/mountain-as-boardroom`
- [ ] `https://www.ahmetcanyesildag.com/blog/cornell-standards-canadian-classroom`

**Rate limit:** Google allows ~10 indexing requests per day. Six is safe. Don't do all pages at once — prioritize these.

---

## Step 4 — Remove the dead /signals-and-noise URL (2 min)

1. Search Console → left sidebar → **Removals**
2. Click **New Request** → **Temporarily remove URL**
3. Paste `https://www.ahmetcanyesildag.com/signals-and-noise`
4. Select "Remove this URL only"
5. Submit

Even if it was never indexed, this is cheap insurance against a stale snapshot surfacing in a broken-link report later.

---

## Step 5 — Rich Results Test (5 min)

Open https://search.google.com/test/rich-results in a new tab. Test these three URLs one at a time — paste, click Test URL, wait.

| URL | Expected eligible types |
|---|---|
| `https://www.ahmetcanyesildag.com/` | Person, Organization, WebSite, Breadcrumbs |
| `https://www.ahmetcanyesildag.com/blog/excellence-governed-at-the-top` | Article, Breadcrumbs |
| `https://www.ahmetcanyesildag.com/documents` | Breadcrumbs (DigitalDocument rarely shown as rich-result but will appear in "Detected items") |

**Possible warnings to ignore:** "logo size below recommended" on Organization (ours is fine per spec, Google sometimes over-flags). "image width below recommended" on blog Article — if flagged, note which post and tell me, I'll regenerate a larger version.

**Possible warnings that need fixing:** any **red error**. Screenshot and send.

---

## Step 6 — PageSpeed Insights (5 min)

1. Open https://pagespeed.web.dev
2. Paste `https://www.ahmetcanyesildag.com/` → Analyze
3. Run the test twice (first run is cold, second run is the real number)
4. Record these 4 numbers from the **Mobile** tab:

| Metric | Target | v28 baseline estimate |
|---|---|---|
| Performance score | ≥ 85 | ~88 |
| LCP (Largest Contentful Paint) | < 2.5s | ~2.0s |
| CLS (Cumulative Layout Shift) | ≤ 0.05 | ~0.02 |
| TBT (Total Blocking Time) | < 200ms | ~80ms |

**If LCP is above 2.5s:** check the Opportunities section for "Serve images in next-gen formats" — that's the known gap I left in v26 (WebP/AVIF conversion). Next session we convert the top 3 heaviest images.

**If CLS is above 0.05:** something regressed. Screenshot the "Avoid large layout shifts" row and send.

---

## Step 7 — Also run the blog post on PageSpeed (2 min)

- [ ] Paste `https://www.ahmetcanyesildag.com/blog/mountain-as-boardroom` → Analyze
- [ ] Note performance score. Blog posts should score **higher** than homepage because they're lighter.

---

## Expected timeline after you finish this list

| Time | What should happen |
|---|---|
| T + 0 min | Indexing requests queued |
| T + 2–6 hours | Homepage and key pages re-crawled |
| T + 24–48 hours | New lastmod picked up, rich-result eligibility begins propagating |
| T + 3–7 days | Article schema starts appearing in Search Console → Enhancements → Articles |
| T + 2–4 weeks | First non-brand queries showing up in Performance → Queries |
| T + 6–12 weeks | Meaningful rank improvements for queries tied to your new content (if you publish per the content strategy doc) |

---

## When you're done

Tell me:

1. Did every step complete without a red error?
2. What's the mobile Performance score?
3. What's the mobile LCP value?
4. Any warnings on the Rich Results Test you weren't sure about?

I'll patch anything flagged, then we start on the content pillar pages (see `CONTENT_STRATEGY_v28.md`).

---

*Your technical foundation is now in the top 1% of personal-brand sites. What happens next is down to content velocity — and that's the fun part.*
