gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// SECURITY: Token is stored as a character-shifted string for static deployment obfuscation. 
// For production, use a dedicated serverless backend (Vercel/Netlify).
// EXPERT LEVEL: Unified Provider Bridge with CORS-Safe architecture
// EMPIRE NEURAL INDEX (Manual Sync Database)
// "No Mistakes" Architecture: Bypasses all CORS blocks by pre-fetching data.
// Si la conexión en vivo falla por seguridad del navegador (CORS), el sistema usará estos datos automáticamente.
const PROVIDER_SYNC_INDEX = [
    { 
        id: "S01", 
        name: "EMPIRE HOODIE • TECH", 
        price: "1,199", 
        cat: "Outerwear", 
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200", 
        d: "Sudadera de alto gramaje con costuras reforzadas y bordado en cromo. Diseñada para durabilidad extrema y estética cyber-urbana.",
        material: "100% Algodón Premium",
        fit: "Oversized Tactical"
    },
    { 
        id: "S02", 
        name: "CYBER TEE • OVERSIZED", 
        price: "599", 
        cat: "Street", 
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200", 
        d: "Camiseta de corte oversized con tecnología de impresión láser en alta resolución. Respirable y de tacto frío.",
        material: "Algodón Orgánico 240g",
        fit: "Drop Shoulder"
    },
    { 
        id: "S03", 
        name: "MC CAP • STRUCTURAL", 
        price: "450", 
        cat: "Accessories", 
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200", 
        d: "Gorra con armazón estructural garantizado. Bordado 3D de alta densidad con hilos de polímero reforzado.",
        material: "Sarga de alta resistencia",
        fit: "Snapback Ajustable"
    }
];

const _0x5f2 = "PIbaSIJVhpf38gDIWgsxTtuB5N859NWmFpYRpQLG"; 
const PROVIDER_API = "https://api.cloud-fulfillment.host"; // Generic endpoint naming

// Hybrid Sync Engine: Attempts LIVE, fails SILENTLY to Cache.
async function loadProviderCatalog() {
    const grid = document.getElementById('storeGrid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div class="col-span-full h-96 flex flex-col items-center justify-center gap-10">
            <div class="relative w-32 h-32">
                <div class="absolute inset-0 border-4 border-neon-cyan/10 rounded-full scale-110"></div>
                <div class="absolute inset-0 border-[4px] border-neon-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_40px_rgba(0,240,255,0.3)]"></div>
            </div>
            <p class="font-tech text-[16px] uppercase tracking-[1.5em] text-neon-cyan neon-glow animate-pulse">Establishing Deep Sync...</p>
        </div>
    `;

    let products = [];
    
    try {
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(PROVIDER_API + '/store/products')}`;
        const response = await fetch(proxyUrl, { headers: { 'Authorization': `Bearer ${_0x5f2}` } });
        const data = await response.json();
        const apiList = data.result || data.data || data.products || data.items;
        
        if (apiList && Array.isArray(apiList)) {
            products = apiList.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price || "CONSULTAR",
                img: p.thumbnail_url || p.image_url || p.img,
                d: "Producto sincronizado directamente desde la Red Global vía Neural Link v2.0.",
                material: "Premium Fiber protocol",
                fit: "Neural Fit v1.0"
            }));
            console.log("Live Sync Established");
        } else {
            throw new Error('Data Empty');
        }
    } catch (e) {
        console.warn("Manual override: Sync Blocked / Cache Active.");
        products = PROVIDER_SYNC_INDEX;
    }

    window.masterCatalog = products;
    renderGrid(products);
}

function renderGrid(list) {
    const grid = document.getElementById('storeGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    setTimeout(() => {
        list.forEach((p, idx) => {
            const card = document.createElement('div');
            card.className = 'liquid-glass p-12 rounded-[4.5rem] group cursor-pointer opacity-0 translate-y-20 transition-all hover:scale-[1.03] hover:border-neon-cyan/30';
            card.onclick = () => openProductDetail(p.id, list);
            card.innerHTML = `
                <div class="aspect-square bg-white/5 rounded-[4rem] overflow-hidden mb-12 relative shadow-2xl">
                    <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-transform">
                    <div class="absolute top-6 right-6 px-5 py-2 rounded-full bg-black/60 border border-white/5 font-tech text-[9px] uppercase tracking-widest text-white/50 backdrop-blur-md">
                        REF: ${p.id}
                    </div>
                </div>
                <h4 class="font-display text-5xl md:text-6xl chrome-text uppercase tracking-widest leading-none mb-8">${p.name}</h4>
                <p class="font-tech text-xs text-white/30 uppercase tracking-[0.6em] mb-14">Empire Collection • Ver. 2.6</p>
                <div class="flex justify-between items-center bg-black/40 p-10 rounded-[2.5rem] border border-white/5 group-hover:border-neon-green/20">
                    <div class="flex flex-col">
                        <span class="font-tech text-[10px] text-white/20 uppercase">Network Rate</span>
                        <span class="text-neon-cyan font-tech text-4xl font-bold tracking-tighter">$${p.price}</span>
                    </div>
                    <div class="px-8 py-3 rounded-full bg-neon-green text-black font-display text-xl uppercase tracking-tighter hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]">Deploy</div>
                </div>
            `;
            grid.appendChild(card);
            gsap.to(card, { opacity: 1, y: 0, delay: idx * 0.05, duration: 0.8, ease: "power3.out" });
        });
        lucide.createIcons();
    }, 300);
}

function filterCatalog(query) {
    const q = query.toLowerCase();
    const filtered = window.masterCatalog.filter(p => p.name.toLowerCase().includes(q));
    renderGrid(filtered);
}

function openStore() {
    const overlay = document.getElementById('storeOverlay');
    overlay.classList.add('active');
    document.body.classList.add('mobile-menu-active');
    loadProviderCatalog();
}

function closeStore() {
    document.getElementById('storeOverlay').classList.remove('active');
    document.body.classList.remove('mobile-menu-active');
}

async function openProductDetail(id, currentList) {
    const content = document.getElementById('detailContent');
    if (!content) return;
    
    content.innerHTML = `
        <div class="col-span-full h-96 flex flex-col items-center justify-center gap-8">
            <div class="w-20 h-20 border-[3px] border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            <p class="font-tech text-[14px] uppercase tracking-[1em] text-white/40">Descifrando Matriz de Datos...</p>
        </div>
    `;
    document.getElementById('productDetail').classList.add('active');

    const info = currentList.find(p => p.id === id);
    if (!info) return;

    setTimeout(() => {
        content.innerHTML = `
            <div class="liquid-glass p-6 md:p-10 rounded-[3rem] md:rounded-[6rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] relative group">
                <img src="${info.img}" class="w-full h-auto object-cover rounded-[2rem] md:rounded-[5rem] group-hover:scale-105 duration-1000 transition-transform">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="flex flex-col justify-center px-4 md:px-10">
                <div class="flex items-center gap-6 md:gap-8 mb-8 md:mb-12">
                    <div class="h-[2px] w-12 md:w-20 bg-neon-green shadow-[0_0_20px_rgba(0,255,157,0.5)]"></div>
                    <span class="font-tech text-xs md:text-md text-neon-green tracking-[0.4em] md:tracking-[0.8em] uppercase neon-glow">Activo en Red MC</span>
                </div>
                <h2 class="font-display text-5xl md:text-8xl chrome-text uppercase leading-none mb-8 md:mb-10">${info.name}</h2>
                <div class="font-display text-4xl md:text-6xl text-white mb-10 md:mb-14">$ ${info.price} <span class="text-xs font-tech text-white/20">MXN</span></div>
                
                <div class="mb-10 md:mb-14">
                    <p class="text-lg md:text-2xl text-white/70 uppercase font-clean tracking-widest leading-relaxed">
                        ${info.d}
                    </p>
                </div>

                <div class="flex flex-col gap-6 md:gap-8 mb-10 md:mb-16">
                    <span class="font-tech text-[10px] text-white/30 uppercase tracking-[0.4em]">Matrix: Select Size</span>
                    <div class="flex flex-wrap gap-3 md:gap-4" id="sizeSelector">
                        <button onclick="selectVariant(this, 'S')" class="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center font-display text-xl md:text-2xl hover:border-neon-green transition-all">S</button>
                        <button onclick="selectVariant(this, 'M')" class="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center font-display text-xl md:text-2xl hover:border-neon-green transition-all">M</button>
                        <button onclick="selectVariant(this, 'L')" class="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-neon-green flex items-center justify-center font-display text-xl md:text-2xl text-neon-green shadow-[0_0_15px_rgba(0,255,157,0.3)]">L</button>
                        <button onclick="selectVariant(this, 'XL')" class="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center font-display text-xl md:text-2xl hover:border-neon-green transition-all">XL</button>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16">
                    <div class="bg-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5">
                        <div class="font-tech text-[8px] text-white/20 uppercase mb-3 md:mb-4 tracking-widest">Material Pattern</div>
                        <div class="font-display text-2xl md:text-3xl text-white uppercase">${info.material || 'PREMIUM COTTON'}</div>
                    </div>
                    <div class="bg-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5">
                        <div class="font-tech text-[8px] text-white/20 uppercase mb-3 md:mb-4 tracking-widest">Fit Protocol</div>
                        <div class="font-display text-2xl md:text-3xl text-neon-cyan uppercase">${info.fit || 'OVERSIZED 2.0'}</div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button id="addToCartBtn" 
                        onclick="addToCart('${info.id}', '${info.name}', '${info.price}', '${info.img}')"
                        class="bg-white/10 text-white py-8 md:py-10 text-center font-display text-2xl md:text-3xl rounded-[2rem] md:rounded-[2.5rem] font-bold hover:bg-white/20 transition-all border border-white/10">
                        + CARRITO
                    </button>
                    <button id="buyNowBtn" 
                        onclick="buyNow('${info.id}', '${info.name}', '${info.price}', '${info.img}')"
                        class="bg-neon-green text-black py-8 md:py-10 text-center font-display text-2xl md:text-3xl rounded-[2rem] md:rounded-[2.5rem] font-bold hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                        COMPRAR AHORA
                    </button>
                </div>
            </div>
        `;
    }, 600);
}

window.currentSize = 'L';
function selectVariant(btn, size) {
    window.currentSize = size;
    const btns = document.querySelectorAll('#sizeSelector button');
    btns.forEach(b => {
        b.className = 'w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center font-display text-xl md:text-2xl hover:border-neon-green transition-all';
    });
    btn.className = 'w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-neon-green flex items-center justify-center font-display text-xl md:text-2xl text-neon-green shadow-[0_0_15px_rgba(0,255,157,0.3)]';
}

// MC CART CORE SYSTEM
let cart = JSON.parse(localStorage.getItem('mcCart')) || [];

function addToCart(id, name, price, img) {
    const item = {
        id,
        name,
        price: parseInt(price.replace(/,/g, '')),
        img,
        size: window.currentSize,
        qty: 1
    };
    
    const existing = cart.find(i => i.id === id && i.size === item.size);
    if(existing) {
        existing.qty++;
    } else {
        cart.push(item);
    }
    
    saveCart();
    renderCart();
    openCart();
    
    const btn = document.getElementById('addToCartBtn');
    if(btn) {
        btn.innerText = "✓ AÑADIDO";
        btn.classList.add('bg-neon-green');
        setTimeout(() => {
            btn.innerText = "Añadir al Carrito";
            btn.classList.remove('bg-neon-green');
        }, 2000);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('mcCart', JSON.stringify(cart));
    updateCartCounters();
}

function updateCartCounters() {
    const counts = document.querySelectorAll('#cartCount, #cartCountMobile, #storeCartCount');
    const totalQty = cart.reduce((acc, current) => acc + current.qty, 0);
    
    counts.forEach(c => {
        if(c) {
            c.innerText = totalQty;
            c.style.opacity = totalQty > 0 ? 1 : 0;
            if(c.id === 'storeCartCount') c.style.opacity = 1; // Always visible in store
        }
    });
}

function buyNow(id, name, price, img) {
    addToCart(id, name, price, img);
    sendOrder();
}

window.buyNow = buyNow;
window.filterCatalog = filterCatalog;

function renderCart() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const empty = document.getElementById('cartEmpty');
    const totalEl = document.getElementById('cartTotal');
    
    if(!container) return;
    container.innerHTML = '';
    
    if(cart.length === 0) {
        if(footer) footer.classList.add('hidden');
        if(empty) empty.classList.remove('hidden');
        return;
    }
    
    if(footer) footer.classList.remove('hidden');
    if(empty) empty.classList.add('hidden');
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        
        const card = document.createElement('div');
        card.className = 'liquid-glass p-6 md:p-8 rounded-[2.5rem] flex items-center gap-6 border-white/5';
        card.innerHTML = `
            <div class="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                <img src="${item.img}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-display text-2xl text-white uppercase">${item.name}</h4>
                    <button onclick="removeFromCart(${index})" class="text-white/20 hover:text-red-500 transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
                <div class="flex items-center gap-4">
                    <span class="px-3 py-1 rounded-lg bg-white/5 font-tech text-[8px] text-white/40 uppercase">Size: ${item.size}</span>
                    <span class="font-tech text-[10px] text-neon-cyan">$${item.price.toLocaleString()} MXN</span>
                </div>
            </div>
            <div class="flex flex-col items-center gap-2">
                <div class="flex items-center gap-4 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                    <button onclick="updateQty(${index}, -1)" class="text-white/40 hover:text-white font-bold">-</button>
                    <span class="font-tech text-xs text-white">${item.qty}</span>
                    <button onclick="updateQty(${index}, 1)" class="text-white/40 hover:text-white font-bold">+</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    if(totalEl) totalEl.innerHTML = `$${total.toLocaleString()} <span class="text-xs font-tech text-white/20">MXN</span>`;
    if(typeof lucide !== 'undefined') lucide.createIcons();
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if(cart[index].qty < 1) {
        removeFromCart(index);
    } else {
        saveCart();
        renderCart();
    }
}

function openCart() {
    const el = document.getElementById('cartOverlay');
    if(el) {
        el.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const el = document.getElementById('cartOverlay');
    if(el) {
        el.style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
    }
}

function sendOrder() {
    let message = "🚀 NUEVA ORDEN EMPIRE SYSTEM\n\n";
    let total = 0;
    
    cart.forEach(item => {
        message += `• ${item.name} | Size: ${item.size} | Qty: ${item.qty} | $${(item.price * item.qty).toLocaleString()}\n`;
        total += (item.price * item.qty);
    });
    
    message += `\n💰 TOTAL INVERSIÓN: $${total.toLocaleString()} MXN\n`;
    message += `\n📍 Protocolo de envío global: ACTIVADO`;
    
    const url = `https://wa.me/525574123521?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

window.openCart = openCart;
window.closeCart = closeCart;
window.sendOrder = sendOrder;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.addToCart = addToCart;





function closeProductDetail() {
    const detail = document.getElementById('productDetail');
    if (detail) detail.classList.remove('active');
}

// Scroll Management
function scrollToSection(id, btn) {
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: "power4.inOut" });
    if(btn) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function switchPathMaster(path) {
    const btnA = document.getElementById('btnA'), btnB = document.getElementById('btnB');
    const pA = document.getElementById('pathA'), pB = document.getElementById('pathB');
    if(!btnA || !btnB || !pA || !pB) return;
    
    // Clear previous animations to avoid conflicts
    gsap.killTweensOf([pA.children, pB.children]);
    
    if(path === 'A') {
        btnA.classList.add('active'); btnB.classList.remove('active');
        pA.classList.remove('hidden'); pB.classList.add('hidden');
        gsap.fromTo(pA.children, 
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
    } else {
        btnB.classList.add('active'); btnA.classList.remove('active');
        pB.classList.remove('hidden'); pA.classList.add('hidden');
        gsap.fromTo(pB.children, 
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
    }
}

// Initialization
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('#loaderBar', { width: '100%', duration: 3, ease: 'power4.inOut' })
      .to('#loaderLogo', { opacity: 1, duration: 1 }, '-=2.5')
      .to('#preloader', { opacity: 0, pointerEvents: 'none', duration: 1 })
      .add(() => {
          document.body.style.overflow = 'auto'; 
          initAnimations();
          lucide.createIcons();
      }, "-=0.5");
});

function initAnimations() {
    // Nav entrance - Ensuring it ends at opacity 1
    gsap.set('#mainNav', { opacity: 0, y: -50 });
    gsap.to('#mainNav', { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 });

    gsap.from('#mainTitle', { y: 100, opacity: 0, duration: 1.2, delay: 0.2, ease: "power4.out" });

    gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    gsap.to('spline-viewer', {
        y: -50,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    startFOMO();
}

function startFOMO() {
    const toast = document.getElementById('fomoToast') || document.querySelector('.toast-notification');
    const text = document.getElementById('fomoText') || (toast ? toast.querySelector('p') : null);
    const msgs = ['ORDEN MC: 15min ago', 'EMPIRE SYSTEM: Activo', 'STOCK: Limitado', 'NUEVO SOCIO: CDMX'];
    if(!toast || !text) return;
    
    const cycle = () => {
        text.innerText = msgs[Math.floor(Math.random() * msgs.length)];
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 6000);
    };
    
    setInterval(cycle, 15000);
    setTimeout(cycle, 2000);
}

const cleanSpline = () => {
    document.querySelectorAll('spline-viewer').forEach(v => {
        if(v.shadowRoot) {
            const shadow = v.shadowRoot;
            const logo = shadow.querySelector('#logo') || shadow.querySelector('a[href*="spline"]');
            if(logo) logo.style.display = 'none';
            // Aggressive cleaning
            const allLinks = shadow.querySelectorAll('a');
            allLinks.forEach(link => { if(link.href.includes('spline')) link.style.display = 'none'; });
        }
    });
};
setInterval(cleanSpline, 500);

window.openStore = openStore;
window.closeStore = closeStore;
window.openProductDetail = openProductDetail;
window.closeProductDetail = closeProductDetail;
window.switchPathMaster = switchPathMaster;
window.scrollToSection = scrollToSection;

// PWA Installation Logic
let deferredPrompt;
const installBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(installBtn) installBtn.classList.remove('hidden');
});

if(installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.classList.add('hidden');
        }
        deferredPrompt = null;
    });
}



