// Mapa Leaflet
var mapa = L.map('mapid').setView([9.6, -84.10], 8);


// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

var capa_osm2 = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {minZoom: 0, maxZoom: 13, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
);


// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm
};	    


// Control de mini mapa
var mini_map = new L.Control.MiniMap(capa_osm2, { toggleDisplay: true, position: 'bottomleft' }).addTo(mapa);

// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);
	    

// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_medidas = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['#feebe2', '#7a0177'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
        fillOpacity: 0.9
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('<strong>Provincia</strong>: ' + feature.properties.provincia + '<br>' + '<strong>Cantón</strong>: ' + feature.properties.canton + '<br>' + '<strong>Medidas</strong>: ' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_medidas, 'Medidas de acción climática');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'topright' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_medidas.options.limits
    var colors = capa_cantones_medidas.options.colors
    var labels = []

    // Título de la leyenda
    div.innerHTML = '<ul style="text-align: center;">Cantidad de medidas</ul><ul>&nbsp;</ul>'

    // Agregar mínimo y máximo
    div.innerHTML += '<div class="labels"><div class="min">' + limits[0] + '</div>' + '<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa);   
});
