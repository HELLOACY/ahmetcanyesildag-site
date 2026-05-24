/*!
 * affiliate.js — ahmetcanyesildag.com
 * Single-source affiliate config + click tracker.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠ P0.11 STATUS — AWAITING REAL IDs (queued 2026-05-23)
 *   Phase 0 Remediation chose Path A (commit real IDs). Until they land, every
 *   key below still uses PLACEHOLDER_*. Effect: links work, GA4 sees the
 *   `affiliate_click` event, but no commission is attributed because the
 *   tracking param is the literal string PLACEHOLDER_*.
 *
 *   TO ACTIVATE — paste real IDs into the two AFFILIATE_CONFIG entries below:
 *     1. amazon / amazon-book .id  →  e.g. 'ahmetcan-20'  (Amazon Associates tag)
 *     2. booking            .id  →  numeric Booking.com partner aid (e.g. '1234567')
 *   The other 9 networks queue as Phase 3 work — leave their PLACEHOLDER_*
 *   values in place until each program approves you.
 *
 *   DevTools console will log every network still using a placeholder ID on
 *   every page load, so the active state is always visible to a debugger.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * HOW IT WORKS
 * 1. Every affiliate link in the HTML carries a data-affiliate="<key>" attribute.
 * 2. On DOMContentLoaded this script rewrites each link's href to include the
 *    correct tracking parameter from AFFILIATE_CONFIG below.
 * 3. On click it fires a GA4 `affiliate_click` event so revenue can be
 *    attributed in Google Analytics.
 *
 * Programs are listed in /AFFILIATE_SETUP.md with signup links.
 */
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIG — replace PLACEHOLDER_* with real IDs after program approval
  // ─────────────────────────────────────────────────────────────────────────
  var AFFILIATE_CONFIG = {
    'amazon-book': {
      param: 'tag',
      id: 'PLACEHOLDER_AMAZON_TAG',         // Amazon Associates tracking ID, e.g. 'ahmetcan-20'
      network: 'Amazon Associates'
    },
    'amazon': {
      param: 'tag',
      id: 'PLACEHOLDER_AMAZON_TAG',
      network: 'Amazon Associates'
    },
    'booking': {
      param: 'aid',
      id: 'PLACEHOLDER_BOOKING_AID',        // Booking.com Partner aid, numeric
      network: 'Booking.com Partner'
    },
    'tripaneer': {
      param: 'aid',
      id: 'PLACEHOLDER_TRIPANEER_AID',      // Tripaneer affiliate ID
      network: 'Tripaneer'
    },
    'coursera': {
      param: 'utm_source',                  // Coursera affiliate attribution
      id: 'PLACEHOLDER_COURSERA_PARTNER',
      network: 'Coursera (Impact.com)'
    },
    'villiers': {
      param: 'ref',
      id: 'PLACEHOLDER_VILLIERS_REF',
      network: 'Villiers Jets'
    },
    'plumguide': {
      param: 'ref',
      id: 'PLACEHOLDER_PLUMGUIDE_REF',
      network: 'Plum Guide'
    },
    'sandals': {
      param: 'refid',
      id: 'PLACEHOLDER_SANDALS_REFID',
      network: 'Sandals Resorts'
    },
    'emeritus': {
      param: 'utm_source',
      id: 'PLACEHOLDER_EMERITUS_PARTNER',
      network: 'Emeritus / Wharton'
    },
    'viator': {
      param: 'pid',
      id: 'PLACEHOLDER_VIATOR_PID',
      network: 'Viator'
    },
    'getyourguide': {
      param: 'partner_id',
      id: 'PLACEHOLDER_GYG_PARTNER',
      network: 'GetYourGuide'
    },
    'expedia': {
      // Expedia Travel Creator Program uses shop URLs as the attribution
      // mechanism (https://expedia.ca/shop/<creator-handle>) — the URL itself
      // is the affiliate link, so no query parameter rewrite is needed. The
      // passthrough flag tells rewriteHref() to leave the href untouched while
      // still wiring up GA4/Meta click tracking and rel="sponsored" enforcement.
      passthrough: true,
      network: 'Expedia Travel Creator'
    },
    'elevenlabs': {
      // ElevenLabs / ElevenReader (PartnerStack) uses a try.elevenlabs.io
      // short-link as the affiliate URL itself (e.g. https://try.elevenlabs.io/<creator-id>).
      // Same pattern as Expedia — the URL is the affiliate link, no query param rewrite needed.
      // Used in the /signals-and-noise colophon to credit the audio edition.
      passthrough: true,
      network: 'ElevenLabs / ElevenReader (PartnerStack)'
    }
  };

  // Global UTM additions (always appended for GA4 attribution)
  var GLOBAL_UTM = {
    utm_source: 'ahmetcanyesildag.com',
    utm_medium: 'affiliate'
  };

  // ─────────────────────────────────────────────────────────────────────────
  // URL rewriter
  // ─────────────────────────────────────────────────────────────────────────
  function rewriteHref(originalHref, key) {
    var cfg = AFFILIATE_CONFIG[key];
    if (!cfg) return originalHref;

    // Passthrough networks (e.g. Expedia Travel Creator) use the original URL
    // as the affiliate link itself — don't rewrite, just track the click.
    if (cfg.passthrough) return originalHref;

    var url;
    try { url = new URL(originalHref); }
    catch (e) { return originalHref; }

    // Only inject real ID if it's not still a placeholder
    if (cfg.id && cfg.id.indexOf('PLACEHOLDER_') !== 0) {
      url.searchParams.set(cfg.param, cfg.id);
    }

    // Always add UTM + campaign tag (even with placeholders) so GA4 sees the
    // outbound traffic source from day one.
    url.searchParams.set('utm_source', GLOBAL_UTM.utm_source);
    url.searchParams.set('utm_medium', GLOBAL_UTM.utm_medium);
    url.searchParams.set('utm_campaign', key);

    return url.toString();
  }

  function init() {
    var links = document.querySelectorAll('a[data-affiliate]');
    var placeholderKeys = [];
    for (var i = 0; i < links.length; i++) {
      (function (a) {
        var key = a.getAttribute('data-affiliate');
        var original = a.getAttribute('href');
        if (!original || original === '#') return;

        var cfg = AFFILIATE_CONFIG[key];
        if (cfg && cfg.id && cfg.id.indexOf('PLACEHOLDER_') === 0) {
          if (placeholderKeys.indexOf(key) === -1) placeholderKeys.push(key);
        }

        var rewritten = rewriteHref(original, key);
        a.setAttribute('href', rewritten);

        // Safety: ensure rel + target are correct on every affiliate link
        if (a.target !== '_blank') a.target = '_blank';
        var rel = (a.getAttribute('rel') || '').toLowerCase();
        if (rel.indexOf('noopener') === -1 || rel.indexOf('noreferrer') === -1 || rel.indexOf('sponsored') === -1) {
          a.setAttribute('rel', 'sponsored noopener noreferrer');
        }

        a.addEventListener('click', function () {
          var cfg = AFFILIATE_CONFIG[key] || {};
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'affiliate_click', {
              affiliate_key: key,
              affiliate_network: cfg.network || 'unknown',
              link_url: a.href,
              link_text: (a.innerText || '').trim().slice(0, 80),
              page_path: window.location.pathname
            });
          }
          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'AffiliateClick', {
              network: cfg.network || 'unknown',
              key: key
            });
          }
        }, { passive: true });
      })(links[i]);
    }

    // Surface unwired networks once per page load so the founder/devs can see
    // at a glance which programs still need real IDs pasted into AFFILIATE_CONFIG.
    if (placeholderKeys.length && typeof console !== 'undefined' && console.info) {
      console.info(
        '[affiliate.js] ' + placeholderKeys.length + ' network(s) still using placeholder IDs: ' +
        placeholderKeys.join(', ') + '. Clicks tracked in GA4 but no commission attributed. ' +
        'Paste real IDs into AFFILIATE_CONFIG in /js/affiliate.js to activate.'
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
