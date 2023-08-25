import boundary from './boundary-geo.json' assert {type: 'json'};
import designations from './designations-geo.json' assert {type: 'json'};

console.log(boundary);
console.log(designations);

const map = L.map('map').setView([55.948612, -3.200833], 13);



function setupMap(map) {

  map.zoomControl.remove();
	L.control.zoom({position: 'bottomright'}).addTo(map);
  L.control.scale({maxWidth: 200}).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

}

setupMap(map);