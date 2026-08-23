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
        console.error('Bir hata oluştu:', error);
    }
}

// Sayfa yüklendiğinde parçaları çağırıyoruz
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
});
