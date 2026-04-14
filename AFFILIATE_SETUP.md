# Affiliate Setup — ahmetcanyesildag.com

All affiliate links across the site are powered by a single config file:
**`/js/affiliate.js`** → `AFFILIATE_CONFIG` object.

To go live, replace each `PLACEHOLDER_*` value with the real ID issued by the
program after approval. No HTML edits required — every link with a
`data-affiliate="<key>"` attribute is rewritten at runtime.

## Programs & signup links

| Key in config | Network | Signup | Replace |
|---|---|---|---|
| `amazon-book`, `amazon` | Amazon Associates | https://affiliate-program.amazon.com | `PLACEHOLDER_AMAZON_TAG` → e.g. `ahmetcan-20` |
| `booking` | Booking.com Partner | https://www.booking.com/affiliate-program/v2/index.html | `PLACEHOLDER_BOOKING_AID` → numeric aid |
| `tripaneer` | Tripaneer | https://www.tripaneer.com/affiliate-program | `PLACEHOLDER_TRIPANEER_AID` |
| `coursera` | Coursera (Impact.com) | https://impact.com → Coursera brand | `PLACEHOLDER_COURSERA_IRID` |
| `villiers` | Villiers Jets | https://www.villiersjets.com/affiliate-program | `PLACEHOLDER_VILLIERS_REF` |
| `plumguide` | Plum Guide | https://www.plumguide.com/affiliates | `PLACEHOLDER_PLUMGUIDE_REF` |
| `sandals` | Sandals Resorts | https://www.sandals.com/affiliates/ | `PLACEHOLDER_SANDALS_REFID` |
| `emeritus` | Emeritus / Wharton | https://emeritus.org/partners/ | `PLACEHOLDER_EMERITUS_PARTNER` |
| `viator` | Viator | https://www.viator.com/affiliate | `PLACEHOLDER_VIATOR_PID` |
| `getyourguide` | GetYourGuide | https://partner.getyourguide.com | `PLACEHOLDER_GYG_PARTNER` |

## Adding a new affiliate link

In any HTML page:

```html
<a href="https://www.booking.com/hotel/example.html"
   data-affiliate="booking"
   target="_blank"
   rel="sponsored noopener noreferrer">Book this hotel →</a>
```

That's it. The script will:
1. Inject the tracking ID parameter (`?aid=...`)
2. Append UTM params (`utm_source=ahmetcanyesildag.com&utm_medium=affiliate&utm_campaign=booking`)
3. Fire a GA4 `affiliate_click` event on click
4. Fire a Meta Pixel `AffiliateClick` custom event

## GA4 reporting

Custom event name: **`affiliate_click`**

Event parameters captured:
- `affiliate_key` — which program (e.g. `booking`)
- `affiliate_network` — display name
- `link_url` — the rewritten outbound URL
- `link_text` — visible CTA text (truncated to 80 chars)
- `page_path` — page where the click happened

In GA4: **Admin → Custom definitions → Create custom dimensions** for each
parameter, then build an exploration grouped by `affiliate_key`.

## Compliance

The site already carries affiliate disclosure banners (FTC 16 CFR Part 255 +
Canadian Competition Act compliant) on `toolkit.html` and a footer disclosure
on `books.html`. The script also ensures every affiliate link has
`rel="sponsored noopener noreferrer"` set automatically.
