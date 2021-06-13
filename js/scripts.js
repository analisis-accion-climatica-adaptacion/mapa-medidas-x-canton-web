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
$.getJSON('https://tpb729-desarrollosigweb-2021.github.io/datos/atlasverde/gam-cantones-metricas.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'zonas_urb',
	  scale: ['yellow', 'brown'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.7
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('Cantón: ' + feature.properties.canton + '<br>' + 'Zonas urbanas: ' + feature.properties.zonas_urb.toLocaleString() + '%')
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, '% de zonas urbanas por cantón de la GAM');	

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


// Capa de coropletas de % de superficie verde en cantones de la GAM
$.getJSON('https://tpb729-desarrollosigweb-2021.github.io/datos/atlasverde/gam-cantones-metricas.geojson', function (geojson) {
  var capa_cantones_gam_coropletas_supverde = L.choropleth(geojson, {
	  valueProperty: 'sup_verde_',
	  scale: ['#90ee90', '#006400'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.7
	  },
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup('Cantón: ' + feature.properties.canton + '<br>' + 'Superficie verde : ' + feature.properties.sup_verde_.toLocaleString() + 'm2 por habitante')
	  }
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas_supverde, 'Superficie verde por hab. por cantón de la GAM');	

  // Leyenda de la capa de coropletas
  var leyenda_supverde = L.control({ position: 'bottomleft' })
  leyenda_supverde.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas_supverde.options.limits
    var colors = capa_cantones_gam_coropletas_supverde.options.colors
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
  leyenda_supverde.addTo(mapa)
});

