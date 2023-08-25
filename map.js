import castle from './castle-geo.json' assert {type: 'json'};

const map = L.map('map').setView([55.948612, -3.200833], 13);

getMap();


function getMap() {
  
  setupMap(map);
  getLayers();

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


function getLayers() {

  const listedGroup = new L.LayerGroup();

  for (const des of castle.designations) {

    if (des.type === 'Listed Buildings') {

      //create new layer
      //add to layer group
      // add layer group to map

    }

  }

  getBoundary();

}


function getBoundary() {

  const boundary = L.geoJSON(castle.boundary, {
    style: {	
      color: '#000000', 
      weight: 7.5
    }
  });

  boundary.addTo(map);
  map.fitBounds(boundary.getBounds());

}
