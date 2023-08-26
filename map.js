import castle from './castle-geo.json' assert {type: 'json'};
// console.log(castle);
const map = L.map('map').setView([55.948612, -3.200833], 13);

getMap();


function getMap() {
  
  setupMap();
  getLayers();

}


function setupMap() {

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

    switch (des.type) {

      case 'Listed Building':
        const listed = createNewLayer(des.geometry, '#FFFFFF', 'Point');
        listedGroup.addLayer(listed).addTo(map);
        break;
      
      case 'Conservation Area':
        createNewLayer(des.geometry, '#FF0000').addTo(map);
        break;

      case 'Gardens and Designed Landscapes':
        createNewLayer(des.geometry, '#00FF00').addTo(map);
        break;
      
      case 'Scheduled Monument':
        createNewLayer(des.geometry, '#FFFF00').addTo(map);
        break;

      case 'World Heritage Site':
        createNewLayer(des.geometry, '#0000FF').addTo(map);
        break;

      default:
        console.log('switch default');
        return false;
      
    }

  }

  getBoundary();
  // map.setZoom(13);

}


function createNewLayer(geometry, fill, type = 'MultiPolygon') {

  if (type === 'Point') {

    return L.geoJSON(geometry, {

      pointToLayer: function(point, latlng) {
        
        return new L.CircleMarker(latlng, {
          radius: 10,
          color: '#000000',
          weight: 2,
          fillColor: fill,
          fillOpacity: 0.5,
        });

      }

    })

  } else {

    return L.geoJSON(geometry, {

      style: {
        color: '#000000',
        weight: 2,
        fillColor: fill,
        fillOpacity: 0.5,
      }

    })

  }
  
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
