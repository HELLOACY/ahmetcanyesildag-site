(function () {
  // Wait for SDK
  function whenAmplitudeReady(fn, attempts) {
    attempts = attempts || 0;
    if (window.amplitude && typeof window.amplitude.track === 'function') return fn();
    if (attempts > 50) return;
    setTimeout(function () { whenAmplitudeReady(fn, attempts + 1); }, 100);
  }

  function inferInquiryTarget(label) {
    var l = (label || '').toLowerCase();
    if (l.indexOf('consult') !== -1) return 'consultation';
    if (l.indexOf('train') !== -1) return 'training';
    if (l.indexOf('speak') !== -1 || l.indexOf('register') !== -1) return 'speaking';
    if (l.indexOf('express') !== -1 || l.indexOf('plan your journey') !== -1) return 'orophile';
    return 'general';
  }

  whenAmplitudeReady(function () {
    var amp = window.amplitude;

    // --- Inquiry CTA clicks ---
    document.querySelectorAll('a[href*="#contact"]').forEach(function (cta) {
      cta.addEventListener('click', function () {
        var label = (cta.textContent || '').trim();
        var target = inferInquiryTarget(label);
        var section = cta.closest('section');
        sessionStorage.setItem('lastCtaSection', section ? section.id : '');
        sessionStorage.setItem('lastInquiryTarget', target);
        amp.track('inquiry_cta_clicked', {
          cta_label: label,
          cta_target: target,
          section_id: section ? section.id : ''
        });
      });
    });

    // --- Forms: started + submitted ---
    document.querySelectorAll('form').forEach(function (form) {
      var submitBtn = form.querySelector('button[type="submit"], button');
      var submitText = (submitBtn && submitBtn.textContent ? submitBtn.textContent : '').toLowerCase();
      var formType = submitText.indexOf('subscribe') !== -1 ? 'newsletter' : 'contact';
      var started = false;

      form.addEventListener('focusin', function () {
        if (started) return;
        started = true;
        amp.track('inquiry_form_started', { form_type: formType });
      });

      form.addEventListener('submit', function () {
        var emailEl = form.querySelector('input[type="email"]');
        var nameEl = form.querySelector('input[name*="name" i], input[placeholder*="name" i]');
        var email = emailEl && emailEl.value ? emailEl.value.trim().toLowerCase() : '';
        var name = nameEl && nameEl.value ? nameEl.value.trim() : '';
        var inquiryTarget = sessionStorage.getItem('lastInquiryTarget') || 'general';

        if (formType === 'contact' && email) {
          amp.setUserId(email);
          var id = new amp.Identify();
          id.set('email', email);
          if (name) id.set('name', name);
          id.set('inquiry_target', inquiryTarget);
          id.set('latest_inquiry_at', new Date().toISOString());
          id.setOnce('first_inquiry_at', new Date().toISOString());
          id.setOnce('first_referrer', document.referrer || '(direct)');
          amp.identify(id);
          amp.track('inquiry_form_submitted', {
            form_type: 'contact',
            inquiry_target: inquiryTarget,
            referrer_section: sessionStorage.getItem('lastCtaSection') || ''
          });
        } else if (formType === 'newsletter' && email) {
          var section = form.closest('section');
          amp.track('newsletter_subscribed', {
            source_section: section ? section.id : ''
          });
        }
      });
    });

    // --- Document downloads ---
    document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf"]').forEach(function (link) {
      link.addEventListener('click', function () {
        try {
          var u = new URL(link.href);
          amp.track('document_downloaded', {
            document_path: u.pathname,
            document_name: u.pathname.split('/').pop()
          });
        } catch (e) {}
      });
    });

    // --- Affiliate outbound ---
    document.querySelectorAll('a[rel*="sponsored"]').forEach(function (link) {
      link.addEventListener('click', function () {
        try {
          var host = new URL(link.href).hostname.replace(/^www\./, '');
          var section = link.closest('section');
          amp.track('affiliate_outbound_clicked', {
            merchant: host,
            link_text: (link.textContent || '').trim().slice(0, 80),
            source_section: section ? section.id : ''
          });
        } catch (e) {}
      });
    });

    // --- Social follows ---
    var socialMap = {
      'linkedin.com': 'linkedin',
      'youtube.com': 'youtube',
      'youtu.be': 'youtube',
      'instagram.com': 'instagram',
      'facebook.com': 'facebook'
    };
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      try {
        var host = new URL(link.href).hostname.replace(/^www\./, '');
        var platform = socialMap[host];
        if (!platform || host.indexOf('ahmetcanyesildag.com') !== -1) return;
        link.addEventListener('click', function () {
          amp.track('social_followed', {
            platform: platform,
            link_text: (link.textContent || '').trim().slice(0, 60)
          });
        });
      } catch (e) {}
    });

    // --- Orophile (own brand) outbound ---
    document.querySelectorAll('a[href*="orophilejourneys.com"]').forEach(function (link) {
      link.addEventListener('click', function () {
        var section = link.closest('section');
        amp.track('orophile_visited', {
          link_text: (link.textContent || '').trim().slice(0, 60),
          source_section: section ? section.id : ''
        });
      });
    });

    // --- Toolkit item clicks ---
    document.querySelectorAll('.tk-card a').forEach(function (link) {
      link.addEventListener('click', function () {
        var card = link.closest('.tk-card');
        var headingEl = card ? card.querySelector('h3') : null;
        var section = card ? card.closest('section') : null;
        var categoryHeading = section ? section.querySelector('h2, h3') : null;
        amp.track('toolkit_item_clicked', {
          tool_name: headingEl ? headingEl.textContent.trim() : '',
          tool_category: categoryHeading ? categoryHeading.textContent.trim() : '',
          is_affiliate: (link.rel || '').indexOf('sponsored') !== -1
        });
      });
    });

    // --- Article opened + read-complete ---
    if (location.pathname.indexOf('/blog/') === 0) {
      var slug = location.pathname.replace('/blog/', '').replace(/\/$/, '');
      amp.track('article_opened', { article_slug: slug });

      var start = Date.now();
      var fired = false;
      var onScroll = function () {
        if (fired) return;
        var scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrolled >= 0.9) {
          fired = true;
          amp.track('article_read_complete', {
            article_slug: slug,
            time_on_page_seconds: Math.round((Date.now() - start) / 1000)
          });
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // --- Consent state changes ---
    window.addEventListener('CookiebotOnAccept', function () {
      var c = (window.Cookiebot && window.Cookiebot.consent) || {};
      amp.track('consent_granted', {
        categories_accepted: ['necessary', 'preferences', 'statistics', 'marketing'].filter(function (k) { return c[k]; })
      });
    });
    window.addEventListener('CookiebotOnDecline', function () {
      amp.track('consent_revoked', {
        categories_revoked: ['preferences', 'statistics', 'marketing']
      });
    });
  });
})();

