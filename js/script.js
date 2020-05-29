// Setup Map in Div
var map = L.map('map', {
	center: [ 23.685, 90.3563 ],
	zoom: 7,
	minZoom: 6,
	maxZoom: 20
});

// Load Tile Layer (OpenStreetMap)
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution:
		'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Load TopoJson Data & Adding TopoJson Data to Map
const MAP_TOPOJSON_URL = 'maps/bangladesh_upazila_boundary_topojson.json';
var customLayer = L.geoJson(null, {
	// http://leafletjs.com/reference.html#geojson-style
	style: function(feature) {
		return {
			weight: 1,
			opacity: 0.5,
			fillOpacity: 0
		};
	},
	onEachFeature: function(feature, layer) {
		// ? properties:
		// Area: 221.351068748
		// Dist_ID: "48"
		// Dist_name: "Kishoreganj"
		// Div_ID: "30"
		// Divi_name: "Dhaka"
		// Upaz_name: "Katiadi Upazila"
		// Upz_ID: "45"
		// Upz_UID: 304845

		layer.bindPopup(
			`<ul>
				<li>Upaz_name - ${feature.properties.Upaz_name}</li>
				<li>Dist_name - ${feature.properties.Dist_name}</li>
				<li>Divi_name - ${feature.properties.Divi_name}</ul>
			</ul>`
		);
	}
});
omnivore.topojson(MAP_TOPOJSON_URL, null, customLayer).addTo(map);
