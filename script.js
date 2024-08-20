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
    [-32.59520541742261, -60.18228476716766],
    [-32.59496355866709, -60.18155751508729],
    [-32.594872189634, -60.18016042556449],
    [-32.59515167108892, -60.17949696752626],
    [-32.59547414860758, -60.17902489161444],

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
    [-32.639515015676224, -60.14822918565247],
    [-32.63996859006622, -60.14892713747747],
    [-32.63965556009932, -60.1492609405242],
    [-32.639023108456534, -60.14872989022257],
    [-32.63567551209199, -60.15209067992477],
    [-32.63542635392439, -60.152174130686454],
    [-32.6343344468855, -60.15344266480628],
    [-32.63296724225386, -60.1547247719558],
    [-32.63135172312609, -60.15645337611832],
    [-32.627394143816296, -60.151807790152915],
    [-32.62231589764984, -60.156625037213175],
    [-32.624827948640174, -60.15961838221884],
    [-32.619848958782335, -60.164693121677374],
    [-32.618981447630894, -60.16549778437947],
    [-32.61880071508831, -60.16556215738875],
    [-32.618104891392974, -60.16539049603067], //Curva de angel balbi
    [-32.618041634425225, -60.16535830952604], //Curva de angel balbi
    [-32.617888010174624, -60.165165190498215], //Curva de angel balbi
    [-32.619270618940135, -60.163867001477826], //Curva de angel balbi
    [-32.616928402010736, -60.160460998926105],
    [-32.62111283238019, -60.15639364213267],
    [-32.614927054551366, -60.1476100062863],
    [-32.61087118944253, -60.152139111948344],
    [-32.61030426312906, -60.151351255555646],
    [-32.60973464636721, -60.150566588939036],
    [-32.606881134229475, -60.14672618775474],
    [-32.61066766718248, -60.14287941521653],
    [-32.61121309649179, -60.14225742338629],
    [-32.61429753083675, -60.13906134185284],
    [-32.613851530361494, -60.13841064270737],
    [-32.61398586808782, -60.138340469270105],
    [-32.61442918115481, -60.13904858304607],
    [-32.61356136017832, -60.139928940731735],
    [-32.61701378700648, -60.14390330931523],
    [-32.61912011449104, -60.14151435080672],
    [-32.61962250699084, -60.14090830748496],
    [-32.62100877330674, -60.13934854321997],
    [-32.624801582354735, -60.14428575490893],
    [-32.625481298329376, -60.143601294807134],
    [-32.625634423427826, -60.143435430319066],
    [-32.62617438880984, -60.1428389560378],
    [-32.62762233955713, -60.14136531379678],
    [-32.62649303923538, -60.13982434347956],
    [-32.625512273568994, -60.13853844301175],
    [-32.62483039663805, -60.137594659507684],
    [-32.62389290385031, -60.136280377091694],
    [-32.62324455971947, -60.1354569389365],
    [-32.6221059928149, -60.13386638897623],
    [-32.62134242197222, -60.13265671270874],
    [-32.62115848651575, -60.13242162404216],
    [-32.62100938582039, -60.13242967066935],
    [-32.62085802576959, -60.13233042893387],
    [-32.620806066290164, -60.13213999209008],
    [-32.6208512484479, -60.13197101291884],
    [-32.619934046154796, -60.13083643851484],
    [-32.619344411156746, -60.130114924282125],
    [-32.619071054146396, -60.12968577084521],
    [-32.619084455568874, -60.12967707507771],
    [-32.619688562189005, -60.13043039869971],
    [-32.62030406284627, -60.131179211416296],
    [-32.62089296383463, -60.13192351321291],
    [-32.62105633568044, -60.131905469533],
    [-32.621200710551825, -60.13198666609263],
    [-32.62126529925946, -60.132221233895976],
    [-32.62118171389629, -60.13236558333532],
    [-32.62146666368747, -60.132735478742724],
    [-32.62216573664171, -60.133858697817615],
    [-32.62333971101905, -60.1354916508296],
    [-32.62442510835525, -60.13690946039914],
    [-32.62931864418652, -60.14364948182741],
    [-32.635438755775105, -60.15215202681684],
    [-32.63573263456586, -60.1520230574702],
    [-32.639540349890716, -60.14819994243414],
    [-32.639061219651836, -60.14754750920643],
    [-32.63931675610202, -60.146151605569344],
    [-32.64162293954488, -60.1437770521036],
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