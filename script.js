const map = L.map('leaflet-map').setView([41.804, 1.823], 15);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // alterna la clase
  hamburger.classList.toggle('open'); // opcional, para animar las barras
});

document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "src/components/booking.html";
  });
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([41.804, 1.823]).addTo(map)
  .bindPopup('Castillo de Sant Angelo')
  .openPopup();

