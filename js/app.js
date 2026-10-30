
// Footer year
document.querySelectorAll(".current-year").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// Initialize map
const map = L.map("fountain-map").setView(
  [40.7128, -74.0060],
  11
);

// NYC basemap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Create map layers
const fountainLayer = L.layerGroup().addTo(map);
const eighthLayer = L.layerGroup().addTo(map);
const quarterLayer = L.layerGroup().addTo(map);

// Load GeoJSON
async function loadLayer(url, layer, style, isFountain = false) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load ${url}`);
  }

  const data = await response.json();

  L.geoJSON(data, {
    style: style,

    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 5,
        fillColor: "#ef3333",
        color: "#ffffff",
        weight: 1,
        fillOpacity: 1
      });
    }
  }).addTo(layer);
}

// Load all three datasets
async function initializeMap() {
  try {
    await Promise.all([
      loadLayer(
        "data/fountains.geojson",
        fountainLayer,
        null,
        true
      ),

      loadLayer(
        "data/eighth.geojson",
        eighthLayer,
        {
          color: "#00bfff",
          weight: 2,
          opacity: 0.8
        }
      ),

      loadLayer(
        "data/quarter.geojson",
        quarterLayer,
        {
          color: "#a855f7",
          weight: 2,
          opacity: 0.7
        }
      )
    ]);

    console.log("All map layers loaded successfully.");

  } catch (error) {
    console.error("Map loading error:", error);
  }
}

initializeMap();

// Independent layer controls
const layerControls = [
  ["fountains", fountainLayer],
  ["eighth", eighthLayer],
  ["quarter", quarterLayer]
];

layerControls.forEach(([id, layer]) => {
  const checkbox = document.getElementById(id);

  if (!checkbox) return;

  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  });
});

