require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    esriConfig.apiKey = API_KEY;

    const map = new Map({
        basemap: "arcgis/topographic" // basemap styles service
    });

    const view = new MapView({
        map: map,
        center: [-112, 42], // Longitude, latitude
        zoom: 8, // Zoom level
        container: "viewDiv" // Div element
    });

});