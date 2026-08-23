// js/main.js

// Bileşenleri (Header & Footer) harici dosyalardan çeken fonksiyon
export async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            document.getElementById(id).innerHTML = await response.text();
        } else {
            console.error(`${file} yüklenemedi.`);
        }
    } catch (error) {
        console.error('Bileşen yüklenirken hata oluştu:', error);
    }
}

// Global Değişkenler
window.cart = [];
window.currentSearchCategory = "Tümü";
window.currentMfCategory = "Tümü";

// Arama ve Menü İşlevleri
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

window.closeUnitPopup = () => {
    document.getElementById("unitInfoPopup")?.classList.remove("active");
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
              <div class="cart-item-price">${item.price.Footer?.toFixed ? item.price.toFixed(2) : item.price} ₺</div>
            </div>
            <button class="cart-item-remove" onclick="window.removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i></button>
          </div>`;
    }).join('');
    if(totalEl) totalEl.innerText = total.toFixed(2) + " ₺";
};
