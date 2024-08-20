// Inicializa el mapa
var map = L.map('map').setView([-32.62018, -60.15495], 15); // Configura la vista inicial con un zoom alto y coordenadas

// mapa de OpenStreetMap con zoom maximo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 14,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Convertir OSM a GeoJSON
fetch('map.osm')  // Reemplaza 'map.osm' con la ruta del archivo OSM
    .then(response => response.text())
    .then(osmData => {
        var geojson = osmtogeojson(new DOMParser().parseFromString(osmData, 'text/xml'));
        
        // Añadir el GeoJSON al mapa
        L.geoJSON(geojson).addTo(map);
        
        // Ajustar la vista del mapa al contenido del GeoJSON
        map.fitBounds(L.geoJSON(geojson).getBounds());
    });

// Definir la ruta verde con coordenadas
var rutaGreen = [
    [-32.613218, -60.145160], //ruta de ejemplo
    [-32.621141, -60.156428], //ruta de ejemplo
    // Agrega más coordenadas
];

// Dibujar la ruta verde en el mapa
var rutaLayerGreen = L.polyline(rutaGreen, { color: 'green', weight: 10 }).addTo(map);

// Crear un icono personalizado verde
var customColoredIconGreen = L.icon({
    iconUrl: 'parada-verde.png',  // Ruta icono
    iconSize: [35, 41],  // Tamaño del icono [ancho, alto]
    iconAnchor: [12, 41],  // Punto de anclaje del icono [x, y]
    popupAnchor: [1, -34], // Punto de anclaje del popup [x, y]
});

// Agregar marcadores en las paradas verdes
var paradasGreen = [
    { coords: [-32.621051, -60.156423], nombre: "Parada de ejemplo" },
    { coords: [-32.618918, -60.153081], nombre: "Parada de ejemplo" },
    { coords: [-32.618762, -60.154513], nombre: "Parada de ejemplo" },
    { coords: [-32.613912, -60.146005], nombre: "Parada de ejemplo" },
    { coords: [-32.623680, -60.164743], nombre: "Parada Gato Negro"}
];

paradasGreen.forEach(function(parada) {
    L.marker(parada.coords, { icon: customColoredIconGreen })
        .addTo(map)
        .bindPopup(`<b>${parada.nombre}</b>`);
});

// Definir la ruta naranja
var rutaOrange = [
    [-32.619632, -60.142481], //ruta de ejemplo
    [-32.623509, -60.147242], //ruta de ejemplo
    // Agrega más coordenadas
];

// Dibujar la ruta naranja en el mapa 
var rutaLayerOrange = L.polyline(rutaOrange, { color: 'orange', weight: 10 }).addTo(map);

// Crear un icono personalizado naranja
var customColoredIconOrange = L.icon({
    iconUrl: 'parada-naranja.png',  // Ruta icono
    iconSize: [35, 41],  // Tamaño del icono [ancho, alto]
    iconAnchor: [12, 41],  // Punto de anclaje del icono [x, y]
    popupAnchor: [1, -34], // Punto de anclaje del popup [x, y]
});

// Agregar marcadores en las paradas naranjas
var paradasOrange = [
    { coords: [-32.623583, -60.147234], nombre: "Parada de ejemplo" },
    { coords: [-32.621758, -60.145163], nombre: "Parada de ejemplo" },
    { coords: [-32.620229, -60.143106], nombre: "Parada de ejemplo" },
    { coords: [-32.622180, -60.142462], nombre: "Parada de ejemplo" }
];

paradasOrange.forEach(function(parada) {
    L.marker(parada.coords, { icon: customColoredIconOrange })
        .addTo(map)
        .bindPopup(`<b>${parada.nombre}</b>`);
});

// Ajustar la vista del mapa para mostrar las rutas
var group = new L.featureGroup([rutaLayerGreen, rutaLayerOrange]);
map.fitBounds(group.getBounds());

// Obtener la ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // Icono de la persona
        var userIcon = L.icon({
            iconUrl: 'persona.png', 
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Añadir un marcador para la ubicación del usuario
        var userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map)
            .bindPopup('Estás aquí')
            .openPopup();

        // Ajustar la vista del mapa para centrar en la ubicación del usuario
        map.setView([lat, lon], 15);
    }, function() {
        alert("No se pudo obtener tu ubicación.");
    });
} else {
    alert("La geolocalización no es compatible con este navegador.");
}