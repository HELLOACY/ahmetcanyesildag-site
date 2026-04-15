/*!
 * affiliate.js — ahmetcanyesildag.com
 * v2.2 — Expedia Travel Creator tag ahmet_can_yesildag wired in (April 2026).
 *        GetYourGuide Y5ZZCAJ live. rel="sponsored" enforced. Coursera pending Impact.com.
 *
 * HOW IT WORKS
 * 1. Every affiliate link in the HTML carries a data-affiliate="<key>" attribute.
 * 2. On DOMContentLoaded this script rewrites each link's href to include the
 *    correct tracking parameter from AFFILIATE_CONFIG below.
 * 3. On click it fires a GA4 `affiliate_click` + FB `AffiliateClick` event.
 * 4. On scroll-into-view it fires a GA4 `affiliate_impression` event (once per key
 *    per session via sessionStorage), so you can measure visibility vs. click rates.
 *
 * SWAPPING IN REAL IDs
 * Replace the PLACEHOLDER_* values below with your real affiliate IDs once
 * you've been approved by each program. No HTML edits required.
 *
 * AFFILIATE PROGRAM SIGNUP GUIDE (priority order by commission):
 *  1. Amazon Associates   → associates.amazon.com            (books + gear, 1–10%)
 *  2. Booking.com Partner → partner.booking.com              (hotels, ~4–6% + bonuses)
 *  3. World Nomads        → worldnomads.com/affiliates       (insurance, 10–15%)
 *  4. Emeritus            → emeritus.org/affiliate           (executive ed, 15–30%)
 *  5. Tripaneer           → tripaneer.com/affiliates         (wellness retreats, 8–12%)
 *  6. Coursera            → imp.i384100.net (Impact.com)     (courses, up to 45%)
 *  7. Oura Ring           → ouraring.com/pages/affiliates    (wearables, ~10%)
 *  8. Away Luggage        → awaytravel.com (ShareASale/CJ)   (luggage, ~6%)
 *  9. MasterClass         → masterclass.com/affiliates       (learning, 25%)
 * 10. Viator              → partner.viator.com               (experiences, 8%)
 * 11. GetYourGuide        → partner.getyourguide.com         (experiences, 8%) ✓ LIVE
 * 12. Expedia Travel      → creator.expediagroup.com         (hotels/flights/pkg) ✓ LIVE
 * 13. Mr & Mrs Smith      → mrandmrssmith.com/affiliates     (luxury hotels, ~5%)
 * 13. Tablet Hotels       → tablethotels.com/affiliates      (luxury hotels, ~5%)
 * 14. Villiers Jets       → villiers.co.uk/affiliates        (private aviation, 30%)
 * 15. Sandals Resorts     → sandals.com/affiliates           (all-inclusive, 4%)
 */
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIG — replace PLACEHOLDER_* with real IDs after program approval
  // ─────────────────────────────────────────────────────────────────────────
  var AFFILIATE_CONFIG = {

    // ── Books / Media ──────────────────────────────────────────────────────
    'amazon-book': {
      param: 'tag',
      id: 'ahmetcanyes07-20',               // Amazon.ca Associates — LIVE
      network: 'Amazon Associates (CA)'
    },
    'amazon': {
      param: 'tag',
      id: 'ahmetcanyes07-20',               // Amazon.ca Associates — LIVE
      network: 'Amazon Associates (CA)'
    },
    'audible': {
      param: 'tag',
      id: 'ahmetcanyes07-20',               // Audible CA uses same Associates tag
      network: 'Amazon/Audible (CA)'
    },

    // ── Hotels & Accommodation ─────────────────────────────────────────────
    'booking': {
      param: 'aid',
      id: 'PLACEHOLDER_BOOKING_AID',        // Booking.com Partner aid (numeric)
      network: 'Booking.com Partner'
    },
    'mr-mrs-smith': {
      param: 'ref',
      id: 'PLACEHOLDER_MRS_SMITH_REF',
      network: 'Mr & Mrs Smith'
    },
    'tablet-hotels': {
      param: 'ref',
      id: 'PLACEHOLDER_TABLET_REF',
      network: 'Tablet Hotels'
    },

    // ── Travel Insurance ───────────────────────────────────────────────────
    'world-nomads': {
      param: 'affiliate_id',
      id: 'PLACEHOLDER_WORLD_NOMADS_ID',    // 6-digit numeric ID from World Nomads portal
      network: 'World Nomads'
    },

    // ── Wellness Retreats & Experiences ───────────────────────────────────
    'tripaneer': {
      param: 'aid',
      id: 'PLACEHOLDER_TRIPANEER_AID',
      network: 'Tripaneer'
    },
    'viator': {
      param: 'pid',
      id: 'PLACEHOLDER_VIATOR_PID',
      network: 'Viator'
    },
    'getyourguide': {
      param: 'partner_id',
      id: 'Y5ZZCAJ',                         // GetYourGuide — LIVE (8% commission)
      network: 'GetYourGuide'
    },
    'expedia': {
      param: 'afflid',
      id: 'ahmet_can_yesildag',              // Expedia Travel Creator — LIVE
      network: 'Expedia Travel Creator (CA)'
    },
    'expedia-hotels': {
      param: 'afflid',
      id: 'ahmet_can_yesildag',              // Expedia Hotels — LIVE
      network: 'Expedia Travel Creator (CA)'
    },
    'expedia-packages': {
      param: 'afflid',
      id: 'ahmet_can_yesildag',              // Expedia Packages — LIVE
      network: 'Expedia Travel Creator (CA)'
    },

    // ── Wellness Products ─────────────────────────────────────────────────
    'oura': {
      param: 'ref',
      id: 'PLACEHOLDER_OURA_REF',           // Oura affiliate ref code
      network: 'Oura Ring'
    },

    // ── Travel Gear ───────────────────────────────────────────────────────
    'away': {
      param: 'irclickid',
      id: 'PLACEHOLDER_AWAY_IRCLICKID',     // Impact.com click ID for Away
      network: 'Away Luggage'
    },

    // ── Education & Professional Development ──────────────────────────────
    'coursera': {
      param: 'siteID',                      // CJ/Impact affiliate site ID
      id: 'PLACEHOLDER_COURSERA_SITEID',
      network: 'Coursera (Impact.com)'
    },
    'emeritus': {
      param: 'utm_source',
      id: 'PLACEHOLDER_EMERITUS_PARTNER',   // Provided by Emeritus partner portal
      network: 'Emeritus Executive Education'
    },
    'masterclass': {
      param: 'utm_source',
      id: 'PLACEHOLDER_MASTERCLASS_PARTNER',
      network: 'MasterClass'
    },

    // ── Luxury & Aspirational ─────────────────────────────────────────────
    'villiers': {
      param: 'ref',
      id: 'PLACEHOLDER_VILLIERS_REF',
      network: 'Villiers Jets'
    },
    'sandals': {
      param: 'refid',
      id: 'PLACEHOLDER_SANDALS_REFID',
      network: 'Sandals Resorts'
    },
    'plumguide': {
      param: 'ref',
      id: 'PLACEHOLDER_PLUMGUIDE_REF',
      network: 'Plum Guide'
    }
  };

  // Global UTM parameters — always appended for GA4 attribution
  var GLOBAL_UTM = {
    utm_source:  'ahmetcanyesildag.com',
    utm_medium:  'affiliate'
    // utm_content is set dynamically from the link's text (see rewriteHref)
    // utm_campaign is set to the affiliate key
  };

  // Session key prefix for impression deduplication
  var SESSION_PREFIX = 'aff_imp_';

  // ─────────────────────────────────────────────────────────────────────────
  // URL rewriter — injects affiliate param + UTM params
  // ─────────────────────────────────────────────────────────────────────────
  function rewriteHref(originalHref, key, linkText) {
    var cfg = AFFILIATE_CONFIG[key];
    if (!cfg) return originalHref;

    var url;
    try { url = new URL(originalHref); }
    catch (e) { return originalHref; }

    // Only inject real affiliate ID when it's not still a placeholder
    if (cfg.id && cfg.id.indexOf('PLACEHOLDER_') !== 0) {
      url.searchParams.set(cfg.param, cfg.id);
    }

    // Always add UTM params (even with placeholders — GA4 sees outbound traffic from day one)
    url.searchParams.set('utm_source',   GLOBAL_UTM.utm_source);
    url.searchParams.set('utm_medium',   GLOBAL_UTM.utm_medium);
    url.searchParams.set('utm_campaign', key);

    // utm_content = truncated CTA text for A/B analysis (e.g. "Search Hotels" vs "Book Now")
    if (linkText) {
      var content = linkText.replace(/[→↗]/g, '').trim().slice(0, 40).toLowerCase().replace(/\s+/g, '_');
      if (content) url.searchParams.set('utm_content', content);
    }

    return url.toString();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Safe sessionStorage wrapper (no throw in private browsing)
  // ─────────────────────────────────────────────────────────────────────────
  function ssGet(k) {
    try { return sessionStorage.getItem(k); } catch (e) { return null; }
  }
  function ssSet(k, v) {
    try { sessionStorage.setItem(k, v); } catch (e) { /* silent */ }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Impression tracking — fires once per affiliate key per session when the
  // containing card scrolls into the viewport (requires IntersectionObserver)
  // ─────────────────────────────────────────────────────────────────────────
  function observeImpressions(links) {
    if (typeof IntersectionObserver === 'undefined') return;

    var observedCards = {};

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var key = entry.target.getAttribute('data-aff-observe');
        if (!key || ssGet(SESSION_PREFIX + key)) return;

        ssSet(SESSION_PREFIX + key, '1');

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_impression', {
            affiliate_key:     key,
            affiliate_network: (AFFILIATE_CONFIG[key] || {}).network || 'unknown',
            page_path:         window.location.pathname
          });
        }

        io.unobserve(entry.target); // one impression per session is enough
      });
    }, { threshold: 0.5 });

    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var key = a.getAttribute('data-affiliate');
      if (!key || observedCards[key]) continue;
      observedCards[key] = true;
      // Walk up to find the nearest card container to observe a meaningful area
      var card = a.closest('.tk-card, .book-card, .article-card') || a.parentElement;
      card.setAttribute('data-aff-observe', key);
      io.observe(card);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Main init
  // ─────────────────────────────────────────────────────────────────────────
  function init() {
    var links = document.querySelectorAll('a[data-affiliate]');
    if (!links.length) return;

    for (var i = 0; i < links.length; i++) {
      (function (a) {
        var key     = a.getAttribute('data-affiliate');
        var original = a.getAttribute('href');
        if (!original || original === '#') return;

        var linkText = (a.innerText || a.textContent || '').trim();
        var rewritten = rewriteHref(original, key, linkText);
        a.setAttribute('href', rewritten);

        // Enforce correct rel + target on every affiliate link
        if (a.getAttribute('target') !== '_blank') a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'sponsored noopener noreferrer');

        // Click event → GA4 + Meta Pixel
        a.addEventListener('click', function () {
          var cfg = AFFILIATE_CONFIG[key] || {};

          if (typeof window.gtag === 'function') {
            window.gtag('event', 'affiliate_click', {
              affiliate_key:     key,
              affiliate_network: cfg.network || 'unknown',
              link_url:          a.href,
              link_text:         linkText.slice(0, 80),
              page_path:         window.location.pathname
            });
          }

          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'AffiliateClick', {
              network:  cfg.network || 'unknown',
              key:      key,
              page:     window.location.pathname
            });
          }
        }, { passive: true });

      })(links[i]);
    }

    // Start impression tracking after links are wired up
    observeImpressions(links);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
