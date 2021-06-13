// Mapa Leaflet
var mapa = L.map('mapid').setView([9.9, -84.10], 10);


// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm
};	    


// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);
	    

// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['yellow', 'brown'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.7
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('Cantón: ' + feature.properties.canton + '<br>' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Medidas de acción climática');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});




