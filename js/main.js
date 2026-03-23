document.addEventListener("DOMContentLoaded", async () => {
  const $ = (id) => document.getElementById(id);
  const lucideInit = () => { if (window.lucide) window.lucide.createIcons(); };

  // --- PARALLAX & NAVBAR ---
  window.addEventListener("scroll", () => {
    const s = window.pageYOffset;
    const parallaxBgs = document.querySelectorAll(".parallax-bg");
    parallaxBgs.forEach(bg => {
      const speed = 0.3;
      bg.style.transform = `translateY(${s * speed}px)`;
    });
    
    const navbar = $("navbar");
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // --- REVEAL ON SCROLL ---
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("active"); });
  }, { threshold: 0.1 });

  // --- CABIN DATA & SWIPER CAROUSELS ---
  const loadCabins = async () => {
    const grid = $("cabin-grid");
    if (!grid) return;
    try {
      const res = await fetch('./cabins_data.json');
      const cabins = await res.json();
      
      grid.innerHTML = cabins.map(c => {
        const slides = c.images.map(img => `
          <div class="swiper-slide">
            <img src="${img}" alt="${c.title}" />
          </div>
        `).join('');

        return `
          <div class="cabin-card reveal">
            <div class="swiper cabin-swiper" id="swiper-${c.id}">
              <div class="swiper-wrapper">
                ${slides}
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="cabin-details">
              <span class="price">Desde $${Math.round(c.price).toLocaleString()} MXN</span>
              <h3>${c.title}</h3>
              <div class="cabin-actions">
                <a href="https://wa.me/528121912778?text=Hola,%20quisiera%20información%20sobre%20${c.title}" target="_blank" class="btn-primary">RESERVAR</a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      lucideInit();
      document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));
      
      // Initialize Swiper for each card
      cabins.forEach(c => {
        new Swiper(`#swiper-${c.id}`, {
          loop: true,
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
      });
    } catch (e) { console.error("Error loading cabins:", e); }
  };

  // --- CONCIERGE BOT (STABLE & CONVERSATIONAL) ---
  const botMsgs = $("bot-messages");
  const botInput = $("bot-input");
  const sendBtn = $("send-bot-msg");
  const botWindow = $("bot-window");
  const botLauncher = $("bot-launcher");
  const closeBot = $("close-bot");

  let history = [];

  const addMsg = (txt, type) => {
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.innerHTML = txt.replace(/\n/g, '<br>');
    botMsgs.appendChild(div);
    botMsgs.scrollTop = botMsgs.scrollHeight;
    return div;
  };

  const getAIResponse = async (msg) => {
    const loader = addMsg("...", "bot");
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history })
      });
      const text = await res.text();
      loader.innerHTML = text.replace(/\n/g, '<br>');
      history.push({ role: 'user', text: msg }, { role: 'bot', text: text });
    } catch (e) { loader.innerText = "He perdido la conexión. Por favor reintente."; }
  };

  if (botLauncher) botLauncher.onclick = () => botWindow.classList.add("active");
  if (closeBot) closeBot.onclick = () => botWindow.classList.remove("active");
  
  if (sendBtn) {
    sendBtn.onclick = () => {
      const val = botInput.value.trim();
      if (val) { addMsg(val, "user"); botInput.value = ""; getAIResponse(val); }
    };
  }
  if (botInput) {
    botInput.onkeypress = (e) => { if (e.key === 'Enter') sendBtn.click(); };
  }

  // --- CALENDAR ---
  if (window.flatpickr) {
    window.flatpickr("#date-range", { 
      mode: "range", 
      minDate: "today", 
      dateFormat: "d M, Y", 
      locale: "es",
      onOpen: (s, d, inst) => inst.calendarContainer.classList.add("luxury-picker")
    });
  }

  // --- THREE.JS ORB ATMOSPHERE ---
  const initOrb = () => {
    const container = $("hero-visual");
    if (!container || !window.THREE) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth/container.offsetHeight, 0.1, 1000);
    camera.position.z = 25;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const orb = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(12, 1)), 
      new THREE.LineBasicMaterial({ color: 0xe8852b, transparent: true, opacity: 0.15 })
    );
    scene.add(orb);

    const animate = () => {
      orb.rotation.y += 0.005;
      orb.rotation.z += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  };

  // --- INIT ---
  loadCabins();
  initOrb();
  lucideInit();
});
