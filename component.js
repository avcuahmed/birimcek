// components.js - Tüm sayfalarda ortak olan Header, Çekmece ve Modalleri yönetir

document.addEventListener("DOMContentLoaded", function() {
  const sharedHTML = `
    <!-- BİRİM FİYAT BİLGİLENDİRME POP-UP -->
    <div class="unit-info-popup" id="unitInfoPopup">
      <div class="unit-info-content">
        <i class="fa-solid fa-circle-info"></i>
        <div>
          <h4>Birim Fiyat Sıralaması Aktif!</h4>
          <p>Ürünler paket büyüklüklerine aldanmamanız için doğrudan <strong>Kilogram / Adet Birim Fiyatına</strong> göre sıralanmıştır.</p>
        </div>
      </div>
      <button class="unit-info-close" onclick="window.closeUnitPopup()"><i class="fa-solid fa-xmark"></i></button>
    </div>

    <!-- DESKTOP HEADER -->
    <header id="header" class="desktop-only">
      <a href="index.html" class="logo">
        <i class="fa-solid fa-leaf"></i>Birimçek
      </a>

      <div class="search-box-desktop">
        <div class="search-category-dropdown">
          <button class="search-menu-btn" onclick="window.toggleSearchCategoryDropdown()" title="Kategori Seç">
            <i class="fa-solid fa-bars"></i>
            <span id="selectedCategoryText" style="font-size: 0.75rem; font-weight: 700; margin-left: 3px;">Tümü</span>
            <i class="fa-solid fa-chevron-down" style="font-size: 0.6rem; margin-left: 3px;"></i>
          </button>
          <div class="category-dropdown-menu" id="searchCategoryDropdownMenu">
            <div onclick="window.selectSearchCategory('Tümü', 'Tümü')">Tüm Kategoriler</div>
            <div onclick="window.selectSearchCategory('Meyve & Sebze', 'Meyve & Sebze')">Meyve & Sebze</div>
            <div onclick="window.selectSearchCategory('Et & Şarküteri', 'Et & Şarküteri')">Et & Şarküteri</div>
            <div onclick="window.selectSearchCategory('Süt & Kahvaltı', 'Süt & Kahvaltı')">Süt & Kahvaltı</div>
            <div onclick="window.selectSearchCategory('Temel Gıda', 'Temel Gıda')">Temel Gıda</div>
            <div onclick="window.selectSearchCategory('Atıştırmalık', 'Atıştırmalık')">Atıştırmalık</div>
            <div onclick="window.selectSearchCategory('İçecekler', 'İçecekler')">İçecekler</div>
            <div onclick="window.selectSearchCategory('Temizlik', 'Temizlik')">Temizlik</div>
          </div>
        </div>
        
        <input type="text" class="search-input" id="searchInputDesktop" placeholder="Ürün, marka veya kilogram/adet ara..." onkeypress="if(event.key==='Enter') window.executeSearch('desktop')">
        <button class="search-btn" onclick="window.executeSearch('desktop')" title="Ara">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div class="header-actions">
        <button class="video-upload-btn" onclick="window.toggleVideoModal()">
          <i class="fa-solid fa-video"></i> VİDEO
        </button>
        <button class="video-upload-btn" style="background:var(--primary);" onclick="window.toggleReceiptModal()">
          <i class="fa-solid fa-receipt"></i> FİŞ
        </button>
        <div class="points-badge" onclick="alert('Ödül Havuzu: Onaylanan video ve fişlerinizden 12 Puan kazandınız!')" title="Krediler / Puanlar">
          <i class="fa-solid fa-star"></i> 12 Puan
        </div>
        <a href="hesabim.html" class="action-item" title="Hesabım"><i class="fa-regular fa-user"></i></a>
        <button class="action-item badge-icon" onclick="window.toggleCart()" title="Sepetim">
          <i class="fa-solid fa-basket-shopping"></i> 
          <span class="badge" id="cartBadgeDesktop">0</span>
        </button>
      </div>
    </header>

    <!-- MOBILE FLOATING HEADER -->
    <div class="mobile-floating-header" id="mobileFloatingHeader">
      <div class="mf-default-content">
        <div class="mf-left">
          <button class="mf-menu-btn" onclick="window.toggleCategoryMenu()">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>

        <a href="index.html" class="mf-logo">
          <i class="fa-solid fa-leaf"></i>Birimçek
        </a>

        <div class="mf-right">
          <div class="points-badge" onclick="alert('Ödül Havuzu: 12 Puan')" style="font-size:0.65rem; padding: 3px 6px;">
            <i class="fa-solid fa-star"></i> 12 P
          </div>
          <button class="mf-search-btn" onclick="window.openMobileSearch()"><i class="fa-solid fa-magnifying-glass"></i></button>
          <a href="hesabim.html" class="mf-account"><i class="fa-regular fa-user"></i></a>
          <button class="mf-cart" onclick="window.toggleCart()">
            <i class="fa-solid fa-basket-shopping"></i>
            <span class="badge" style="top:-5px; right:-5px;" id="cartBadgeMobile">0</span>
          </button>
        </div>
      </div>

      <div class="mf-search-container" id="mfSearchContainer">
        <div class="mf-search-category">
          <button class="mf-search-cat-btn" onclick="window.toggleMfCatDropdown()">
            <span id="mfSelectedCatText">Tümü</span>
            <i class="fa-solid fa-chevron-down" style="font-size: 0.6rem;"></i>
          </button>
          <div class="mf-category-dropdown" id="mfCatDropdownMenu">
            <div onclick="window.selectMfCategory('Tümü', 'Tümü')">Tüm Kategoriler</div>
            <div onclick="window.selectMfCategory('Meyve & Sebze', 'Meyve & Sebze')">Meyve & Sebze</div>
            <div onclick="window.selectMfCategory('Et & Şarküteri', 'Et & Şarküteri')">Et & Şarküteri</div>
            <div onclick="window.selectMfCategory('Süt & Kahvaltı', 'Süt & Kahvaltı')">Süt & Kahvaltı</div>
            <div onclick="window.selectMfCategory('Temel Gıda', 'Temel Gıda')">Temel Gıda</div>
            <div onclick="window.selectMfCategory('Atıştırmalık', 'Atıştırmalık')">Atıştırmalık</div>
            <div onclick="window.selectMfCategory('İçecekler', 'İçecekler')">İçecekler</div>
            <div onclick="window.selectMfCategory('Temizlik', 'Temizlik')">Temizlik</div>
          </div>
        </div>
        <input type="text" class="mf-search-input" id="searchInputMobile" placeholder="Ürün, marka ara..." onkeypress="if(event.key==='Enter') window.executeSearch('mobile')">
        <button class="mf-search-submit" onclick="window.executeSearch('mobile')"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button class="mf-search-close" onclick="window.closeMobileSearch()"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>

    <!-- NAV (Desktop) -->
    <nav class="desktop-only">
      <div class="nav-left">
        <button class="desktop-quick-search-btn" onclick="window.toggleCategoryMenu()">
          <i class="fa-solid fa-bars"></i> Tüm Kategoriler
        </button>
        <ul class="nav-links">
          <li><a href="index.html" class="active">Ana Sayfa</a></li>
          <li><a href="urunler.html">Tüm Ürünler</a></li>
          <li><a href="marketler.html">Marketler</a></li>
          <li><a href="firsatlar.html">Aktüel & Fırsatlar</a></li>
        </ul>
      </div>
    </nav>

    <!-- VIDEO UPLOAD MODAL -->
    <div id="videoOverlay" class="drawer-overlay" onclick="window.toggleVideoModal()"></div>
    <div id="videoModal" class="custom-modal">
      <div class="modal-header">
        <h3><i class="fa-solid fa-video" style="color: var(--primary);"></i> Reyon Videosu Yükle</h3>
        <button class="modal-close" onclick="window.toggleVideoModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p>Yüksek çözünürlüklü reyon videosu yükle. Yapay zeka onayından sonra yeni veya 1₺+ değişen her ürün için <strong>1 Puan</strong> kazan!</p>
        <div class="upload-area">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <span>Videoyu buraya sürükle veya seç</span>
          <small>MP4, MOV (Yüksek Çözünürlük Önerilir)</small>
          <input type="file" accept="video/*" id="videoInput" onchange="window.handleFileSelect(event, 'video')">
          <div id="fileNameDisplay"></div>
        </div>
        <button class="cart-checkout-btn" id="uploadSubmitBtn" onclick="window.submitUpload('video')" style="display:none;">
          Videoyu Gönder & Teyit Et
        </button>
      </div>
    </div>

    <!-- RECEIPT UPLOAD MODAL -->
    <div id="receiptOverlay" class="drawer-overlay" onclick="window.toggleReceiptModal()"></div>
    <div id="receiptModal" class="custom-modal">
      <div class="modal-header">
        <h3><i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Alışveriş Fişi Yükle</h3>
        <button class="modal-close" onclick="window.toggleReceiptModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p>Alışveriş fişini yükleyerek puan kazan ve marketlere/ürünlere onaylı değerlendirme (yorum) yapma hakkı elde et!</p>
        <div class="upload-area">
          <i class="fa-solid fa-file-arrow-up"></i>
          <span>Fiş görselini seç veya sürükle</span>
          <small>PNG, JPG</small>
          <input type="file" accept="image/*" id="receiptInput" onchange="window.handleFileSelect(event, 'receipt')">
          <div id="receiptNameDisplay" style="font-size:0.85rem; color:var(--primary); font-weight:700; margin-top:10px; display:none;"></div>
        </div>
        <button class="cart-checkout-btn" id="receiptSubmitBtn" onclick="window.submitUpload('receipt')" style="display:none;">
          Fişi Gönder & Kredi Kazan
        </button>
      </div>
    </div>

    <!-- CATEGORY & MENU DRAWER -->
    <div id="categoryOverlay" class="drawer-overlay" onclick="window.toggleCategoryMenu()"></div>
    <div id="categoryDrawer" class="side-drawer">
      <div class="drawer-header">
        <h3><i class="fa-solid fa-bars"></i> Menü & Kategoriler</h3>
        <button class="drawer-close-btn" onclick="window.toggleCategoryMenu()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="side-drawer-content">
        <div class="drawer-nav-group">
          <h4>Hızlı Erişim</h4>
          <ul class="drawer-nav-links">
            <li><a href="index.html" class="active"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
            <li><a href="urunler.html"><i class="fa-solid fa-box-open"></i> Tüm Ürünler</a></li>
            <li><a href="marketler.html"><i class="fa-solid fa-store"></i> Marketler</a></li>
            <li><a href="firsatlar.html"><i class="fa-solid fa-bolt"></i> Aktüel & Fırsatlar</a></li>
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
          <li onclick="window.goToCategoryPage('Fırın & Pastane')"><i class="fa-solid fa-bread-slice"></i> Fırın & Pastane</li>
          <li onclick="window.goToCategoryPage('Dondurulmuş Gıdalar')"><i class="fa-solid fa-snowflake"></i> Dondurulmuş Gıdalar</li>
          <li onclick="window.goToCategoryPage('Deterjan & Ev Temizliği')"><i class="fa-solid fa-pump-soap"></i> Deterjan & Ev Temizliği</li>
          <li onclick="window.goToCategoryPage('Kişisel Bakım & Hijyen')"><i class="fa-solid fa-sparkles"></i> Kişisel Bakım & Hijyen</li>
          <li onclick="window.goToCategoryPage('Kağıt Ürünleri')"><i class="fa-solid fa-toilet-paper"></i> Kağıt Ürünleri</li>
          <li onclick="window.goToCategoryPage('Bebek Dünyası')"><i class="fa-solid fa-baby"></i> Bebek Dünyası</li>
          <li onclick="window.goToCategoryPage('Evcil Dostlar')"><i class="fa-solid fa-paw"></i> Evcil Dostlar</li>
          <li onclick="window.goToCategoryPage('Ev & Yaşam')"><i class="fa-solid fa-house"></i> Ev & Yaşam</li>
        </ul>
      </div>
    </div>

    <!-- CART DRAWER -->
    <div id="cartOverlay" class="drawer-overlay" onclick="window.toggleCart()"></div>
    <div id="cartDrawer" class="side-drawer">
      <div class="drawer-header">
        <h3><i class="fa-solid fa-basket-shopping"></i> Alışveriş Sepetim</h3>
        <button class="drawer-close-btn" onclick="window.toggleCart()"><i class="fa-solid fa-xmark"></i></button>
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
        <button class="cart-checkout-btn" onclick="alert('Optimizasyon yapıldı! Rota ve navigasyon ekranına yönlendiriliyorsunuz.')">
          <i class="fa-solid fa-route"></i> En Uygun Noktaları Gör & Rota Al
        </button>
      </div>
    </div>
  `;

  // Sayfanın en başına bu bileşenleri ekle
  document.body.insertAdjacentHTML('afterbegin', sharedHTML);
});
