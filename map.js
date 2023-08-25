import boundary from './boundary-geo.json' assert {type: 'json'};
import designations from './designations-geo.json' assert {type: 'json'};

const map = L.map('map').setView([55.948612, -3.200833], 13);

getMap();


function getMap() {
  
  setupMap(map);
  getBoundary();

}


function setupMap(map) {

  map.zoomControl.remove();
	L.control.zoom({position: 'bottomright'}).addTo(map);
  L.control.scale({maxWidth: 200}).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

}


function getBoundary() {

  const castle = L.geoJSON(boundary, {
    style: {	
      color: '#000000', 
      weight: 7.5
    }
  });

  castle.addTo(map);
  map.fitBounds(castle.getBounds());

}
