# Content & Keyword Strategy — v28

**Date:** 2026-04-14
**Purpose:** Lever #2 after technical SEO. Turn ahmetcanyesildag.com into a **topical authority hub** that ranks for searches real buyers make, not just your name.
**Horizon:** 90 days to first ranked keywords, 6 months to meaningful organic traffic.

---

## 1. Positioning — the three pillars we own

Your existing footprint already points at three distinct audiences. The strategy is to stop blending them and instead build a dedicated pillar page for each, then feed each pillar with supporting posts that internally link back.

| Pillar | Audience | Commercial intent | Primary asset |
|---|---|---|---|
| **Hospitality Leadership & Governance** | Hotel owners, boards, GM search committees, executive recruiters | Consulting engagements, board seats, GM placements | `/hospitality-leadership` (new) |
| **Luxury Wellness Retreats** | HNW travelers, corporate offsite planners, wellness buyers | Orophile bookings (affiliate + direct) | `/wellness-retreats` (new) |
| **Hospitality Education & Speaking** | Universities, conference organizers, media | Speaking fees, teaching engagements, press | `/speaking` (new) |

Each pillar page is a **2,500–4,000 word cornerstone** that answers the top 10 questions a buyer in that category would ask, links out to 6–10 supporting posts, and internally links back to the homepage Person entity.

---

## 2. Keyword universe — what to actually target

These are chosen for the intersection of (a) realistic difficulty for a personal-brand site and (b) commercial intent from people who would hire you or book through Orophile.

### Pillar 1 — Hospitality Leadership (low-mid difficulty, high intent)

Head terms to target on the pillar page itself:

- "hospitality leadership consultant"
- "luxury hotel general manager consulting"
- "hotel service excellence governance"
- "hospitality board advisor"

Long-tail posts (one post per phrase, ~1,200 words each):

- "how to hire a luxury hotel general manager"
- "what does a hospitality board advisor actually do"
- "hotel service standards audit checklist"
- "cornell general managers program — is it worth it for a working GM"
- "hospitality leadership lessons from 30 years across five countries"
- "why most hotel turnaround plans fail in year two"

### Pillar 2 — Luxury Wellness Retreats (mid difficulty, highest affiliate payoff)

Head terms:

- "luxury wellness retreat"
- "curated wellness journey"
- "mountain wellness retreat"
- "transformational travel experience"

Long-tail posts:

- "caucasus mountain wellness retreat — what to expect"
- "luxury wellness retreat vs resort spa — the real differences"
- "how to choose a transformational retreat in your 40s and 50s"
- "what makes a wellness retreat actually restorative (not just rebranded leisure)"
- "top 10 questions to ask before booking a luxury retreat"
- "the orophile method — mountains as boardrooms" (internal link to existing post)

### Pillar 3 — Hospitality Education & Speaking (lowest traffic, highest authority signal)

Head terms:

- "hospitality keynote speaker"
- "hotel management lecturer"
- "service excellence speaker"

Long-tail posts:

- "what i teach canadian hospitality students about global service standards" (linked to existing Cornell classroom post)
- "15 skål international lessons for young hoteliers"
- "the one service moment that changed how i run a hotel"

---

## 3. Internal linking blueprint

This is what actually moves the needle for personal-brand SEO. The goal: Google should be able to traverse from any page to any other page within 2 clicks.

```
                         ┌──────────────────────┐
                         │      index.html      │  (Person entity, knowsAbout)
                         └─────────┬────────────┘
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
       /hospitality-leadership  /wellness-retreats  /speaking   (PILLARS)
                 │                 │                 │
        ┌────────┴────────┐ ┌──────┴──────┐ ┌────────┴────────┐
        │  6 supporting   │ │ 6 supporting │ │  3 supporting  │
        │   blog posts    │ │  blog posts  │ │   blog posts   │
        └─────────────────┘ └──────────────┘ └────────────────┘
                                     │
                              /orophile.html  ←  every wellness post links here
```

Rules:

1. Every blog post links **back** to its pillar page with exact-match anchor text on first mention
2. Every blog post links **sideways** to at least 2 other posts in the same pillar
3. Every pillar page links **down** to all its supporting posts in a prominent "Further Reading" section
4. Pillars cross-link: hospitality leadership ↔ speaking, wellness retreats ↔ orophile
5. Homepage `knowsAbout` array already names the three topics — this reinforces the cluster semantically

---

## 4. Content calendar — first 90 days

This is paced for a working GM. One cornerstone + one post per week = 12 pieces in Q2. If that's too much, halve it and run for 6 months.

| Week | Asset | Type | Target keyword |
|---|---|---|---|
| 1 | `/hospitality-leadership` pillar page | Cornerstone 3000w | hospitality leadership consultant |
| 2 | "how to hire a luxury hotel GM" | Post 1200w | hire luxury hotel general manager |
| 3 | `/wellness-retreats` pillar page | Cornerstone 3500w | luxury wellness retreat |
| 4 | "caucasus mountain wellness retreat" | Post 1400w | caucasus wellness retreat |
| 5 | `/speaking` pillar page | Cornerstone 2000w | hospitality keynote speaker |
| 6 | "what a hospitality board advisor does" | Post 1100w | hospitality board advisor |
| 7 | "hotel service standards audit checklist" | Post 1500w (+ downloadable PDF) | service standards audit |
| 8 | "wellness retreat vs resort spa" | Post 1200w | wellness retreat vs spa |
| 9 | "cornell GMP — is it worth it" | Post 1300w | cornell general managers program |
| 10 | "transformational travel in your 40s" | Post 1200w | transformational travel |
| 11 | "why turnaround plans fail in year two" | Post 1400w | hotel turnaround |
| 12 | "the one service moment that changed how i run a hotel" | Post 1000w (story-driven) | hospitality service stories |

---

## 5. On-page template for every new post

Copy this every time — the technical foundation you've built only pays off if new content follows the pattern:

```
Title (≤60 chars, keyword in first half)
Meta description (140–160 chars, keyword + value prop + CTA)
H1 matches title within 5% word variance
Intro — 2 paragraphs, keyword in first 100 words, answer-first
H2 (long-tail variant)
  body
  internal link to pillar page
H2
  body
  internal link to sibling post
H2 "Key takeaways" — 5 bullet points (the one place bullets earn their keep)
H2 "About the author" — 3 lines + link to /
Schema: Article JSON-LD with ImageObject, wordCount, timeRequired, dateModified, about[]
Social: OG image specific to the post, not the generic homepage OG
```

---

## 6. Measurement — what to track, what to ignore

**Track (monthly):**

1. Google Search Console → Performance → Queries — the list of searches you impress for. Goal: 50+ unique queries by month 3, 200+ by month 6.
2. GSC → Pages — number of pages getting clicks. Goal: every pillar page + at least 6 posts in top 20 positions by month 6.
3. Branded vs non-branded impression split. Goal: shift from 90/10 branded-dominant to 60/40 by month 6.
4. Affiliate clicks on wellness-retreat posts via the GA4 `affiliate_click` event (already wired up in affiliate.js).

**Ignore:**

- DA / DR scores from third-party tools (vanity)
- Total traffic without query segmentation (meaningless on a personal brand site)
- Social shares (don't correlate with rankings)

---

## 7. The one thing that will tempt you to cheat — don't

**Do not use AI to mass-produce posts and publish them without heavy editing.** Google's Helpful Content System now explicitly penalizes this pattern, and for a personal-brand site your name is literally the trust signal. One plausible-but-generic post diluting your voice does more damage than ten missed weeks.

Use AI (me) as a research assistant, outline generator, and editor. Keep the writing voice yours — specifically the Cornell-trained, Skål-hardened, been-there voice that no one else can fake. That's your moat.

---

## 8. What I can do for you in the next session

If you want, in the next session I can:

1. Draft the `/hospitality-leadership` pillar page end-to-end (3000 words) and drop it in the repo as a new HTML file with proper schema
2. Or draft the `/wellness-retreats` pillar — higher commercial payoff for Orophile
3. Or write the first 3 long-tail posts in parallel
4. Or all of the above across two sessions

Your call. Pick the highest-leverage lever for you right now.

---

*Strategy doc v28. Technical SEO foundation is live at v27+. This is the content layer that will compound on top of it.*
