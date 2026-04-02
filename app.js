gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
lucide.createIcons();

// High Perf Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const xTo = gsap.quickTo(cursor, "x", {duration: 0.3, ease: "power3"}),
      yTo = gsap.quickTo(cursor, "y", {duration: 0.3, ease: "power3"}),
      xdTo = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "none"}),
      ydTo = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "none"});

window.addEventListener("mousemove", e => {
    xTo(e.clientX - 16); yTo(e.clientY - 16);
    xdTo(e.clientX - 3); ydTo(e.clientY - 3);
});

// Store Logic
function openStore() {
    document.getElementById('storeOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    loadPrintfulCatalog();
}
function closeStore() {
    document.getElementById('storeOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

async function loadPrintfulCatalog() {
    const grid = document.getElementById('storeGrid');
    const TOKEN = "PIbaSIJVhpf38gDIWgsxTtuB5N859NWmFpYRpQLG"; 
    grid.innerHTML = '<div class="col-span-full h-40 flex items-center justify-center"><div class="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div></div>';
    try {
        const res = await fetch('https://api.printful.com/store/products', {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const data = await res.json();
        if (data.result) {
            grid.innerHTML = '';
            data.result.forEach((p, idx) => {
                const card = document.createElement('div');
                card.className = 'liquid-glass p-8 rounded-[3rem] opacity-0 translate-y-10 group transition-all';
                card.innerHTML = `
                    <div class="aspect-square bg-white/5 rounded-[2.5rem] overflow-hidden mb-8">
                        <img src="${p.thumbnail_url}" class="w-full h-full object-cover group-hover:scale-110 duration-700">
                    </div>
                    <h4 class="font-display text-4xl uppercase chrome-text mb-4 tracking-widest">${p.name}</h4>
                    <p class="font-tech text-[9px] text-white/30 uppercase tracking-widest mb-10">Sync Product Élite</p>
                    <a href="https://wa.me/521XXXXXXXXXX?text=Orden:%20${p.name}" class="block text-center bg-white text-black py-4 rounded-2xl font-display text-xl">PEDIR AHORA</a>
                `;
                grid.appendChild(card);
                gsap.to(card, { opacity: 1, y: 0, delay: idx * 0.1 });
            });
        }
    } catch (e) {
        grid.innerHTML = '<div class="col-span-full opacity-20 uppercase font-tech text-xs tracking-widest text-center">Sincronización en curso...</div>';
    }
}

// Preloader & Init
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('#loaderBar', { width: '100%', duration: 3.5, ease: 'power2.inOut' })
      .to('#loaderLogo', { opacity: 1, duration: 1.5 }, '-=3.5')
      .to('#preloader', { opacity: 0, pointerEvents: 'none', duration: 1 })
      .to('body', { overflowY: 'auto' })
      .add(initGSAP);
});

function initGSAP() {
    gsap.to('#mainNav', { opacity: 1, y: 0, duration: 1 });
    gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 95%" }, y: 30, opacity: 0, duration: 1 });
    });
    startFOMO();
}

function switchPath(path) {
    const btnA = document.getElementById('btnA'), btnB = document.getElementById('btnB');
    const pathA = document.getElementById('pathA'), pathB = document.getElementById('pathB');
    if(path === 'A') { 
        btnA.classList.add('active'); btnB.classList.remove('active'); 
        pathA.classList.remove('hidden'); pathB.classList.add('hidden');
    } else { 
        btnB.classList.add('active'); btnA.classList.remove('active'); 
        pathB.classList.remove('hidden'); pathA.classList.add('hidden');
    }
}

function scrollToSection(id, btn) {
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power4.out" });
    if(btn) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function startFOMO() {
    const toast = document.getElementById('fomoToast');
    const text = document.getElementById('fomoText');
    const msgs = ['Nuevo Pedido: CDMX', 'Empire Stock: Agotándose', 'Deploy Exitoso: Monterrey'];
    setInterval(() => {
        text.innerText = msgs[Math.floor(Math.random() * msgs.length)];
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 5000);
    }, 15000);
}

// Scrub Logos
setInterval(() => {
    document.querySelectorAll('spline-viewer').forEach(v => {
        if (v.shadowRoot) {
            const l = v.shadowRoot.querySelector('#logo');
            if (l) l.style.display = 'none';
        }
    });
}, 1000);
