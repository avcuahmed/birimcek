// components.js - Ortak Header, Çekmeceler, Modaller ve Tasarım Stilleni Yönetir

document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Ortak CSS Stillerini Sayfaya Enjekte Et
  if (!document.getElementById("shared-components-style")) {
    const styleEl = document.createElement("style");
    styleEl.id = "shared-components-style";
    styleEl.innerHTML = `
      :root {
        --primary: #0b4d3c;
        --primary-light: #52e396;
        --primary-hover: #07382b;
        --text-dark: #191919;
        --text-muted: #666666;
        --border-color: #e5e5e5;
        --bg-soft: #f9fbf9;
        --reward-color: #f59e0b;
        --font-main: 'Sora', sans-serif;
      }

      /* HEADER - Sticky (Desktop) */
      #header { background: #ffffff; padding: 12px 30px; display: flex; align-items: center; justify-content: space-between; gap: 15px; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.03); width: 100%; }
      .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; font-size: 1.5rem; font-weight: 800; color: var(--primary); white-space: nowrap; flex-shrink: 0; }
      .logo i { color: var(--primary-light); }

      /* DESKTOP SEARCH BOX & CATEGORY DROPDOWN */
      .search-box-desktop { flex: 0 1 520px; display: flex; align-items: center; border: 2px solid var(--primary); border-radius: 30px; overflow: visible; height: 42px; background: #fff; box-shadow: 0 2px 8px rgba(11, 77, 60, 0.05); padding-left: 4px; position: relative; }
      .search-category-dropdown { position: relative; display: flex; align-items: center; border-right: 1px solid var(--border-color); padding-right: 4px; flex-shrink: 0; height: 100%; }
      .search-menu-btn { background: transparent; border: none; padding: 0 8px; font-size: 0.9rem; color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; white-space: nowrap; height: 100%; }
      .search-menu-btn:hover { color: var(--primary-hover); }

      .category-dropdown-menu {
        position: absolute; top: 46px; left: 0; background: #ffffff; border: 1px solid var(--border-color);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-radius: 12px; width: 210px; max-height: 250px;
        overflow-y: auto; z-index: 1050; display: none; padding: 6px 0;
      }
      .category-dropdown-menu.active { display: block; }
      .category-dropdown-menu div {
        padding: 10px 16px; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); cursor: pointer; transition: background 0.2s; white-space: nowrap;
      }
      .category-dropdown-menu div:hover { background: var(--bg-soft); color: var(--primary); }

      .search-input { flex: 1; border: none; padding: 0 10px; font-size: 0.85rem; outline: none; background: transparent; min-width: 0; }
      .search-btn { background: var(--primary); border: none; color: #ffffff; font-weight: 700; font-size: 0.9rem; width: 42px; height: 42px; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; border-top-right-radius: 26px; border-bottom-right-radius: 26px; flex-shrink: 0; }
      .search-btn:hover { background: var(--primary-hover); }

      .header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .action-item { display: flex; align-items: center; justify-content: center; cursor: pointer; text-decoration: none; color: var(--text-dark); background: none; border: none; font-size: 1.1rem; width: 38px; height: 38px; border-radius: 50%; transition: background 0.2s; flex-shrink: 0; }
      .action-item:hover { background: var(--bg-soft); color: var(--primary); }
      .action-item i { color: var(--primary); }
      .badge-icon { position: relative; }
      .badge { position: absolute; top: 1px; right: 1px; background: var(--primary-light); color: var(--primary); font-size: 0.6rem; font-weight: 800; width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

      .points-badge { background: #fffbeb; color: var(--reward-color); border: 1px solid #fde68a; padding: 4px 10px; border-radius: 20px; font-weight: 800; display: flex; align-items: center; gap: 5px; font-size: 0.75rem; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
      .video-upload-btn { background: var(--text-dark); color: white; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 0.78rem; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: background 0.2s; white-space: nowrap; flex-shrink: 0; }
      .video-upload-btn:hover { background: var(--primary); }
      .video-upload-btn i { color: var(--primary-light) !important; }

      nav { background: #ffffff; border-bottom: 1px solid var(--border-color); padding: 0 30px; display: flex; align-items: center; justify-content: space-between; height: 44px; }
      .nav-left { display: flex; align-items: center; gap: 15px; height: 100%; }
      
      .desktop-quick-search-btn { background: var(--bg-soft); border: 1px solid var(--border-color); border-radius: 20px; padding: 4px 12px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 5px; cursor: pointer; color: var(--text-dark); transition: all 0.2s; white-space: nowrap; }
      .desktop-quick-search-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
      .desktop-quick-search-btn:hover i { color: var(--primary-light); }
      .desktop-quick-search-btn i { color: var(--primary); }

      .nav-links { display: flex; gap: 18px; list-style: none; }
      .nav-links a { text-decoration: none; color: var(--text-dark); font-size: 0.82rem; font-weight: 600; transition: color 0.2s; white-space: nowrap; }
      .nav-links a:hover, .nav-links a.active { color: var(--primary); font-weight: 700; }

      /* BİRİM FİYAT POP-UP VE MODALLER */
      .unit-info-popup { 
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); 
        background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 24px; 
        width: 90%; max-width: 450px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 1010; 
        display: none; align-items: center; justify-content: space-between; opacity: 0; transition: all 0.3s ease;
      }
      .unit-info-popup.active { display: flex; opacity: 1; transform: translate(-50%, -50%) scale(1); }
      .unit-info-content { display: flex; align-items: flex-start; gap: 15px; }
      .unit-info-content i { font-size: 1.8rem; color: var(--primary); margin-top: 2px; }
      .unit-info-content h4 { font-size: 1rem; font-weight: 800; color: var(--primary); margin-bottom: 6px; }
      .unit-info-content p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
      .unit-info-close { background: none; border: none; font-size: 1.2rem; color: var(--text-muted); cursor: pointer; padding: 5px; align-self: flex-start; }

      .drawer-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(2px); z-index: 999; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
      .drawer-overlay.active { opacity: 1; visibility: visible; }

      .side-drawer { position: fixed; top: 0; width: 340px; max-width: 85vw; height: 100vh; background: #ffffff; z-index: 1005; box-shadow: 0 0 25px rgba(0,0,0,0.15); display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      #categoryDrawer { left: -360px; }
      #categoryDrawer.active { left: 0; }
      #cartDrawer { right: -360px; }
      #cartDrawer.active { right: 0; }

      .drawer-header { padding: 20px; background: var(--primary); color: #ffffff; display: flex; align-items: center; justify-content: space-between; }
      .drawer-header h3 { font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }
      .drawer-close-btn { background: transparent; border: none; color: white; font-size: 1.3rem; cursor: pointer; }

      .side-drawer-content { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
      .drawer-nav-group { padding: 15px 20px; border-bottom: 1px solid var(--border-color); background: var(--bg-soft); }
      .drawer-nav-group h4 { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; font-weight: 700; letter-spacing: 0.5px; }
      .drawer-nav-links { display: flex; flex-direction: column; gap: 8px; list-style: none; }
      .drawer-nav-links a { text-decoration: none; color: var(--text-dark); font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 10px; padding: 6px 0; transition: color 0.2s; }
      .drawer-nav-links a:hover, .drawer-nav-links a.active { color: var(--primary); }
      .drawer-nav-links a i { color: var(--primary); width: 18px; text-align: center; }

      .side-category-list { list-style: none; padding: 10px 0; }
      .side-category-list li { padding: 12px 20px; display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 600; color: var(--text-dark); cursor: pointer; border-bottom: 1px solid var(--border-color); transition: background 0.2s; }
      .side-category-list li:hover { background: var(--bg-soft); color: var(--primary); }
      
      .cart-body { flex: 1; padding: 20px; overflow-y: auto; }
      .cart-empty-state { text-align: center; color: var(--text-muted); margin-top: 60px; }
      .cart-empty-state i { font-size: 3rem; margin-bottom: 10px; display: block; }
      .cart-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-color); }
      .cart-item-details { flex: 1; }
      .cart-item-title { font-size: 0.85rem; font-weight: 700; color: var(--text-dark); }
      .cart-item-price { font-size: 0.85rem; color: var(--primary); font-weight: 800; }
      .cart-item-remove { background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.9rem; }

      .cart-footer { padding: 20px; border-top: 1px solid var(--border-color); background: #f8faf9; }
      .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 0.95rem; }
      .cart-total-row strong { font-size: 1.2rem; color: var(--primary); }
      
      .market-limit-box { margin-bottom: 15px; background: #fff; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); }
      .market-limit-box label { font-size: 0.78rem; font-weight: 700; display: block; margin-bottom: 5px; color: var(--text-muted); }
      .market-limit-select { width: 100%; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.85rem; outline: none; }
      .cart-checkout-btn { width: 100%; padding: 12px; background: var(--primary-light); color: var(--primary); border: none; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer; }

      .custom-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); background: #fff; width: 90%; max-width: 500px; border-radius: 16px; z-index: 1006; opacity: 0; visibility: hidden; transition: all 0.3s ease; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
      .custom-modal.active { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
      .modal-header { padding: 20px 25px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
      .modal-header h3 { font-size: 1.1rem; font-weight: 800; display: flex; align-items: center; gap: 10px; }
      .modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-muted); }
      .modal-body { padding: 25px; text-align: center; }
      .modal-body p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5; }

      .upload-area { border: 2px dashed var(--primary-light); padding: 30px 20px; border-radius: 12px; cursor: pointer; position: relative; background: var(--bg-soft); transition: background 0.2s; margin-bottom: 20px; }
      .upload-area:hover { background: #eefcf4; }
      .upload-area i { font-size: 2.5rem; color: var(--primary); margin-bottom: 10px; }
      .upload-area span { display: block; font-weight: 700; font-size: 0.95rem; color: var(--text-dark); margin-bottom: 5px; }
      .upload-area small { color: var(--text-muted); font-size: 0.75rem; }
      .upload-area input { position: absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer; }
      #fileNameDisplay { font-size: 0.85rem; color: var(--primary); font-weight: 700; margin-top: 10px; display: none; }

      .mobile-only { display: none !important; }

      @media (max-width: 900px) {
        .desktop-only, nav { display: none !important; }
        .mobile-only { display: flex !important; }
        
        .mobile-floating-header {
          display: flex; position: fixed; top: 12px; left: 50%; transform: translateX(-50%);
          width: 92%; max-width: 480px; background: #ffffff; border-radius: 40px; padding: 8px 16px;
          align-items: center; justify-content: space-between; box-shadow: 0 8px 25px rgba(0,0,0,0.12); z-index: 1000;
          transition: all 0.3s ease;
        }
        .mf-default-content { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .mf-left { display: flex; align-items: center; gap: 10px; }
        .mf-menu-btn { background: none; border: none; font-size: 1.1rem; color: var(--primary); cursor: pointer; display: flex; align-items: center; }
        .mf-logo { font-size: 1.2rem; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 5px; }
        .mf-right { display: flex; align-items: center; gap: 8px; }
        .mf-search-btn { background: none; border: none; font-size: 1rem; color: var(--primary); cursor: pointer; padding: 4px; }
        .mf-account { color: var(--primary); font-size: 1rem; text-decoration: none; display: flex; align-items: center; }
        .mf-cart { background: none; border: none; cursor: pointer; position: relative; font-size: 1rem; color: var(--primary); padding: 4px; }

        .mobile-floating-header.search-active { padding: 4px 10px; border: 2px solid var(--primary); }
        .mf-search-container { display: none; width: 100%; align-items: center; height: 36px; position: relative; }
        .mobile-floating-header.search-active .mf-default-content { display: none; }
        .mobile-floating-header.search-active .mf-search-container { display: flex; }

        .mf-search-category { position: relative; display: flex; align-items: center; border-right: 1px solid var(--border-color); padding-right: 6px; flex-shrink: 0; height: 100%; }
        .mf-search-cat-btn { background: transparent; border: none; font-size: 0.8rem; color: var(--primary); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 3px; white-space: nowrap; height: 100%; padding: 0 4px; }
        .mf-category-dropdown {
          position: absolute; top: 42px; left: 0; background: #ffffff; border: 1px solid var(--border-color);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-radius: 12px; width: 200px; max-height: 220px;
          overflow-y: auto; z-index: 1050; display: none; padding: 6px 0;
        }
        .mf-category-dropdown.active { display: block; }
        .mf-category-dropdown div { padding: 10px 14px; font-size: 0.82rem; font-weight: 600; color: var(--text-dark); cursor: pointer; white-space: nowrap; }
        .mf-category-dropdown div:hover { background: var(--bg-soft); color: var(--primary); }

        .mf-search-input { flex: 1; border: none; padding: 0 10px; font-size: 0.82rem; outline: none; background: transparent; min-width: 0; color: var(--text-dark); }
        .mf-search-submit { background: var(--primary); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.8rem; flex-shrink: 0; }
        .mf-search-close { background: none; border: none; font-size: 1rem; color: var(--text-muted); cursor: pointer; padding: 0 6px; margin-left: 4px; }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 2. Ortak HTML Yapısı
  const sharedHTML = `
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

    <header id="header" class="desktop-only">
      <a href="index.html" class="logo"><i class="fa-solid fa-leaf"></i>Birimçek</a>
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
        <button class="search-btn" onclick="window.executeSearch('desktop')" title="Ara"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div class="header-actions">
        <button class="video-upload-btn" onclick="window.toggleVideoModal()"><i class="fa-solid fa-video"></i> VİDEO</button>
        <button class="video-upload-btn" style="background:var(--primary);" onclick="window.toggleReceiptModal()"><i class="fa-solid fa-receipt"></i> FİŞ</button>
        <div class="points-badge" onclick="alert('Ödül Havuzu: 12 Puan')"><i class="fa-solid fa-star"></i> 12 Puan</div>
        <a href="hesabim.html" class="action-item" title="Hesabım"><i class="fa-regular fa-user"></i></a>
        <button class="action-item badge-icon" onclick="window.toggleCart()" title="Sepetim"><i class="fa-solid fa-basket-shopping"></i><span class="badge" id="cartBadgeDesktop">0</span></button>
      </div>
    </header>

    <div class="mobile-floating-header" id="mobileFloatingHeader">
      <div class="mf-default-content">
        <div class="mf-left"><button class="mf-menu-btn" onclick="window.toggleCategoryMenu()"><i class="fa-solid fa-bars"></i></button></div>
        <a href="index.html" class="mf-logo"><i class="fa-solid fa-leaf"></i>Birimçek</a>
        <div class="mf-right">
          <div class="points-badge" onclick="alert('Ödül Havuzu: 12 Puan')" style="font-size:0.65rem; padding: 3px 6px;"><i class="fa-solid fa-star"></i> 12 P</div>
          <button class="mf-search-btn" onclick="window.openMobileSearch()"><i class="fa-solid fa-magnifying-glass"></i></button>
          <a href="hesabim.html" class="mf-account"><i class="fa-regular fa-user"></i></a>
          <button class="mf-cart" onclick="window.toggleCart()"><i class="fa-solid fa-basket-shopping"></i><span class="badge" style="top:-5px; right:-5px;" id="cartBadgeMobile">0</span></button>
        </div>
      </div>
      <div class="mf-search-container" id="mfSearchContainer">
        <div class="mf-search-category">
          <button class="mf-search-cat-btn" onclick="window.toggleMfCatDropdown()">
            <span id="mfSelectedCatText">Tümü</span><i class="fa-solid fa-chevron-down" style="font-size: 0.6rem;"></i>
          </button>
          <div class="mf-category-dropdown" id="mfCatDropdownMenu">
            <div onclick="window.selectMfCategory('Tümü', 'Tümü')">Tüm Kategoriler</div>
            <div onclick="window.selectMfCategory('Meyve & Sebze', 'Meyve & Sebze')">Meyve & Sebze</div>
          </div>
        </div>
        <input type="text" class="mf-search-input" id="searchInputMobile" placeholder="Ürün, marka ara..." onkeypress="if(event.key==='Enter') window.executeSearch('mobile')">
        <button class="mf-search-submit" onclick="window.executeSearch('mobile')"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button class="mf-search-close" onclick="window.closeMobileSearch()"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>

    <nav class="desktop-only">
      <div class="nav-left">
        <button class="desktop-quick-search-btn" onclick="window.toggleCategoryMenu()"><i class="fa-solid fa-bars"></i> Tüm Kategoriler</button>
        <ul class="nav-links">
          <li><a href="index.html" class="active">Ana Sayfa</a></li>
          <li><a href="urunler.html">Tüm Ürünler</a></li>
          <li><a href="marketler.html">Marketler</a></li>
          <li><a href="firsatlar.html">Aktüel & Fırsatlar</a></li>
        </ul>
      </div>
    </nav>

    <div id="videoOverlay" class="drawer-overlay" onclick="window.toggleVideoModal()"></div>
    <div id="videoModal" class="custom-modal">
      <div class="modal-header">
        <h3><i class="fa-solid fa-video" style="color: var(--primary);"></i> Reyon Videosu Yükle</h3>
        <button class="modal-close" onclick="window.toggleVideoModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p>Yüksek çözünürlüklü reyon videosu yükle. Puan kazan!</p>
        <div class="upload-area">
          <i class="fa-solid fa-cloud-arrow-up"></i><span>Videoyu buraya sürükle veya seç</span><small>MP4, MOV</small>
          <input type="file" accept="video/*" id="videoInput" onchange="window.handleFileSelect(event, 'video')">
          <div id="fileNameDisplay"></div>
        </div>
        <button class="cart-checkout-btn" id="uploadSubmitBtn" onclick="window.submitUpload('video')" style="display:none;">Videoyu Gönder</button>
      </div>
    </div>

    <div id="receiptOverlay" class="drawer-overlay" onclick="window.toggleReceiptModal()"></div>
    <div id="receiptModal" class="custom-modal">
      <div class="modal-header">
        <h3><i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Fiş Yükle</h3>
        <button class="modal-close" onclick="window.toggleReceiptModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p>Alışveriş fişini yükleyerek puan kazan.</p>
        <div class="upload-area">
          <i class="fa-solid fa-file-arrow-up"></i><span>Fiş görselini seç</span><small>PNG, JPG</small>
          <input type="file" accept="image/*" id="receiptInput" onchange="window.handleFileSelect(event, 'receipt')">
          <div id="receiptNameDisplay" style="display:none;"></div>
        </div>
        <button class="cart-checkout-btn" id="receiptSubmitBtn" onclick="window.submitUpload('receipt')" style="display:none;">Fişi Gönder</button>
      </div>
    </div>

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
        <ul class="side-category-list">
          <li onclick="window.goToCategoryPage('Meyve & Sebze')"><i class="fa-solid fa-apple-whole"></i> Meyve & Sebze</li>
          <li onclick="window.goToCategoryPage('Et, Balık & Şarküteri')"><i class="fa-solid fa-drumstick-bite"></i> Et, Balık & Şarküteri</li>
          <li onclick="window.goToCategoryPage('Süt & Kahvaltılık')"><i class="fa-solid fa-cheese"></i> Süt & Kahvaltılık</li>
          <li onclick="window.goToCategoryPage('Temel Gıda')"><i class="fa-solid fa-wheat-awn"></i> Temel Gıda</li>
        </ul>
      </div>
    </div>

    <div id="cartOverlay" class="drawer-overlay" onclick="window.toggleCart()"></div>
    <div id="cartDrawer" class="side-drawer">
      <div class="drawer-header">
        <h3><i class="fa-solid fa-basket-shopping"></i> Alışveriş Sepetim</h3>
        <button class="drawer-close-btn" onclick="window.toggleCart()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="cart-body" id="cartBody">
        <div class="cart-empty-state"><i class="fa-solid fa-basket-shopping"></i><p>Sepetiniz henüz boş.</p></div>
      </div>
      <div class="cart-footer">
        <div class="market-limit-box">
          <label><i class="fa-solid fa-store"></i> En Fazla Kaç Markete Gidebilirsin?</label>
          <select id="marketLimitSelect" class="market-limit-select">
            <option value="1">Tek Market</option>
            <option value="2">En Fazla 2 Market</option>
          </select>
        </div>
        <div class="cart-total-row"><span>Tahmini Tutar:</span><strong id="cartTotalPrice">0.00 ₺</strong></div>
        <button class="cart-checkout-btn" onclick="alert('Rota oluşturuluyor...')">En Uygun Noktaları Gör</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', sharedHTML);
});
