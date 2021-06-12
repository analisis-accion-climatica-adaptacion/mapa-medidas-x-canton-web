# Mapa de medidas de acción climática por cantón - versión web
Este repositorio contiene el código fuente de un programa que construye un mapa que muestra la cantidad de medidas de acción climática en cada cantón de Costa Rica. Se programó en el lenguaje [JavaScript](https://en.wikipedia.org/wiki/JavaScript), con la biblioteca [Leaflet](https://leafletjs.com/).

El mapa puede verse en:


## Entradas
**Capa geoespacial de cantones de Costa Rica**  
Archivo: ```datos/cantones.geojson```
Se obtuvo del nodo del Instituto Geográfico Nacional (IGN) en el [Sistema Nacional de Información Territorial (SNIT)](https://www.snitcr.go.cr/), con el comando [ogr2ogr](https://gdal.org/programs/ogr2ogr.html#ogr2ogr) de la biblioteca [Geospatial Data Abstraction Library (GDAL)](https://gdal.org/).
```sh
cd datos
ogr2ogr -t_srs EPSG:4326 -makevalid cantones.geojson WFS:"http://geos.snitcr.go.cr/be/IGN_5/wfs" "IGN_5:limitecantonal_5k"
```

## Procesamiento

## Salidas
