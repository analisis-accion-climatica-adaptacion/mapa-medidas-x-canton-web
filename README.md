# Mapa de medidas de acción climática por cantón - versión web
Este repositorio contiene el código fuente de un programa que construye un mapa que muestra la cantidad de medidas de acción climática en cada cantón de Costa Rica. Se programó en el lenguaje [JavaScript](https://en.wikipedia.org/wiki/JavaScript), con la biblioteca [Leaflet](https://leafletjs.com/).

El mapa puede verse en:


## Entradas
**1. Archivo GeoJSON con capa geoespacial de cantones de Costa Rica**  

Nombre del archivo: ```datos/cantones.geojson```  

Se obtuvo del nodo del Instituto Geográfico Nacional (IGN) en el [Sistema Nacional de Información Territorial (SNIT)](https://www.snitcr.go.cr/), con el comando [ogr2ogr](https://gdal.org/programs/ogr2ogr.html#ogr2ogr) de la biblioteca [Geospatial Data Abstraction Library (GDAL)](https://gdal.org/):
```sh
$ cd datos
$ ogr2ogr -t_srs EPSG:4326 -makevalid -nln cantones cantones.geojson WFS:"http://geos.snitcr.go.cr/be/IGN_5/wfs" "IGN_5:limitecantonal_5k"
```

**2. Archivo CSV con datos de medidas de acción climática en adaptación por cantón**  

Nombre del archivo: ```datos/medidas-adaptacion-x-canton.csv```  

Se obtuvo al realizar el siguiente procedimiento:  

a. Se obtuvieron los campos ```cod_canton``` y ```canton``` con los siguientes comandos:
```sh
$ cd datos
$ ogr2ogr temp.csv cantones.geojson
$ cut -d, -f4-5 temp.csv > medidas.csv
$ rm temp.csv
```

b. Se abrió el archivo en Calc y se ordenó por ```cod_canton```.

c. Se agregó manualmente una columna llamada ```provincia``` con el nombre de la provincia.

d. Se agregó manualmente una columna llamada ```medidas``` con la cantidad de medidas de acción climática para cada cantón, provenientes del archivo ```datos/originales/Acciones de adaptación por cantón EVC.xlsx```, proporcionado por Erick Vargas.

e. El archivo se guardó y se publicó también en la dirección [https://drive.google.com/drive/folders/1q0Nt_ohZvVyT4HHexorfUXUgg14rm_4x?usp=sharing](https://drive.google.com/drive/folders/1q0Nt_ohZvVyT4HHexorfUXUgg14rm_4x?usp=sharing).

**3. Archivo GeoJSON con capa geoespacial de cantones + columna ```medidas``` del archivo CSV con datos de medidas de acción climática**  

Nombre del archivo: ```datos/cantones-medidas.geojson```  

Se obtuvo con el siguiente [ogr2ogr](https://gdal.org/programs/ogr2ogr.html#ogr2ogr) de la biblioteca [Geospatial Data Abstraction Library (GDAL)](https://gdal.org/):
```sh
$ cd datos
$ ogr2ogr -sql "select cantones.*, medidas.medidas from cantones left join 'medidas.csv'.medidas on cantones.cod_canton = medidas.cod_canton" cantones-medidas.geojson cantones.geojson
```

## Procesamiento

## Salidas
