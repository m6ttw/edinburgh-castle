import castle from './castle-geo.json' assert {type: 'json'};
// console.log(castle);
const map = L.map('map').setView([55.948612, -3.200833], 13);
  
setupMap();
getLayers();
getBoundary();


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

  const layers = {};
  const listedGroup = new L.LayerGroup();
  const colours = {
    listed: '#000000',
    consarea: '#FF0000',
    garden: '#00FF00',
    monument: '#FFFF00',
    world: '#0000FF',
  };

  for (const des of castle.designations) {

    const popup = `
      ${des.type}
      <br>
      <a target="_blank" href="${des.url}">${des.title}</a>
      <br>
      ${des.number}
    `;

    switch (des.type) {

      case 'Listed Building':
        const listed = createNewLayer(des.geometry, colours.listed, popup, 'Point');
        listedGroup.addLayer(listed).addTo(map);
        layers['Listed Buildings'] = listedGroup;
        console.log(layers);
        break;
      
      case 'Conservation Area':
        createNewLayer(des.geometry, colours.consarea, popup).addTo(map);
        break;

      case 'Gardens and Designed Landscapes':
        createNewLayer(des.geometry, colours.garden, popup).addTo(map);
        break;
      
      case 'Scheduled Monument':
        createNewLayer(des.geometry, colours.monument, popup).addTo(map);
        break;

      case 'World Heritage Site':
        createNewLayer(des.geometry, colours.world, popup).addTo(map);
        break;

      default:
        console.log('switch default');
        return false;
      
    }

  }

  L.control.layers('', layers, {}).addTo(map);

}


function createNewLayer(geometry, fill, popup, type = 'MultiPolygon') {

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

    }).bindPopup(popup);

  } else {

    return L.geoJSON(geometry, {

      style: {
        color: '#000000',
        weight: 2,
        fillColor: fill,
        fillOpacity: 0.5,
      }

    }).bindPopup(popup);

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
