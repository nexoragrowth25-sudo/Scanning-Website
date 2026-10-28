/**
 * Sunrise Metrology Solutions Pvt. Ltd.
 * Authentic Google Maps Widget Controller
 * Pure, high-performance interactive map featuring Pune (HQ) & Bengaluru (Regional Hub).
 * Replicates Google Maps aesthetic: floating info card, red teardrop pin with label,
 * satellite/roadmap toggle, and direct Google directions.
 */

(function () {
  'use strict';

  // Core Location Metadata (Short & Sweet)
  var LOCATIONS = {
    pune: {
      key: 'pune',
      name: 'SUNRISE METROLOGY',
      shortSub: 'Pimpri-Chinchwad / Chakan, Pune',
      ratingNum: '4.9',
      ratingCount: '(184)',
      lat: 18.5204,
      lng: 73.8567,
      zoom: 12,
      label: 'SUNRISE METROLOGY (PUNE)',
      openUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology+Pune',
      dirUrl: 'https://www.google.com/maps/dir/?api=1&destination=18.5204,73.8567'
    },
    bangalore: {
      key: 'bangalore',
      name: 'SUNRISE METROLOGY',
      shortSub: 'Peenya / Whitefield, Bengaluru',
      ratingNum: '4.9',
      ratingCount: '(142)',
      lat: 12.9716,
      lng: 77.5946,
      zoom: 12,
      label: 'SUNRISE METROLOGY (BLR)',
      openUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology+Bengaluru',
      dirUrl: 'https://www.google.com/maps/dir/?api=1&destination=12.9716,77.5946'
    },
    both: {
      key: 'both',
      name: 'SUNRISE METROLOGY',
      shortSub: 'Pune (HQ) & Bengaluru (Regional Hub)',
      ratingNum: '4.9',
      ratingCount: '(326)',
      center: [15.65, 75.8],
      zoom: 6,
      label: 'SUNRISE METROLOGY',
      openUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology',
      dirUrl: 'https://www.google.com/maps/search/?api=1&query=Sunrise+Metrology'
    }
  };

  // Google Maps Tile URLs
  var TILE_ROADMAP = 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  var TILE_SATELLITE = 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
  var TILE_OSM_FALLBACK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Create Authentic Red Google Marker with text label beside it
  function createGooglePinIcon(labelText) {
    if (typeof L === 'undefined') return null;
    return L.divIcon({
      className: 'gmaps-marker-pin-wrapper',
      html: '<div class="gmaps-pin-flex">' +
              '<div class="gmaps-pin-teardrop">' +
                '<svg viewBox="0 0 27 43" width="27" height="43">' +
                  '<path fill="#EA4335" d="M13.5 0C6.04 0 0 6.04 0 13.5C0 23.63 13.5 43 13.5 43S27 23.63 27 13.5C27 6.04 20.96 0 13.5 0Z"/>' +
                  '<circle fill="#B31412" cx="13.5" cy="13.5" r="5.5"/>' +
                  '<circle fill="#FFFFFF" cx="13.5" cy="13.5" r="4.2"/>' +
                '</svg>' +
              '</div>' +
              '<div class="gmaps-pin-text-label">' + (labelText || 'SUNRISE METROLOGY') + '</div>' +
            '</div>',
      iconSize: [220, 43],
      iconAnchor: [13.5, 43],
      popupAnchor: [0, -42]
    });
  }

  // Helper to create tile layer
  function createTileLayer(url) {
    return L.tileLayer(url, {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20,
      attribution: 'Google Maps'
    });
  }

  // =========================================================================
  // 1. CONTACT MAIN GOOGLE MAP
  // =========================================================================
  function initContactMainMap() {
    var mapEl = document.getElementById('contact-main-map');
    if (!mapEl || typeof L === 'undefined') return;

    var roadmapLayer = createTileLayer(TILE_ROADMAP);
    var satelliteLayer = createTileLayer(TILE_SATELLITE);

    var map = L.map('contact-main-map', {
      center: [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      zoom: LOCATIONS.pune.zoom,
      scrollWheelZoom: false,
      zoomControl: false
    });

    // Add zoom control at bottom-right (Google Maps style)
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial layer
    roadmapLayer.addTo(map);
    var currentMode = 'roadmap';

    // Add Red Google Pins
    var puneMarker = L.marker([LOCATIONS.pune.lat, LOCATIONS.pune.lng], {
      icon: createGooglePinIcon('SUNRISE METROLOGY (PUNE)')
    }).addTo(map);

    var blrMarker = L.marker([LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng], {
      icon: createGooglePinIcon('SUNRISE METROLOGY (BENGALURU)')
    }).addTo(map);

    // Bounds for framing both cities
    var bothBounds = L.latLngBounds([
      [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      [LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng]
    ]);

    // Update Floating Info Card
    function updateCard(cityKey) {
      var data = LOCATIONS[cityKey] || LOCATIONS.pune;
      var titleEl = document.getElementById('contact-card-title');
      var subEl = document.getElementById('contact-card-sub');
      var countEl = document.getElementById('contact-card-count');
      var openEl = document.getElementById('contact-card-open');
      var dirEl = document.getElementById('contact-card-dir');

      if (titleEl) titleEl.textContent = data.name;
      if (subEl) subEl.textContent = data.shortSub;
      if (countEl) countEl.textContent = data.ratingCount;
      if (openEl) openEl.href = data.openUrl;
      if (dirEl) dirEl.href = data.dirUrl;

      // Update City Selector Tabs
      var tabs = document.querySelectorAll('[data-gmap-city]');
      tabs.forEach(function (tab) {
        if (tab.getAttribute('data-gmap-city') === cityKey) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }

    // Set City on Map
    function selectCity(cityKey) {
      updateCard(cityKey);

      if (cityKey === 'both') {
        map.fitBounds(bothBounds, { padding: [60, 60], maxZoom: 7 });
      } else if (LOCATIONS[cityKey]) {
        var loc = LOCATIONS[cityKey];
        map.flyTo([loc.lat, loc.lng], loc.zoom, { duration: 1 });
      }
    }

    // Tab Clicks
    var tabs = document.querySelectorAll('[data-gmap-city]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-gmap-city');
        selectCity(key);
      });
    });

    // Marker Clicks
    puneMarker.on('click', function () {
      selectCity('pune');
    });

    blrMarker.on('click', function () {
      selectCity('bangalore');
    });

    // Layer Toggle (Roadmap <-> Satellite)
    var toggleBtn = document.getElementById('contact-layer-toggle');
    var toggleImg = document.getElementById('contact-layer-img');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (currentMode === 'roadmap') {
          map.removeLayer(roadmapLayer);
          satelliteLayer.addTo(map);
          currentMode = 'satellite';
          if (toggleImg) toggleImg.src = 'images/gmaps-roadmap-thumb.png';
          toggleBtn.title = 'Switch to Map View';
        } else {
          map.removeLayer(satelliteLayer);
          roadmapLayer.addTo(map);
          currentMode = 'roadmap';
          if (toggleImg) toggleImg.src = 'images/gmaps-satellite-thumb.jpg';
          toggleBtn.title = 'Switch to Satellite View';
        }
      });
    }

    // Fullscreen Toggle
    var fsBtn = document.getElementById('contact-gmaps-fullscreen');
    var stageEl = document.getElementById('gmaps-stage-contact');
    if (fsBtn && stageEl) {
      fsBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
          if (stageEl.requestFullscreen) stageEl.requestFullscreen();
          else if (stageEl.webkitRequestFullscreen) stageEl.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
      });
    }

    window.addEventListener('resize', function () {
      map.invalidateSize();
    });

    // Initialize Card with default 'pune'
    updateCard('pune');
  }

  // =========================================================================
  // 2. ABOUT PAGE GOOGLE MAP
  // =========================================================================
  function initAboutMap() {
    var aboutMapEl = document.getElementById('about-map-view');
    if (!aboutMapEl || typeof L === 'undefined') return;

    var roadmapLayer = createTileLayer(TILE_ROADMAP);
    var satelliteLayer = createTileLayer(TILE_SATELLITE);

    var aboutMap = L.map('about-map-view', {
      center: [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      zoom: LOCATIONS.pune.zoom,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(aboutMap);
    roadmapLayer.addTo(aboutMap);
    var currentMode = 'roadmap';

    var pMarker = L.marker([LOCATIONS.pune.lat, LOCATIONS.pune.lng], {
      icon: createGooglePinIcon('SUNRISE METROLOGY (PUNE)')
    }).addTo(aboutMap);

    var bMarker = L.marker([LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng], {
      icon: createGooglePinIcon('SUNRISE METROLOGY (BLR)')
    }).addTo(aboutMap);

    var bothBounds = L.latLngBounds([
      [LOCATIONS.pune.lat, LOCATIONS.pune.lng],
      [LOCATIONS.bangalore.lat, LOCATIONS.bangalore.lng]
    ]);

    function updateAboutCard(cityKey) {
      var data = LOCATIONS[cityKey] || LOCATIONS.pune;
      var titleEl = document.getElementById('about-card-title');
      var subEl = document.getElementById('about-card-sub');
      var countEl = document.getElementById('about-card-count');
      var openEl = document.getElementById('about-card-open');
      var dirEl = document.getElementById('about-card-dir');

      if (titleEl) titleEl.textContent = data.name;
      if (subEl) subEl.textContent = data.shortSub;
      if (countEl) countEl.textContent = data.ratingCount;
      if (openEl) openEl.href = data.openUrl;
      if (dirEl) dirEl.href = data.dirUrl;

      var btns = document.querySelectorAll('[data-about-city]');
      btns.forEach(function (btn) {
        if (btn.getAttribute('data-about-city') === cityKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    function selectAboutCity(cityKey) {
      updateAboutCard(cityKey);

      if (cityKey === 'both') {
        aboutMap.fitBounds(bothBounds, { padding: [40, 40], maxZoom: 7 });
      } else if (LOCATIONS[cityKey]) {
        var loc = LOCATIONS[cityKey];
        aboutMap.flyTo([loc.lat, loc.lng], loc.zoom, { duration: 1 });
      }
    }

    var aboutBtns = document.querySelectorAll('[data-about-city]');
    aboutBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-about-city');
        selectAboutCity(key);
      });
    });

    pMarker.on('click', function () {
      selectAboutCity('pune');
    });

    bMarker.on('click', function () {
      selectAboutCity('bangalore');
    });

    var toggleBtn = document.getElementById('about-layer-toggle');
    var toggleImg = document.getElementById('about-layer-img');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (currentMode === 'roadmap') {
          aboutMap.removeLayer(roadmapLayer);
          satelliteLayer.addTo(aboutMap);
          currentMode = 'satellite';
          if (toggleImg) toggleImg.src = 'images/gmaps-roadmap-thumb.png';
          toggleBtn.title = 'Switch to Map View';
        } else {
          aboutMap.removeLayer(satelliteLayer);
          roadmapLayer.addTo(aboutMap);
          currentMode = 'roadmap';
          if (toggleImg) toggleImg.src = 'images/gmaps-satellite-thumb.jpg';
          toggleBtn.title = 'Switch to Satellite View';
        }
      });
    }

    window.addEventListener('resize', function () {
      aboutMap.invalidateSize();
    });

    updateAboutCard('pune');
  }

  // Boot on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initContactMainMap();
    initAboutMap();
  });

})();
