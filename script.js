const map = L.map('leaflet-map').setView([41.804, 1.823], 15);

document.getElementById("book-btn").addEventListener("click", () => {
    window.location.href = "src/components/booking.html";
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([41.804, 1.823]).addTo(map)
  .bindPopup('Castillo de Cardona')
  .openPopup();

