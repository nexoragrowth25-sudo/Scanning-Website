/**
 * Sunrise Metrology Solutions - AI Metrology Chatbot Engine
 * Comprehensive pre-designed Q&A and Natural Language Intent Parser
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inject Chatbot HTML if container exists or create dynamically
  initChatbot();
});

function initChatbot() {
  const chatbotWrapper = document.createElement('div');
  chatbotWrapper.className = 'chatbot-wrapper';
  chatbotWrapper.id = 'sunriseChatbot';

  chatbotWrapper.innerHTML = `
    <!-- Launcher Toggle Button -->
    <div class="chatbot-launcher" id="chatLauncher" role="button" aria-label="Open AI Metrology Assistant">
      <div class="chatbot-launcher-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="12" y1="7" x2="12" y2="13"></line>
        </svg>
        <span class="chat-online-badge"></span>
      </div>
      <div class="chatbot-launcher-text">
        <span class="chatbot-launcher-title">Ask AI Assistant</span>
        <span class="chatbot-launcher-subtitle">3D Metrology & Scanning</span>
      </div>
    </div>

    <!-- Chat Window -->
    <div class="chatbot-window" id="chatWindow" aria-hidden="true">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-brand">
          <div class="chat-avatar">
            <img src="images/favicon.png" alt="Sunrise AI" onerror="this.src='images/logo-primary.svg'">
          </div>
          <div class="chat-header-info">
            <h4>Sunrise AI Assistant</h4>
            <div class="chat-status-text">
              <span class="status-indicator"></span> Metrology Expert • Online
            </div>
          </div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-action-btn" id="chatRefreshBtn" title="Reset Conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          </button>
          <button class="chat-action-btn" id="chatCloseBtn" title="Close Assistant">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Chat Messages Body -->
      <div class="chat-body" id="chatBody">
        <!-- Initial Bot Greeting -->
        <div class="chat-msg chat-msg-bot">
          <div class="msg-bubble">
            <strong>Welcome to Sunrise Metrology Solutions! 👋</strong><br>
            I am your dedicated AI Metrology Consultant. Ask me anything about our <strong>3D Scanning, Laser Tracker, CMM Inspection, or Reverse Engineering</strong> services across Pune, Bangalore & Pan-India.
            <div class="msg-time">Just now</div>
          </div>
        </div>

        <!-- Quick Question Section -->
        <div class="chat-quick-section" id="chatQuickSection">
          <div class="chat-quick-label">⚡ Frequently Asked Questions:</div>
          <div class="chat-pills-list">
            <button class="chat-pill-btn" data-question="accuracy">
              <span>What is your 3D scanning accuracy?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="onsite">
              <span>Do you provide onsite scanning in Pune & Bangalore?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="reverse-engineering">
              <span>What CAD formats do you deliver for Reverse Engineering?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="large-parts">
              <span>Which equipment is best for large parts (> 3 meters)?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="inspection-reports">
              <span>What is included in your GD&T Inspection Reports?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="quote">
              <span>How do I get a quick quotation for my project?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="chat-pill-btn" data-question="confidentiality">
              <span>How is our CAD data and proprietary IP protected?</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="chat-typing" id="chatTyping">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>

      <!-- Footer & Input Form -->
      <div class="chat-footer">
        <form class="chat-input-form" id="chatForm">
          <input type="text" class="chat-input" id="chatInput" placeholder="Ask about equipment, accuracy, pricing..." autocomplete="off">
          <button type="submit" class="chat-send-btn" aria-label="Send Message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <div class="chat-disclaimer">Instant AI answers • Official Sunrise Metrology Knowledge Base</div>
      </div>
    </div>
  `;

  document.body.appendChild(chatbotWrapper);

  // Setup Event Listeners
  const launcher = document.getElementById('chatLauncher');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const refreshBtn = document.getElementById('chatRefreshBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const typingIndicator = document.getElementById('chatTyping');

  launcher.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  refreshBtn.addEventListener('click', () => {
    resetChat();
  });

  // Handle pill button clicks
  document.querySelectorAll('.chat-pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qKey = btn.getAttribute('data-question');
      const questionText = btn.querySelector('span').innerText;
      handleUserQuery(questionText, qKey);
    });
  });

  // Handle form submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    chatInput.value = '';
    handleUserQuery(query);
  });
}

// Metrology Knowledge Base for Accurate Responses
const METROLOGY_KB = {
  accuracy: {
    title: "What is your 3D scanning accuracy?",
    answer: `<strong>Sunrise Metrology provides high-precision metrology-grade accuracy:</strong><br><br>
    • <strong>AutoScan Inspec2 (Desktop):</strong> Up to <strong>0.010 mm (10 microns)</strong> accuracy with automated 3-axis turntable.<br>
    • <strong>SIMSCAN GEN2:</strong> Up to <strong>0.020 mm (20 microns)</strong> accuracy at 5.8 million measurements/sec.<br>
    • <strong>NIMBLETRACK GEN2:</strong> <strong>0.025 mm</strong> wireless optical scanning accuracy.<br>
    • <strong>FARO Arm Quantum:</strong> Up to <strong>0.024 mm</strong> volumetric contact probing & laser scanning.<br>
    • <strong>Leica Laser Tracker:</strong> <strong>15 µm + 6 µm/m</strong> for huge objects up to 80 meters diameter.<br><br>
    All systems are traceable to national/international standards (NABL/ISO).`,
    actions: [
      { text: "View All Equipment Specs", link: "equipment.html" },
      { text: "Request Accuracy Report", link: "contact.html" }
    ]
  },
  onsite: {
    title: "Do you provide onsite scanning in Pune & Bangalore?",
    answer: `<strong>Yes, absolutely!</strong> Sunrise Metrology operates dedicated mobile metrology units across <strong>Pune, Bengaluru, and Pan-India</strong>.<br><br>
    • <strong>Rapid Deployment:</strong> We can mobilize metrology engineers to your plant within 24 hours.<br>
    • <strong>Portable Hardware:</strong> We bring our portable FARO Arms, Leica Laser Trackers, and SIMSCAN 3D scanners directly to your shop floor, assembly line, or field location.<br>
    • <strong>Zero Machine Downtime:</strong> Inspect massive dies, jigs, fixtures, and assemblies without moving them.`,
    actions: [
      { text: "Call for Onsite Booking", link: "tel:+919975232333" },
      { text: "Book Onsite Service", link: "contact.html" }
    ]
  },
  "reverse-engineering": {
    title: "What CAD formats do you deliver for Reverse Engineering?",
    answer: `<strong>We deliver fully parametric and native 3D CAD models:</strong><br><br>
    • <strong>Native CAD:</strong> SolidWorks (.sldprt, .sldasm), CATIA V5 (.CATPart), Siemens NX, Autodesk Inventor.<br>
    • <strong>Universal Neutral Formats:</strong> STEP (.stp), IGES (.igs), Parasolid (.x_t), ACIS (.sat).<br>
    • <strong>Mesh / Polygon:</strong> High-density watertight STL, OBJ, PLY for 3D printing and CFD/FEA simulation.<br>
    • <strong>Drawings:</strong> 2D manufacturing drawings with full GD&T tolerances (.dwg, .dxf, .pdf).<br><br>
    Whether you have a worn-out legacy gear, broken casting, or aftermarket automotive component, we rebuild it with design intent.`,
    actions: [
      { text: "Explore Reverse Engineering", link: "services.html#reverse-engineering" },
      { text: "Upload Sample for CAD Quote", link: "contact.html" }
    ]
  },
  "large-parts": {
    title: "Which equipment is best for large parts (> 3 meters)?",
    answer: `For large parts, heavy machinery, automotive bodies, aircraft sections, or railway rolling stock, we utilize:<br><br>
    1. <strong>Leica Laser Tracker (AT960 series):</strong> Measuring volume up to <strong>80 meters</strong> with sub-millimeter precision, 6DoF probing, and continuous dynamic tracking.<br>
    2. <strong>FARO Arm:</strong> Articulated 2.5m - 4.0m working sphere with laser line probe for deep cavities and complex geometry.<br>
    3. <strong>Photogrammetry & SIMSCAN:</strong> Large field coordinate stitching for seamless point cloud generation.`,
    actions: [
      { text: "View Laser Tracker Details", link: "equipment.html" },
      { text: "Speak to Large-Volume Specialist", link: "tel:+919975232333" }
    ]
  },
  "inspection-reports": {
    title: "What is included in your GD&T Inspection Reports?",
    answer: `<strong>Our inspection reports are customer-friendly, rigorous, and traceable:</strong><br><br>
    • <strong>3D Color Deviation Maps:</strong> Direct CAD-to-Part visual alignment showing exact plus/minus surface deviations.<br>
    • <strong>Full GD&T Verification:</strong> Position, Flatness, Cylindricity, Perpendicularity, Runout, and Profile of a Surface.<br>
    • <strong>Pass/Fail Tolerance Tables:</strong> Clear green/red callouts comparing nominal CAD to actual measured data.<br>
    • <strong>Software Standard:</strong> Generated using industry-benchmark software like <strong>PolyWorks Inspector</strong> and <strong>Geomagic Control X</strong>.`,
    actions: [
      { text: "See Inspection Services", link: "services.html#inspection" },
      { text: "Request Sample PDF Report", link: "contact.html" }
    ]
  },
  quote: {
    title: "How do I get a quick quotation for my project?",
    answer: `Getting a quotation is fast and seamless:<br><br>
    1. <strong>Call Amol Palande directly:</strong> <a href="tel:+919975232333" style="color: #1c8cc4; font-weight:700;">+91 9975 232 333</a><br>
    2. <strong>Email your drawings/photos:</strong> <a href="mailto:amol.palande@sunrisemetrology.com" style="color: #1c8cc4; font-weight:700;">amol.palande@sunrisemetrology.com</a><br>
    3. <strong>Fill our Online RFQ form:</strong> Share part size, material, tolerance, and location for a custom proposal within 2–4 hours.`,
    actions: [
      { text: "Open RFQ Form", link: "contact.html" },
      { text: "Call Now (+91 9975 232 333)", link: "tel:+919975232333" }
    ]
  },
  confidentiality: {
    title: "How is our CAD data and proprietary IP protected?",
    answer: `<strong>Data Security & Confidentiality are our core commitments:</strong><br><br>
    • We routinely sign binding <strong>Non-Disclosure Agreements (NDAs)</strong> before receiving any client CAD files or components.<br>
    • All scan data, reverse-engineered models, and inspection reports are stored in secure, encrypted offline workstations.<br>
    • Sunrise Metrology serves top tier Aerospace, Defence, and Automotive OEMs with zero-leakage security protocols.`,
    actions: [
      { text: "Request Mutual NDA", link: "contact.html" }
    ]
  }
};

// Natural Language Intent Engine
function findBestResponse(userText) {
  const text = userText.toLowerCase().trim();

  // Keyword Matching Matrix
  if (text.includes('accuracy') || text.includes('tolerance') || text.includes('micron') || text.includes('resolution')) {
    return METROLOGY_KB['accuracy'];
  }
  if (text.includes('onsite') || text.includes('pune') || text.includes('bangalore') || text.includes('bengaluru') || text.includes('visit') || text.includes('plant') || text.includes('travel')) {
    return METROLOGY_KB['onsite'];
  }
  if (text.includes('reverse') || text.includes('cad') || text.includes('step') || text.includes('iges') || text.includes('solidworks') || text.includes('stl') || text.includes('3d model') || text.includes('drawing')) {
    return METROLOGY_KB['reverse-engineering'];
  }
  if (text.includes('large') || text.includes('big') || text.includes('tracker') || text.includes('leica') || text.includes('faro') || text.includes('meter')) {
    return METROLOGY_KB['large-parts'];
  }
  if (text.includes('report') || text.includes('gd&t') || text.includes('gdt') || text.includes('deviation') || text.includes('inspection') || text.includes('color map')) {
    return METROLOGY_KB['inspection-reports'];
  }
  if (text.includes('price') || text.includes('cost') || text.includes('quote') || text.includes('quotation') || text.includes('rate') || text.includes('rfq') || text.includes('hire')) {
    return METROLOGY_KB['quote'];
  }
  if (text.includes('nda') || text.includes('security') || text.includes('confidential') || text.includes('privacy') || text.includes('protect')) {
    return METROLOGY_KB['confidentiality'];
  }
  if (text.includes('amol') || text.includes('founder') || text.includes('leader') || text.includes('experience') || text.includes('who are you')) {
    return {
      title: "Leadership & Background",
      answer: `<strong>Sunrise Metrology Solutions</strong> was founded in 2020 by <strong>Mr. Amol Palande</strong>, who brings over <strong>15 years of industry leadership</strong> in advanced metrology, 3D scanning, and quality assurance.<br><br>Under his leadership, Sunrise Metrology has successfully executed 500+ critical projects for automotive, aerospace, railway, defense, and power generation sectors with the motto: <em>"Accuracy That Drives Quality"</em>.`,
      actions: [
        { text: "About Sunrise Metrology", link: "about.html" },
        { text: "Connect with Amol Palande", link: "tel:+919975232333" }
      ]
    };
  }
  if (text.includes('simscan') || text.includes('nimbletrack') || text.includes('autoscan') || text.includes('scanner') || text.includes('equipment')) {
    return {
      title: "Our Equipment Fleet",
      answer: `<strong>We operate world-class, metrology-grade equipment:</strong><br><br>
      • <strong>SIMSCAN GEN2:</strong> 570g ultra-lightweight portable 3D scanner (0.020mm accuracy, 5.8M meas/s).<br>
      • <strong>NIMBLETRACK GEN2:</strong> Wireless optical tracker for in-cabin and targetless scanning.<br>
      • <strong>LEICA LASER TRACKER:</strong> Large volume alignment & inspection up to 80m.<br>
      • <strong>FARO ARMS:</strong> Articulated 6/7 axis arm with high-definition laser line probe.<br>
      • <strong>AUTOSCAN INSPEC2:</strong> Fully automated 0.010mm desktop 3D scanner with 3-axis turntable.`,
      actions: [
        { text: "Explore Equipment Page", link: "equipment.html" },
        { text: "Ask for Equipment Recommendation", link: "contact.html" }
      ]
  };
  }
  if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('number') || text.includes('address') || text.includes('office')) {
    return {
      title: "Sunrise Metrology Contact Details",
      answer: `<strong>Direct Contact Information:</strong><br><br>
      📞 <strong>Phone:</strong> <a href="tel:+919975232333" style="color: #1c8cc4; font-weight:700;">+91 9975 232 333</a><br>
      ✉️ <strong>Email:</strong> <a href="mailto:amol.palande@sunrisemetrology.com" style="color: #1c8cc4; font-weight:700;">amol.palande@sunrisemetrology.com</a><br>
      📍 <strong>Locations:</strong> Pune (HQ) | Bangalore | Pan-India Onsite Deployment<br>
      ⏰ <strong>Operating Hours:</strong> Mon - Sat: 8:30 AM - 7:30 PM (24/7 Emergency Onsite Response)`,
      actions: [
        { text: "Call Now", link: "tel:+919975232333" },
        { text: "View Contact Page", link: "contact.html" }
      ]
    };
  }

  // Fallback intelligent response
  return {
    title: "Thank you for reaching out!",
    answer: `Thank you for your question regarding <em>"${userText}"</em>.<br><br>Sunrise Metrology Solutions specializes in high-precision <strong>3D Scanning, Laser Tracker Inspection, CMM Quality Verification, and Parametric Reverse Engineering</strong>.<br><br>Would you like to speak directly with our senior metrology engineer, request a custom quote, or view our technical hardware specifications?`,
    actions: [
      { text: "Call +91 9975 232 333", link: "tel:+919975232333" },
      { text: "Submit Project RFQ", link: "contact.html" },
      { text: "View Core Services", link: "services.html" }
    ]
  };
}

// User Query Flow Handler
function handleUserQuery(queryText, directKey = null) {
  const chatBody = document.getElementById('chatBody');
  const typingIndicator = document.getElementById('chatTyping');

  // Append user bubble
  appendUserMessage(queryText);

  // Show typing indicator
  typingIndicator.classList.add('show');
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate AI processing delay (350ms - 700ms)
  setTimeout(() => {
    typingIndicator.classList.remove('show');
    let responseObj = null;

    if (directKey && METROLOGY_KB[directKey]) {
      responseObj = METROLOGY_KB[directKey];
    } else {
      responseObj = findBestResponse(queryText);
    }

    appendBotMessage(responseObj);
  }, 450);
}

function appendUserMessage(text) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg chat-msg-user';
  msgDiv.innerHTML = `
    <div class="msg-bubble">
      ${escapeHtml(text)}
      <div class="msg-time">${getTimeString()}</div>
    </div>
  `;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(resp) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg chat-msg-bot';

  let actionsHtml = '';
  if (resp.actions && resp.actions.length > 0) {
    actionsHtml = '<div class="chat-action-links">' + 
      resp.actions.map(act => `<a href="${act.link}" class="chat-action-link">${act.text} →</a>`).join('') +
      '</div>';
  }

  msgDiv.innerHTML = `
    <div class="msg-bubble">
      ${resp.answer}
      ${actionsHtml}
      <div class="msg-time">${getTimeString()}</div>
    </div>
  `;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function resetChat() {
  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML = `
    <div class="chat-msg chat-msg-bot">
      <div class="msg-bubble">
        <strong>Conversation reset! 👋</strong><br>
        How else can I assist you with your 3D scanning, laser tracking, or reverse engineering requirements today?
        <div class="msg-time">${getTimeString()}</div>
      </div>
    </div>
    <div class="chat-quick-section" id="chatQuickSection">
      <div class="chat-quick-label">⚡ Frequently Asked Questions:</div>
      <div class="chat-pills-list">
        <button class="chat-pill-btn" data-question="accuracy">
          <span>What is your 3D scanning accuracy?</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button class="chat-pill-btn" data-question="onsite">
          <span>Do you provide onsite scanning in Pune & Bangalore?</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button class="chat-pill-btn" data-question="reverse-engineering">
          <span>What CAD formats do you deliver for Reverse Engineering?</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button class="chat-pill-btn" data-question="quote">
          <span>How do I get a quick quotation for my project?</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
    <div class="chat-typing" id="chatTyping">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;

  // Re-attach pills listener
  chatBody.querySelectorAll('.chat-pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qKey = btn.getAttribute('data-question');
      const questionText = btn.querySelector('span').innerText;
      handleUserQuery(questionText, qKey);
    });
  });
}

function getTimeString() {
  const d = new Date();
  let hrs = d.getHours();
  let mins = d.getMinutes();
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;
  mins = mins < 10 ? '0' + mins : mins;
  return `${hrs}:${mins} ${ampm}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
