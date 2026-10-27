/**
 * Sunrise Metrology Solutions - Core Website Scripts
 * Responsive Drawer, Sticky Header, Metric Counters, Interactive Tools, Forms & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initBackToTop();
  initMobileDrawer();
  initStickyHeader();
  initCounters();
  initHeroServiceTabs();
  initFinderTool();
  initFaqAccordion();
  initRfqForms();
  initFloatingCallButton();
  initIndustryModal();
  initWhyCarousel();
});

/* 0. Top Scroll Reading Progress Bar */
function initScrollProgress() {
  let bar = document.getElementById('scrollProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    bar.id = 'scrollProgressBar';
    document.body.prepend(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      const scrolled = (scrollTop / scrollHeight) * 100;
      bar.style.width = scrolled + '%';
    }
  }, { passive: true });
}

/* 0b. Scroll Reveal & Coming Alive Observer */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .feature-card, .service-card, .equipment-card, .industry-card, .step-card, .leadership-box, .finder-box, .rfq-box, .table-responsive, .faq-item, .reveal-item, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!targets.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach(target => {
    revealObserver.observe(target);
  });
}

/* 0c. Scroll-to-Top Floating Button */
function initBackToTop() {
  if (document.getElementById('backToTopBtn')) return;

  const btn = document.createElement('button');
  btn.className = 'back-to-top-btn';
  btn.id = 'backToTopBtn';
  btn.title = 'Scroll to top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Hero Full HD Service Tabs Switcher */
function initHeroServiceTabs() {
  const tabBtns = document.querySelectorAll('.hero-service-tab-btn');
  const hdImage = document.getElementById('heroHdImage');
  const titleEl = document.getElementById('hudServiceTitle');
  const subEl = document.getElementById('hudServiceSub');
  const tagEl = document.getElementById('hudServiceTag');

  if (!tabBtns.length || !hdImage) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newImg = btn.getAttribute('data-img');
      const newTitle = btn.getAttribute('data-title');
      const newSub = btn.getAttribute('data-sub');
      const newTag = btn.getAttribute('data-tag');

      // Smooth fade transition
      hdImage.style.opacity = '0.3';
      setTimeout(() => {
        hdImage.src = newImg;
        if (titleEl && newTitle) titleEl.innerText = newTitle;
        if (subEl && newSub) subEl.innerText = newSub;
        if (tagEl && newTag) tagEl.innerText = newTag;
        hdImage.style.opacity = '1';
      }, 150);
    });
  });
}

/* 1. Mobile Drawer Navigation */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerClose');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    toggleBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    toggleBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking internal navigation links
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* 2. Sticky Header Elevation */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 3. Metric Counters with Intersection Observer */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.3 });

  const metricsContainer = document.querySelector('.hero-metrics');
  if (metricsContainer) {
    observer.observe(metricsContainer);
  } else {
    counterElements.forEach(el => animateCounter(el));
  }
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  if (isNaN(target)) return;

  let start = 0;
  const duration = 1500;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * target);

    el.innerText = currentVal + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.innerText = target + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

/* 4. Interactive Metrology Equipment & Tolerance Finder */
function initFinderTool() {
  const form = document.getElementById('metrologyFinderForm');
  const resultBox = document.getElementById('finderResult');
  if (!form || !resultBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const size = document.getElementById('finderSize').value;
    const tolerance = document.getElementById('finderTolerance').value;
    const location = document.getElementById('finderLocation').value;

    let recName = "SIMSCAN GEN2 & FARO Arm";
    let recDesc = "Ideal for medium mechanical components with high-speed surface capture.";
    let recBadge = "High Precision";

    if (size === 'small' || tolerance === '0.01') {
      recName = "AutoScan Inspec2 (Desktop 3D Scanner)";
      recDesc = "Best suited for small intricate parts (<300mm), gears, turbine blades with metrology-grade 0.010 mm accuracy.";
      recBadge = "0.01 mm Micron Accuracy";
    } else if (size === 'large' || size === 'huge') {
      recName = "Leica Laser Tracker (AT960) / FARO Arm";
      recDesc = "Perfect for large-scale jigs, aircraft frames, railway bogies, and power turbines up to 80m.";
      recBadge = "Large Volume Leader";
    } else if (location === 'onsite') {
      recName = "Portable SIMSCAN GEN2 / Wireless NimbleTrack";
      recDesc = "Ultra-portable handheld 3D scanning deployed directly at your facility within 24 hours.";
      recBadge = "Pan-India Onsite Ready";
    }

    resultBox.innerHTML = `
      <div>
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--color-primary-600); font-weight:700;">Recommended Solution:</div>
        <div style="font-family:var(--font-heading); font-size:1.25rem; font-weight:700; color:var(--color-neutral-950); margin:0.25rem 0;">${recName}</div>
        <p style="font-size:0.9rem; color:var(--color-neutral-600); max-width:600px;">${recDesc}</p>
      </div>
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <span style="background:var(--color-secondary-400); color:#000; font-weight:700; font-size:0.8rem; padding:0.35rem 0.75rem; border-radius:999px;">${recBadge}</span>
        <a href="contact.html" class="btn btn-primary btn-sm">Request Feasibility Quote →</a>
      </div>
    `;
    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* 5. FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close others
      faqItems.forEach(other => other.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* 6. Interactive RFQ Forms & Success Modal */
function initRfqForms() {
  const rfqForm = document.getElementById('mainRfqForm');
  if (!rfqForm) return;

  // Pre-fill industry inquiry if referred from Industry Applications
  const urlParams = new URLSearchParams(window.location.search);
  const industryParam = urlParams.get('industry');
  if (industryParam) {
    const descField = document.getElementById('rfqDescription');
    if (descField && !descField.value) {
      const formattedIndustry = industryParam.charAt(0).toUpperCase() + industryParam.slice(1).replace('-', ' ');
      descField.value = `[Inquiry regarding ${formattedIndustry} Sector Metrology Services]: `;
    }
  }

  rfqForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = rfqForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Submitting Details...</span>`;
    }

    // Simulate submission delay
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      showSuccessModal();
      rfqForm.reset();
    }, 800);
  });
}

function showSuccessModal() {
  let modalOverlay = document.getElementById('successModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'successModal';
    modalOverlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">✓</div>
        <h3 style="font-size:1.5rem; margin-bottom:0.75rem;">Request Submitted Successfully!</h3>
        <p style="color:var(--color-neutral-600); font-size:0.95rem; margin-bottom:1.5rem;">
          Thank you for reaching out to <strong>Sunrise Metrology Solutions</strong>. Our senior metrology engineering team will review your specifications and contact you within <strong>2 to 4 business hours</strong>.
        </p>
        <div style="background:var(--color-primary-50); border:1px solid var(--color-primary-200); border-radius:12px; padding:1rem; margin-bottom:1.5rem; font-size:0.875rem;">
          Need immediate assistance? Speak directly with founder Amol Palande:<br>
          <a href="tel:+919975232333" style="font-weight:700; color:var(--color-primary-600); font-size:1.05rem;">+91 9975 232 333</a>
        </div>
        <button class="btn btn-primary" id="closeModalBtn" style="width:100%;">Close Confirmation</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  modalOverlay.classList.add('open');
}

/* 7. Floating Call & WhatsApp Buttons Dock (All Pages) */
function initFloatingCallButton() {
  if (document.getElementById('floatingContactDock')) return;

  const dock = document.createElement('div');
  dock.className = 'floating-contact-dock';
  dock.id = 'floatingContactDock';
  dock.setAttribute('role', 'region');
  dock.setAttribute('aria-label', 'Floating quick contact options');

  dock.innerHTML = `
    <a href="tel:+919975232333" class="floating-dock-btn floating-call-btn" title="Call Sunrise Metrology Directly" aria-label="Call +91 9975 232 333">
      <div class="floating-btn-icon">
        <span class="floating-pulse-ring"></span>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </div>
      <div class="floating-btn-text">
        <span class="floating-btn-sub">Direct Call</span>
        <span class="floating-btn-main">+91 9975 232 333</span>
      </div>
    </a>
    <a href="https://wa.me/919975232333?text=Hello%20Sunrise%20Metrology,%20I%20would%20like%20to%20inquire%20about%20your%203D%20scanning%20and%20inspection%20services." 
       target="_blank" rel="noopener noreferrer" class="floating-dock-btn floating-whatsapp-btn" title="Chat with us on WhatsApp" aria-label="Chat on WhatsApp">
      <div class="floating-btn-icon">
        <span class="floating-pulse-ring" style="border-color:rgba(37,211,102,0.7);"></span>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.82 14.04c-.24.68-1.2 1.26-1.78 1.34-.52.08-1.2.14-3.52-.79-2.97-1.19-4.88-4.22-5.03-4.41-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.19.01.44-.07.69.53.25.6.86 2.1.94 2.25.08.16.14.34.03.55-.1.21-.15.34-.3.51-.15.17-.32.38-.46.51-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.14.08.8-.16 1.48z"/>
        </svg>
      </div>
      <div class="floating-btn-text">
        <span class="floating-btn-sub">Chat Live</span>
        <span class="floating-btn-main">WhatsApp Us</span>
      </div>
    </a>
  `;

  document.body.appendChild(dock);
}

/* 8. Industry Applications Interactive Services Modal */
function initIndustryModal() {
  const cards = document.querySelectorAll('.industry-card[data-industry]');
  const backdrop = document.getElementById('industryModalBackdrop');
  if (!cards.length || !backdrop) return;

  const modal = document.getElementById('industryModal');
  const closeBtn = document.getElementById('industryModalClose');
  const imgEl = document.getElementById('industryModalImg');
  const tagEl = document.getElementById('industryModalTag');
  const titleEl = document.getElementById('industryModalTitle');
  const descEl = document.getElementById('industryModalDesc');
  const servicesEl = document.getElementById('industryModalServices');
  const equipEl = document.getElementById('industryModalEquipment');
  const delivEl = document.getElementById('industryModalDeliverables');
  const rfqBtn = document.getElementById('industryModalRfqBtn');

  const industryData = {
    'automotive': {
      title: 'Automotive Manufacturing & OEM Suppliers',
      tag: 'Tier-1 & OEM Grade · Sub-20 Micron Accuracy',
      image: 'images/Automobile.png',
      desc: 'Sunrise Metrology delivers rapid 3D inspection, BIW sheet metal analysis, and reverse engineering directly onto stamping plants and automotive assembly floors across India.',
      services: [
        { title: 'BIW & Sheet Metal Verification', desc: 'Full-field surface deviation heatmaps against CAD models to detect springback, warpage, and stamping punch wear.' },
        { title: 'Powertrain & Transmission Castings', desc: 'Precise dimensional analysis of engine blocks, cylinder heads, gear housings, and critical mounting surfaces.' },
        { title: 'First Article (FAI) & PPAP Inspection', desc: 'Comprehensive GD&T measurement reports meeting stringent automotive OEM standards (ISO/TS, VDA).' },
        { title: 'Tooling, Die & Mold Wear Tracking', desc: 'Periodic optical scanning of dies and stamping tools to prevent flash formation and costly stamping defects.' }
      ],
      equipment: ['SIMSCAN 42-Laser Scanner', 'FARO 8-Axis Portable CMM', 'AutoScan-Inspec Automated 3D CMM'],
      deliverables: ['Color Error Heatmap (.pdf)', 'AS-BUILT CAD Model (.stp / .iges)', 'Formal GD&T Dimensional Report', 'Rapid 24h Onsite Mobilization'],
      rfqParam: 'Automotive 3D Scanning & CMM Inspection'
    },
    'aerospace': {
      title: 'Aerospace & Aviation Engineering',
      tag: 'AS9100 Standard Tolerances · 0.010mm Precision',
      image: 'images/Aerospace.png',
      desc: 'Serving aerospace prime contractors and aviation suppliers with ultra-high precision portable coordinate measurement, laser tracking, and airfoil blade verification.',
      services: [
        { title: 'Large Airframe & Jig Laser Tracking', desc: 'Sub-millimeter volumetric coordinate verification for aircraft assembly fixtures, wing ribs, and fuselage structures up to 80 meters.' },
        { title: 'Turbine Blade & Airfoil Profiling', desc: 'High-density micro-resolution scanning of turbine blades, blisks, and engine impellers to verify leading/trailing edge tolerances.' },
        { title: 'Nacelle & Composite Part Inspection', desc: 'Contact-free optical measurement of composite skin panels and fairings without part deformation.' },
        { title: 'Tooling Fixture Recalibration', desc: 'Periodic spatial calibration of production jigs to maintain aircraft assembly accuracy.' }
      ],
      equipment: ['Leica Absolute Laser Tracker AT960', 'SIMSCAN 0.020mm Handheld 3D Scanner', 'Metrology Software Suite'],
      deliverables: ['Sub-Millimeter Jig Alignment Data', 'Turbine Airfoil Deviation Analysis', 'AS9100-Compliant Inspection Logs', 'Full 3D Point Cloud'],
      rfqParam: 'Aerospace Laser Tracker & Precision Inspection'
    },
    'heavy-engineering': {
      title: 'Heavy Engineering & Industrial Plant Machinery',
      tag: 'Large-Volume Inspection · Up to 80m Measurement Envelope',
      image: 'images/HeavyEngineering.png',
      desc: 'Deploying ruggedized portable metrology fleets directly to fabrication bays, foundries, and steel processing plants to inspect oversized fabrications with zero plant downtime.',
      services: [
        { title: 'Large Fabrications & Welded Assemblies', desc: 'Verifying overall envelope dimensions, diagonal squareness, bore concentricity, and thermal distortion on massive welded structures.' },
        { title: 'Heavy Gearbox & Drive Housing Verification', desc: 'Inspecting bearing seats, centerline parallelism, and backlash geometry for mining and marine gearboxes.' },
        { title: 'Flange Flatness & Shaft Coaxiality', desc: 'Precision laser tracker measurement of giant pressure vessel flanges, agitator shafts, and turbine mounts.' },
        { title: 'Onsite Legacy Reverse Engineering', desc: 'Generating precise 3D parametric CAD from worn or obsolete industrial machinery parts for casting replacement.' }
      ],
      equipment: ['Portable Laser Tracker (up to 80m volume)', 'Handheld Blue Laser 3D Scanners', 'Granite Metrology Arms'],
      deliverables: ['Geometric Alignment Reports', 'Bore & Flange Flatness Maps', 'Parametric SolidWorks/STEP 3D CAD', 'Onsite Real-time Measurement'],
      rfqParam: 'Heavy Engineering Large-Volume Laser Tracker Inspection'
    },
    'railway': {
      title: 'Railway, Rolling Stock & Metro Infrastructure',
      tag: 'RDSO Benchmarks · Critical Rolling Stock Integrity',
      image: 'images/Railway.png',
      desc: 'Supporting Indian Railways, metro rail corporations, and rolling stock manufacturers with certified 3D dimensional verification and reverse engineering of critical rolling components.',
      services: [
        { title: 'Bogie Frame Geometry & Alignment', desc: 'Full 3D scanning of bogie fabrication to verify axle parallelisms, center pivot alignment, and spring seat heights.' },
        { title: 'Wheelset & Brake Disc Wear Mapping', desc: 'High-accuracy surface contour scanning to quantify wheel flange wear, rim thinning, and brake rotor runout.' },
        { title: 'Underframe & Coach Shell Inspection', desc: 'Laser tracker alignment of crashworthiness structures, coupler mounts, and passenger coach underframes.' },
        { title: 'Obsolete Coach Part Reverse Engineering', desc: 'Rapid 3D digitizing of legacy locomotive components to generate modern CAD files for indigenous manufacturing (Make in India).' }
      ],
      equipment: ['High-Accuracy Handheld 3D Laser Scanners', 'Laser Trackers for Long Rail Benches', 'Optical Photogrammetry'],
      deliverables: ['Wheel Profile Wear Deviation Reports', 'Bogie Frame Geometric Certificates', '3D STEP Models for Indigenous Sourcing', 'Structural Warpage Heatmaps'],
      rfqParam: 'Railway & Rolling Stock Metrology Verification'
    },
    'defence': {
      title: 'Defence & Tactical Systems Manufacturing',
      tag: 'Strict Mutual NDA · High-Security Encrypted Verification',
      image: 'images/Defense.png',
      desc: 'Operating under stringent Non-Disclosure Agreements (NDAs) to inspect and reverse-engineer mission-critical hardware for armed forces, naval yards, and defense suppliers.',
      services: [
        { title: 'Armored Vehicle Hull & Turret Inspection', desc: 'Verifying ballistic weld joints, turret ring concentricity, and suspension mounting geometries.' },
        { title: 'Weapon Mounts & Precision Launchers', desc: 'High-tolerance GD&T verification of elevating mechanisms, missile cannisters, and stabilization brackets.' },
        { title: 'Naval Propulsion & Rudder Assemblies', desc: 'Laser tracker alignment of propeller shafts, rudder bearings, and submarine hull penetration sleeves.' },
        { title: 'Secure Reverse Engineering of Legacy Spares', desc: 'Encrypted CAD recreation for critical legacy defense systems with zero external data sharing.' }
      ],
      equipment: ['Calibrated Blue Laser Scanners (ISO 10360 standard)', 'Leica Absolute Laser Tracker', 'NDAs & Secure Data Handling'],
      deliverables: ['Classified Component Inspection Certs', 'Native CAD Files (SolidWorks, CATIA, STEP)', 'Point Cloud Verification Maps', 'Strict Non-Disclosure Compliance'],
      rfqParam: 'Defence & Naval Systems Precision Metrology'
    },
    'energy-power': {
      title: 'Energy, Power Generation & Renewables',
      tag: 'Turbines & Impellers · In-Situ Outage Support',
      image: 'images/EnergyPower.png',
      desc: 'Minimizing costly power plant downtime through rapid deployment of portable 3D scanners to inspect turbine runners, generator shafts, and wind turbine components.',
      services: [
        { title: 'Hydro Turbine Runner & Cavitation Analysis', desc: 'Quantifying blade erosion, cavitation pitting volume, and weld refurbishment contours on Francis and Kaplan turbines.' },
        { title: 'Gas & Steam Turbine Diaphragm Inspection', desc: 'Checking nozzle ring concentricity, stator blade clearances, and casing alignment during scheduled overhauls.' },
        { title: 'Wind Turbine Blade & Hub Measurement', desc: 'Large-scale optical scanning of wind turbine root rings, hub pitch mechanisms, and aerodynamic blade contours.' },
        { title: 'Nuclear & Thermal Piping Flange Verification', desc: 'Laser tracker alignment of high-pressure steam headers, pipe spooling, and pump bases.' }
      ],
      equipment: ['Portable 3D Laser Trackers (up to 80m)', 'High-Density 3D Laser Scanners', 'Metrology Software'],
      deliverables: ['Cavitation & Material Loss Volume Calculations', 'Casing Alignment Verification Reports', 'CAD-to-Part Deviation Reports', 'Rapid Turnaround Inspection Reports'],
      rfqParam: 'Power Generation & Turbine Metrology'
    }
  };

  function openIndustryModal(key) {
    const data = industryData[key];
    if (!data) return;

    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    // Populate services
    if (servicesEl) {
      servicesEl.innerHTML = data.services.map(s => `
        <div class="industry-service-box">
          <div class="industry-service-box-title">${s.title}</div>
          <p class="industry-service-box-desc">${s.desc}</p>
        </div>
      `).join('');
    }

    // Populate equipment tags
    if (equipEl) {
      equipEl.innerHTML = data.equipment.map(eq => `
        <span class="industry-spec-tag">${eq}</span>
      `).join('');
    }

    // Populate deliverables tags
    if (delivEl) {
      delivEl.innerHTML = data.deliverables.map(del => `
        <span class="industry-spec-tag">${del}</span>
      `).join('');
    }

    // Update RFQ button href
    if (rfqBtn) {
      rfqBtn.href = `contact.html?industry=${encodeURIComponent(key)}#rfq-section`;
      rfqBtn.innerHTML = `<span>Request ${key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')} RFQ</span> <span style="font-size:1.1rem; line-height:1;">↗</span>`;
    }

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeIndustryModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach card click & keyboard handlers
  cards.forEach(card => {
    const industryKey = card.getAttribute('data-industry');
    card.addEventListener('click', () => openIndustryModal(industryKey));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openIndustryModal(industryKey);
      }
    });
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeIndustryModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeIndustryModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeIndustryModal();
    }
  });
}

/* 9. Why Sunrise Metrology - Single Line Infinite Auto & Manual Rotating Carousel */
function initWhyCarousel() {
  const container = document.getElementById('whyCarouselContainer');
  const track = document.getElementById('whyCarouselTrack');
  const prevBtn = document.getElementById('whyPrevBtn');
  const nextBtn = document.getElementById('whyNextBtn');

  if (!container || !track) return;

  const originalCards = Array.from(track.querySelectorAll('.why-card'));
  if (originalCards.length === 0) return;

  // Clone cards twice so we have 3 identical sets for a seamless infinite loop
  originalCards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
  originalCards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let scrollPos = 0;
  const autoSpeed = 0.85; // Pixels per frame (~50px/sec, smooth right-to-left rotation)
  let isPaused = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let resumeTimer = null;

  // Calculate the width of one single set of cards + gap
  function getSingleSetWidth() {
    let width = 0;
    const gap = 24; // 1.5rem
    for (let i = 0; i < originalCards.length; i++) {
      width += originalCards[i].offsetWidth + gap;
    }
    return width;
  }

  function pauseAutoFor(ms) {
    isPaused = true;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isPaused = false;
    }, ms);
  }

  function stepCarousel(direction) {
    const cardWidth = originalCards[0].offsetWidth + 24; // 350 + 24 = 374px
    pauseAutoFor(4000);
    // Smooth step
    const targetDelta = direction * cardWidth;
    let startTime = null;
    const initialPos = scrollPos;
    const duration = 450;

    function animateStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      scrollPos = initialPos + targetDelta * ease;
      wrapScrollPos();
      track.style.transform = `translateX(${-scrollPos}px)`;

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    }
    requestAnimationFrame(animateStep);
  }

  function wrapScrollPos() {
    const singleWidth = getSingleSetWidth();
    if (singleWidth <= 0) return;
    while (scrollPos >= singleWidth) {
      scrollPos -= singleWidth;
    }
    while (scrollPos < 0) {
      scrollPos += singleWidth;
    }
  }

  function animate() {
    if (!isPaused && !isDragging) {
      scrollPos += autoSpeed;
      wrapScrollPos();
      track.style.transform = `translateX(${-scrollPos}px)`;
    }
    requestAnimationFrame(animate);
  }

  // Next & Prev button listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stepCarousel(1); // Rotate to next (moving right to left)
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stepCarousel(-1); // Rotate to previous (moving left to right)
    });
  }

  // Hover pauses auto-rotation
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    if (!isDragging) {
      pauseAutoFor(1000);
    }
  });

  // Mouse Drag interaction
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    isPaused = true;
    dragStartX = e.pageX;
    dragStartScroll = scrollPos;
    track.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.pageX - dragStartX;
    scrollPos = dragStartScroll - deltaX;
    wrapScrollPos();
    track.style.transform = `translateX(${-scrollPos}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      track.style.cursor = 'grab';
      pauseAutoFor(3500);
    }
  });

  // Touch Swipe interaction
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      isPaused = true;
      dragStartX = e.touches[0].pageX;
      dragStartScroll = scrollPos;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].pageX - dragStartX;
    scrollPos = dragStartScroll - deltaX;
    wrapScrollPos();
    track.style.transform = `translateX(${-scrollPos}px)`;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      pauseAutoFor(3500);
    }
  });

  // Keyboard navigation when container focused
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepCarousel(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepCarousel(-1);
    }
  });

  // Start the continuous rotation loop
  requestAnimationFrame(animate);
}


