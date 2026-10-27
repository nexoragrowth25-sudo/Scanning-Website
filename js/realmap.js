/**
 * Sunrise Metrology Solutions Pvt. Ltd.
 * Simple Real Map Controller (Leaflet.js)
 * Clean, lightweight map focused exclusively on the two operational locations:
 * 1. Pune Head Office & Metrology Lab
 * 2. Bengaluru Regional Support Hub
 */

(function () {
  'use strict';

  // The two core locations requested
  var LOCATIONS = {
    pune: {
      name: 'Pune Head Office & Inspection Lab',
      subtitle: 'Central Metrology Operations & Calibration Center',
      lat: 18.5204,
      lng: 73.8567,
      zoom: 13,
      address: 'Pimpri-Chinchwad / Chakan Industrial Corridor, Pune, Maharashtra 411019',
      hours: 'Mon – Sat: 8:30 AM – 7:30 PM (24/7 Emergency Onsite Dispatch)',
      phone: '+91 9975 232 333',
      email: 'amol.palande@sunrisemetrology.com',
      badge: 'Head Office (Pune)',
      gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology+Pune+Maharashtra'
    },
    bangalore: {
      name: 'Bengaluru Regional Support Hub',
      subtitle: 'Aerospace, Defense & Precision Engineering Hub',
      lat: 12.9716,
      lng: 77.5946,
      zoom: 13,
      address: 'Peenya / Whitefield Aerospace Corridor, Bengaluru, Karnataka 560058',
      hours: 'Mon – Sat: 8:30 AM – 7:00 PM (Aviation Rapid Dispatch)',
      phone: '+91 9975 232 333',
      email: 'amol.palande@sunrisemetrology.com',
      badge: 'Regional Hub (Bengaluru)',
      gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology+Bengaluru+Karnataka'
    }
  };

  // Center coordinate between Pune and Bangalore to show both
  var BOTH_VIEW = {
    lat: 15.65,
    lng: 75.8,
    zoom: 6
  };

  // Custom Pulsing Pin Marker
  function createPulseIcon(color, label) {
    if (typeof L === 'undefined') return null;
    return L.divIcon({
      className: 'custom-pulse-marker',
      html: '<div class="pulse-marker-wrapper">' +
              '<div class="pulse-ring" style="border-color: ' + color + '; background-color: ' + color + '22;"></div>' +
              '<div class="pulse-dot" style="background-color: ' + color + ';">' +
                '<svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>' +
              '</div>' +
              (label ? '<span class="pulse-label">' + label + '</span>' : '') +
            '</div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });
  }

  // Clean Simple Popup Content
  function createPopupContent(loc) {
    return '<div class="map-popup-card">' +
             '<div class="popup-badge">' + loc.badge + '</div>' +
             '<h4 class="popup-title">' + loc.name + '</h4>' +
             '<p class="popup-subtitle">' + loc.subtitle + '</p>' +
             '<p class="popup-address"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ' + loc.address + '</p>' +
             '<p class="popup-hours"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ' + loc.hours + '</p>' +
             '<div class="popup-actions">' +
               '<a href="' + loc.gmapsUrl + '" target="_blank" rel="noopener" class="popup-btn-primary">' +
                 '<span>Open Google Maps</span>' +
                 '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>' +
               '</a>' +
               '<a href="tel:+919975232333" class="popup-btn-secondary">' +
                 '<span>Call +91 9975 232 333</span>' +
               '</a>' +
             '</div>' +
           '</div>';
  }

  // 1. Initialize Contact Main Map (Simple Regular Default View: Pune & Bengaluru)
  function initContactMainMap() {
    var mapEl = document.getElementById('contact-main-map');
    if (!mapEl || typeof L === 'undefined') return;

    var bothBounds = L.latLngBounds([
      [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      [LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng]
    ]);

    var map = L.map('contact-main-map', {
      center: [BOTH_VIEW.lat, BOTH_VIEW.lng],
      zoom: BOTH_VIEW.zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Marker 1: Pune
    var puneMarker = L.marker([LOCATIONS.pune.lat, LOCATIONS.pune.lng], {
      icon: createPulseIcon('#1c8cc4', 'Pune HQ')
    }).addTo(map);
    puneMarker.bindPopup(createPopupContent(LOCATIONS.pune));

    // Marker 2: Bangalore
    var bangaloreMarker = L.marker([LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng], {
      icon: createPulseIcon('#fe6911', 'Bengaluru Hub')
    }).addTo(map);
    bangaloreMarker.bindPopup(createPopupContent(LOCATIONS.bangalore));

    // Default regular view: Frame both Pune and Bengaluru cleanly
    map.fitBounds(bothBounds, { padding: [50, 50], maxZoom: 7 });

    // 2-City Switcher + Both Button Helper
    function setActiveCity(cityKey) {
      var allTargets = document.querySelectorAll('[data-map-city]');
      allTargets.forEach(function (b) {
        if (b.getAttribute('data-map-city') === cityKey) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }

    var cityElements = document.querySelectorAll('[data-map-city]');
    cityElements.forEach(function (el) {
      el.addEventListener('click', function (e) {
        // If clicking a link inside, allow standard link navigation
        if (e.target.closest('a')) return;

        var cityKey = el.getAttribute('data-map-city');
        setActiveCity(cityKey);

        if (cityKey === 'both') {
          map.fitBounds(bothBounds, { padding: [50, 50], maxZoom: 7 });
        } else if (LOCATIONS[cityKey]) {
          var loc = LOCATIONS[cityKey];
          map.flyTo([loc.lat, loc.lng], loc.zoom, { duration: 1 });
          setTimeout(function() {
            if (cityKey === 'pune') puneMarker.openPopup();
            else if (cityKey === 'bangalore') bangaloreMarker.openPopup();
          }, 1050);
        }
      });

      // Keyboard accessible
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
            el.click();
          }
        }
      });
    });

    // Clicking map markers syncs the facility card selection
    puneMarker.on('click', function () {
      setActiveCity('pune');
    });

    bangaloreMarker.on('click', function () {
      setActiveCity('bangalore');
    });

    window.addEventListener('resize', function () {
      map.invalidateSize();
    });
  }

  // 2. Initialize Contact Sidebar Mini Map
  function initContactSidebarMap() {
    var sidebarMapEl = document.getElementById('contact-sidebar-map');
    if (!sidebarMapEl || typeof L === 'undefined') return;

    var miniMap = L.map('contact-sidebar-map', {
      center: [BOTH_VIEW.lat, BOTH_VIEW.lng],
      zoom: BOTH_VIEW.zoom,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(miniMap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OSM'
    }).addTo(miniMap);

    var sPuneMarker = L.marker([LOCATIONS.pune.lat, LOCATIONS.pune.lng], {
      icon: createPulseIcon('#1c8cc4', 'Pune HQ')
    }).addTo(miniMap);
    sPuneMarker.bindPopup(createPopupContent(LOCATIONS.pune));

    var sBlrMarker = L.marker([LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng], {
      icon: createPulseIcon('#fe6911', 'BLR')
    }).addTo(miniMap);
    sBlrMarker.bindPopup(createPopupContent(LOCATIONS.bangalore));

    var miniBounds = L.latLngBounds([
      [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      [LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng]
    ]);
    miniMap.fitBounds(miniBounds, { padding: [30, 30], maxZoom: 6 });

    var sideBtns = document.querySelectorAll('[data-sidebar-city]');
    sideBtns.forEach(function(b) {
      b.addEventListener('click', function() {
        sideBtns.forEach(function(x) { x.classList.remove('active'); });
        b.classList.add('active');
        var cityKey = b.getAttribute('data-sidebar-city');
        if (cityKey === 'both') {
          miniMap.fitBounds(miniBounds, { padding: [30, 30], maxZoom: 6 });
        } else if (LOCATIONS[cityKey]) {
          var loc = LOCATIONS[cityKey];
          miniMap.flyTo([loc.lat, loc.lng], 12, { duration: 0.9 });
          setTimeout(function() {
            if (cityKey === 'pune') sPuneMarker.openPopup();
            else if (cityKey === 'bangalore') sBlrMarker.openPopup();
          }, 950);
        }
      });
    });
  }

  // 3. Initialize About Page Simple Regular Map (Pune and Bangalore)
  function initAboutMap() {
    var aboutMapEl = document.getElementById('about-map-view');
    if (!aboutMapEl || typeof L === 'undefined') return;

    var aboutBounds = L.latLngBounds([
      [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      [LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng]
    ]);

    var aboutMap = L.map('about-map-view', {
      center: [BOTH_VIEW.lat, BOTH_VIEW.lng],
      zoom: BOTH_VIEW.zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(aboutMap);

    var pMarker = L.marker([LOCATIONS.pune.lat, LOCATIONS.pune.lng], {
      icon: createPulseIcon('#1c8cc4', 'Pune HQ')
    }).addTo(aboutMap);
    pMarker.bindPopup(createPopupContent(LOCATIONS.pune));

    var bMarker = L.marker([LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng], {
      icon: createPulseIcon('#fe6911', 'Bengaluru Hub')
    }).addTo(aboutMap);
    bMarker.bindPopup(createPopupContent(LOCATIONS.bangalore));

    // Default regular view: Frame both Pune and Bengaluru cleanly
    aboutMap.fitBounds(aboutBounds, { padding: [40, 40], maxZoom: 7 });

    var aboutBtns = document.querySelectorAll('[data-about-city]');
    aboutBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        aboutBtns.forEach(function(x) { x.classList.remove('active'); });
        btn.classList.add('active');
        var cityKey = btn.getAttribute('data-about-city');
        if (cityKey === 'both') {
          aboutMap.fitBounds(aboutBounds, { padding: [40, 40], maxZoom: 7 });
        } else if (LOCATIONS[cityKey]) {
          var loc = LOCATIONS[cityKey];
          aboutMap.flyTo([loc.lat, loc.lng], loc.zoom, { duration: 1 });
          setTimeout(function() {
            if (cityKey === 'pune') pMarker.openPopup();
            else if (cityKey === 'bangalore') bMarker.openPopup();
          }, 1050);
        }
      });
    });
  }

  // Boot on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initContactMainMap();
    initContactSidebarMap();
    initAboutMap();
  });

})();
