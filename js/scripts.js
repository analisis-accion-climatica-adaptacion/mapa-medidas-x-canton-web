// Mapa Leaflet
var mapa = L.map('mapid').setView([9.6, -84.10], 8);


// Definición de capas base
var capa_stamen_lite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(mapa);	

// Conjunto de capas base
var capas_base = {
  "Stamen Toner Lite": capa_stamen_lite
};	    


// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);
	    

// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_medidas_gnbu = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['#f0f9e8', '#0868ac'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 1.0
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('<strong>Provincia</strong>: ' + feature.properties.provincia + '<br>' + '<strong>Cantón</strong>: ' + feature.properties.canton + '<br>' + '<strong>Medidas</strong>: ' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_medidas_gnbu, 'Medidas de acción climática (GnBu)');	
});


// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_medidas_orrd = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['#fef0d9', '#b30000'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 1.0
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('<strong>Provincia</strong>: ' + feature.properties.provincia + '<br>' + '<strong>Cantón</strong>: ' + feature.properties.canton + '<br>' + '<strong>Medidas</strong>: ' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_medidas_orrd, 'Medidas de acción climática (OrRd)');	
});


// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_medidas_rdpu = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['#feebe2', '#7a0177'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 1.0
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('<strong>Provincia</strong>: ' + feature.properties.provincia + '<br>' + '<strong>Cantón</strong>: ' + feature.properties.canton + '<br>' + '<strong>Medidas</strong>: ' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_medidas_rdpu, 'Medidas de acción climática (RdPu)');	
});


// Capa de coropletas de medidas de acción climática en adaptación en los cantones de Costa Rica
$.getJSON('https://raw.githubusercontent.com/analisis-accion-climatica-adaptacion/mapa-medidas-x-canton-web/main/datos/cantones-medidas.geojson', function (geojson) {
  var capa_cantones_medidas_ylgnbu = L.choropleth(geojson, {
	  valueProperty: 'medidas',
	  scale: ['#ffffcc', '#253494'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 1.0
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('<strong>Provincia</strong>: ' + feature.properties.provincia + '<br>' + '<strong>Cantón</strong>: ' + feature.properties.canton + '<br>' + '<strong>Medidas</strong>: ' + feature.properties.medidas)
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_medidas_ylgnbu, 'Medidas de acción climática (YlGnBu)');	
});
