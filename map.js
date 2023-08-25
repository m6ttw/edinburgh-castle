import boundary from './boundary-geo.json' assert {type: 'json'};
import designations from './designations-geo.json' assert {type: 'json'};

console.log(boundary);
console.log(designations);

const map = L.map('map').setView([55.948612, -3.200833], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);