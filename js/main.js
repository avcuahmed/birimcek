import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// BİLEŞENLERİ TÜM SAYFALARDA EKSİZSİZ YÜKLEYEN FONKSİYON
function loadComponents() {
    const headerContainer = document.getElementById('header-container');
    const drawersContainer = document.getElementById('drawers-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        headerContainer.innerHTML = `
        <!-- DESKTOP TOP BAR & HEADER -->
        <header class="main-header">
          <div class="header-inner">
            <a href="index.html" class="logo-box">
              <i class="fa-solid fa-scale-balanced" style="color: var(--primary); font-size: 1.5rem;"></i>
              <span>Birimçek</span>
            </a>

            <!-- DESKTOP SEARCH BAR -->
            <div class="header-search-bar">
              <div class="search-category-dropdown" onclick="window.toggleSearchCategoryDropdown()">
                <span id="selectedCategoryText">Tümü</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem; color: var(--text-muted);"></i>
                <div class="category-dropdown-menu" id="searchCategoryDropdownMenu">
                  <div onclick="window.selectSearchCategory('Tümü', 'Tümü')">Tümü</div>
                  <div onclick="window.selectSearchCategory('Meyve & Sebze', 'Meyve & Sebze')">Meyve & Sebze</div>
                  <div onclick="window.selectSearchCategory('Süt & Kahvaltılık', 'Süt & Kahvaltılık')">Süt & Kahvaltılık</div>
                  <div onclick="window.selectSearchCategory('Temel Gıda', 'Temel Gıda')">Temel Gıda</div>
                </div>
              </div>
              <input type="text" id="searchInputDesktop" class="search-input" placeholder="Ürün, marka veya kategori ara...">
              <button class="search-btn-action" onclick="window.executeSearch('desktop')"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <!-- HEADER ACTIONS -->
            <div class="header-actions">
              <a href="firsatlar.html" class="action-btn-link" title="Aktüel & Fırsatlar">
                <i class="fa-solid fa-bolt" style="color: #ef4444;"></i>
                <span class="action-text">Fırsatlar</span>
              </a>
              <a href="marketler.html" class="action-btn-link" title="Marketler">
                <i class="fa-solid fa-store"></i>
                <span class="action-text">Marketler</span>
              </a>
              <button class="cart-trigger-btn" onclick="window.toggleCart()" title="Sepetim" type="button">
                <i class="fa-solid fa-basket-shopping"></i>
                <span class="action-text">Sepet</span>
                <span class="cart-badge" id="cartBadgeDesktop">0</span>
              </button>
              <a href="hesabim.html" class="action-btn-link" title="Hesabım">
                <i class="fa-regular fa-user"></i>
                <span class="action-text">Hesabım</span>
              </a>
              <button class="menu-trigger-btn" onclick="window.toggleCategoryMenu()" title="Menü" type="button">
                <i class="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </header>

        <!-- MOBİL ÜST SABİT HEADER -->
        <div class="mobile-floating-header" id="mobileFloatingHeader">
          <div class="mf-top-row">
            <a href="index.html" class="logo-box">
              <i class="fa-solid fa-scale-balanced" style="color: var(--primary);"></i>
              <span>Birimçek</span>
            </a>
            <div class="mf-actions">
              <button class="cart-trigger-btn" onclick="window.toggleCart()" type="button">
                <i class="fa-solid fa-basket-shopping"></i>
                <span class="cart-badge" id="cartBadgeMobile">0</span>
              </button>
              <button class="menu-trigger-btn" onclick="window.toggleCategoryMenu()" type="button">
                <i class="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
          <div class="mf-search-row">
            <div class="mf-search-box" onclick="window.openMobileSearch()">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>Ürün veya market ara...</span>
            </div>
          </div>
          <!-- MOBİL ARAMA FULLSCREEN PANEL -->
          <div class="mobile-search-overlay-panel">
            <div class="ms-top-bar">
              <button class="ms-back-btn" onclick="window.closeMobileSearch()" type="button"><i class="fa-solid fa-arrow-left"></i></button>
              <div class="mf-category-select-wrap" onclick="window.toggleMfCatDropdown()">
                <span id="mfSelectedCatText">Tümü</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
                <div class="category-dropdown-menu" id="mfCatDropdownMenu">
                  <div onclick="window.selectMfCategory('Tümü', 'Tümü')">Tümü</div>
                  <div onclick="window.selectMfCategory('Meyve & Sebze', 'Meyve & Sebze')">Meyve & Sebze</div>
                  <div onclick="window.selectMfCategory('Temel Gıda', 'Temel Gıda')">Temel Gıda</div>
                </div>
              </div>
              <input type="text" id="searchInputMobile" class="ms-input" placeholder="Ne aramak istemiştiniz?">
              <button class="ms-submit-btn" onclick="window.executeSearch('mobile')" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
        </div>

        <!-- BİRİM FİYAT BİLGİLENDİRME POPUP -->
        <div class="unit-info-popup" id="unitInfoPopup">
          <div class="unit-info-content">
            <i class="fa-solid fa-circle-info"></i>
            <span>Ürünler, hak geçmemesi için en küçük ortak birimlerine (Litre, Kilogram, Adet) dönüştürülerek sıralanmaktadır.</span>
          </div>
          <button class="unit-info-close" onclick="window.closeUnitPopup()" type="button"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    }

    if (drawersContainer) {
        drawersContainer.innerHTML = `
        <!-- VİDEO UPLOAD MODAL -->
        <div id="videoOverlay" class="drawer-overlay" onclick="window.toggleVideoModal()"></div>
        <div id="videoModal" class="custom-modal">
          <div class="modal-header">
            <h3><i class="fa-solid fa-video" style="color: var(--primary);"></i> Reyon Videosu Yükle</h3>
            <button class="modal-close" onclick="window.toggleVideoModal()" type="button"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="modal-body">
            <p>Yüksek çözünürlüklü reyon videosu yükle. Yapay zeka onayından sonra yeni veya 1₺+ değişen her ürün için <strong>1 Puan</strong> kazan!</p>
            <div class="upload-area">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>Videoyu buraya sürükle veya seç</span>
              <small>MP4, MOV</small>
              <input type="file" accept="video/*" id="videoInput" onchange="window.handleFileSelect(event, 'video')">
              <div id="fileNameDisplay" style="margin-top:10px; font-size:0.85rem; font-weight:700; color:var(--primary); display:none;"></div>
            </div>
            <button class="cart-checkout-btn" id="uploadSubmitBtn" onclick="window.submitUpload('video')" style="display:none;" type="button">
              Videoyu Gönder & Teyit Et
            </button>
          </div>
        </div>

        <!-- RECEIPT UPLOAD MODAL -->
        <div id="receiptOverlay" class="drawer-overlay" onclick="window.toggleReceiptModal()"></div>
        <div id="receiptModal" class="custom-modal">
          <div class="modal-header">
            <h3><i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Alışveriş Fişi Yükle</h3>
            <button class="modal-close" onclick="window.toggleReceiptModal()" type="button"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="modal-body">
            <p>Alışveriş fişini yükleyerek puan kazan ve marketlere onaylı değerlendirme yapma hakkı elde et!</p>
            <div class="upload-area">
              <i class="fa-solid fa-file-arrow-up"></i>
              <span>Fiş görselini seç veya sürükle</span>
              <small>PNG, JPG</small>
              <input type="file" accept="image/*" id="receiptInput" onchange="window.handleFileSelect(event, 'receipt')">
              <div id="receiptNameDisplay" style="font-size:0.85rem; color:var(--primary); font-weight:700; margin-top:10px; display:none;"></div>
            </div>
            <button class="cart-checkout-btn" id="receiptSubmitBtn" onclick="window.submitUpload('receipt')" style="display:none;" type="button">
              Fişi Gönder & Kredi Kazan
            </button>
          </div>
        </div>

        <!-- CATEGORY & MENU DRAWER -->
        <div id="categoryOverlay" class="drawer-overlay" onclick="window.toggleCategoryMenu()"></div>
        <div id="categoryDrawer" class="side-drawer">
          <div class="drawer-header">
            <h3><i class="fa-solid fa-bars"></i> Menü & Kategoriler</h3>
            <button class="drawer-close-btn" onclick="window.toggleCategoryMenu()" type="button"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="side-drawer-content">
            <div class="drawer-nav-group">
              <h4>Hızlı Erişim</h4>
              <ul class="drawer-nav-links">
                <li><a href="index.html"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
                <li><a href="urunler.html"><i class="fa-solid fa-box-open"></i> Tüm Ürünler</a></li>
                <li><a href="marketler.html"><i class="fa-solid fa-store"></i> Marketler</a></li>
                <li><a href="firsatlar.html"><i class="fa-solid fa-bolt"></i> Aktüel & Fırsatlar</a></li>
                <li><a href="hesabim.html"><i class="fa-regular fa-user"></i> Hesabım</a></li>
              </ul>
            </div>
            <div class="drawer-nav-group" style="border-bottom: none; background: #fff; padding-bottom: 0;">
              <h4>Kategoriler</h4>
            </div>
            <ul class="side-category-list">
              <li onclick="window.goToCategoryPage('Meyve & Sebze')"><i class="fa-solid fa-apple-whole"></i> Meyve & Sebze</li>
              <li onclick="window.goToCategoryPage('Et, Balık & Şarküteri')"><i class="fa-solid fa-drumstick-bite"></i> Et, Balık & Şarküteri</li>
              <li onclick="window.goToCategoryPage('Süt & Kahvaltılık')"><i class="fa-solid fa-cheese"></i> Süt & Kahvaltılık</li>
              <li onclick="window.goToCategoryPage('Temel Gıda')"><i class="fa-solid fa-wheat-awn"></i> Temel Gıda</li>
              <li onclick="window.goToCategoryPage('Atıştırmalıklar')"><i class="fa-solid fa-cookie-bite"></i> Atıştırmalıklar</li>
              <li onclick="window.goToCategoryPage('İçecekler')"><i class="fa-solid fa-bottle-droplet"></i> İçecekler</li>
              <li onclick="window.goToCategoryPage('Deterjan & Ev Temizliği')"><i class="fa-solid fa-pump-soap"></i> Deterjan & Ev Temizliği</li>
            </ul>
          </div>
        </div>

        <!-- CART DRAWER -->
        <div id="cartOverlay" class="drawer-overlay" onclick="window.toggleCart()"></div>
        <div id="cartDrawer" class="side-drawer">
          <div class="drawer-header">
            <h3><i class="fa-solid fa-basket-shopping"></i> Alışveriş Sepetim</h3>
            <button class="drawer-close-btn" onclick="window.toggleCart()" type="button"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="cart-body" id="cartBody">
            <div class="cart-empty-state">
              <i class="fa-solid fa-basket-shopping"></i>
              <p>Sepetiniz henüz boş.</p>
            </div>
          </div>
          <div class="cart-footer">
            <div class="market-limit-box">
              <label for="marketLimitSelect"><i class="fa-solid fa-store"></i> En Fazla Kaç Markete Gidebilirsin?</label>
              <select id="marketLimitSelect" class="market-limit-select">
                <option value="1">Tek Market (En Uygun Tümü)</option>
                <option value="2">En Fazla 2 Market</option>
                <option value="3">En Fazla 3 Market</option>
                <option value="0">Farketmez (En Ucuz Kombinasyon)</option>
              </select>
            </div>
            <div class="cart-total-row">
              <span>Tahmini En Uygun Tutar:</span>
              <strong id="cartTotalPrice">0.00 ₺</strong>
            </div>
            <button class="cart-checkout-btn" onclick="alert('Optimizasyon yapıldı! Rota ve navigasyon ekranına yönlendiriliyorsunuz.')" type="button">
              <i class="fa-solid fa-route"></i> En Uygun Noktaları Gör & Rota Al
            </button>
          </div>
        </div>`;
    }

    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer>
          <p>&copy; 2026 Birimçek - Yapay Zeka Destekli Fiyat Karşılaştırma Ağı.</p>
        </footer>`;
    }
}

// SAYFA YÜKLENDİĞİ ANDA ÇALIŞTIR
document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
    window.renderCart(); // Sayfa açıldığında sepet badge'ini güncelle
});

// --- GLOBAL FONKSİYONLAR ---
window.cart = [];
window.currentSearchCategory = "Tümü";
window.currentMfCategory = "Tümü";

window.toggleSearchCategoryDropdown = () => {
    document.getElementById("searchCategoryDropdownMenu")?.classList.toggle("active");
};

window.selectSearchCategory = (catKey, catLabel) => {
    window.currentSearchCategory = catKey;
    const textEl = document.getElementById("selectedCategoryText");
    if(textEl) textEl.innerText = catLabel;
    window.toggleSearchCategoryDropdown();
};

window.openMobileSearch = () => {
    const header = document.getElementById("mobileFloatingHeader");
    if(header) {
        header.classList.add("search-active");
        setTimeout(() => document.getElementById("searchInputMobile")?.focus(), 100);
    }
};

window.closeMobileSearch = () => {
    document.getElementById("mobileFloatingHeader")?.classList.remove("search-active");
    document.getElementById("mfCatDropdownMenu")?.classList.remove("active");
};

window.toggleMfCatDropdown = () => {
    document.getElementById("mfCatDropdownMenu")?.classList.toggle("active");
};

window.selectMfCategory = (catKey, catLabel) => {
    window.currentMfCategory = catKey;
    const textEl = document.getElementById("mfSelectedCatText");
    if(textEl) textEl.innerText = catLabel;
    window.toggleMfCatDropdown();
};

window.executeSearch = (type) => {
    const input = document.getElementById(type === 'desktop' ? 'searchInputDesktop' : 'searchInputMobile');
    const query = input?.value || '';
    const category = type === 'desktop' ? window.currentSearchCategory : window.currentMfCategory;
    alert(`Seçilen Kategori: "${category}"\nAranan Kelime: "${query}"`);
    if(type === 'mobile') window.closeMobileSearch();
};

window.goToCategoryPage = (catName) => {
    alert(`"${catName}" kategorisine ait ürünler listeleniyor...`);
    window.toggleCategoryMenu();
};

window.handleProductSort = (sortValue) => {
    const popup = document.getElementById("unitInfoPopup");
    if (sortValue && sortValue.includes("unit")) {
        popup?.classList.add("active");
    } else {
        popup?.classList.remove("active");
    }
};

window.closeUnitPopup = () => {
    document.getElementById("unitInfoPopup")?.classList.remove("active");
};

window.toggleCategoryMenu = () => {
    const drawer = document.getElementById("categoryDrawer");
    const overlay = document.getElementById("categoryOverlay");
    drawer?.classList.toggle("active");
    overlay?.classList.toggle("active");
};

window.toggleCart = () => {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer?.classList.toggle("active");
    overlay?.classList.toggle("active");
};

window.toggleVideoModal = () => {
    document.getElementById("videoModal")?.classList.toggle("active");
    document.getElementById("videoOverlay")?.classList.toggle("active");
};

window.toggleReceiptModal = () => {
    document.getElementById("receiptModal")?.classList.toggle("active");
    document.getElementById("receiptOverlay")?.classList.toggle("active");
};

window.handleFileSelect = (event, type) => {
    const file = event.target.files[0];
    if(file) {
        if(type === 'video') {
            const display = document.getElementById("fileNameDisplay");
            if(display) { display.innerText = "Seçilen: " + file.name; display.style.display = "block"; }
            document.getElementById("uploadSubmitBtn")?.style.setProperty("display", "block");
        } else {
            const display = document.getElementById("receiptNameDisplay");
            if(display) { display.innerText = "Seçilen Fiş: " + file.name; display.style.display = "block"; }
            document.getElementById("receiptSubmitBtn")?.style.setProperty("display", "block");
        }
    }
};

window.submitUpload = (type) => {
    alert(type === 'video' ? "Video yüklendi! Yapay zeka denetimi sonrasında kredileriniz hesabınıza yansıtılacaktır." : "Fiş yüklendi! Değerlendirme haklarınız tanımlandı.");
    if(type === 'video') window.toggleVideoModal();
    else window.toggleReceiptModal();
};

window.addToCart = (title, price, imgUrl) => {
    window.cart.push({ title, price: parseFloat(price) || 0, imgUrl });
    window.renderCart();
    window.toggleCart();
};

window.removeFromCart = (index) => {
    window.cart.splice(index, 1);
    window.renderCart();
};

window.renderCart = () => {
    const cartBody = document.getElementById("cartBody");
    const totalEl = document.getElementById("cartTotalPrice");
    const bDesktop = document.getElementById("cartBadgeDesktop");
    const bMobile = document.getElementById("cartBadgeMobile");

    if (bDesktop) bDesktop.innerText = window.cart.length;
    if (bMobile) bMobile.innerText = window.cart.length;

    if (!cartBody) return;

    if (window.cart.length === 0) {
        cartBody.innerHTML = `<div class="cart-empty-state"><i class="fa-solid fa-basket-shopping"></i><p>Sepetiniz henüz boş.</p></div>`;
        if(totalEl) totalEl.innerText = "0.00 ₺";
        return;
    }

    let total = 0;
    cartBody.innerHTML = window.cart.map((item, index) => {
        total += item.price;
        return `
          <div class="cart-item">
            <img src="${item.imgUrl}" class="card-product-img" style="width:48px;height:48px;">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.title}</div>
              <div class="cart-item-price">${item.price.toFixed(2)} ₺</div>
            </div>
            <button class="cart-item-remove" onclick="window.removeFromCart(${index})" type="button"><i class="fa-solid fa-trash-can"></i></button>
          </div>`;
    }).join('');
    if(totalEl) totalEl.innerText = total.toFixed(2) + " ₺";
};

// Supabase Bağlantısı
const SUPABASE_URL = "https://lejkdyhensjyauburrxk.supabase.co";
const SUPABASE_KEY = "YOUR_KEY_HERE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
