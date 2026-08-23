import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// BİLEŞENLERİ DİNAMİK YÜKLEME FONKSİYONU
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const html = await response.text();
            document.getElementById(id).innerHTML = html;
        } else {
            console.error(`${file} yüklenemedi.`);
        }
    } catch (error) {
        console.error('Bileşen yükleme hatası:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // Header ve Footer'ı eşzamanlı olarak sayfaya enjekte et
    await loadComponent('header-container', 'components/header.html');
    await loadComponent('footer-container', 'components/footer.html');
});

// --- GLOBAL DEĞİŞKENLER VE FONKSİYONLAR ---
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
    document.getElementById("categoryDrawer")?.classList.toggle("active");
    document.getElementById("categoryOverlay")?.classList.toggle("active");
};

window.toggleCart = () => {
    document.getElementById("cartDrawer")?.classList.toggle("active");
    document.getElementById("cartOverlay")?.classList.toggle("active");
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
            <button class="cart-item-remove" onclick="window.removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i></button>
          </div>`;
    }).join('');
    if(totalEl) totalEl.innerText = total.toFixed(2) + " ₺";
};

// Supabase Bağlantısı
const SUPABASE_URL = "https://lejkdyhensjyauburrxk.supabase.co";
const SUPABASE_KEY = "YOUR_KEY_HERE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
