// @ts-ignore
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
// @ts-ignore
], function(esriConfig, Map, MapView, Graphic, GraphicsLayer) {

    // @ts-ignore
    esriConfig.apiKey = API_KEY; // Set your API key

    // Create a new Map instance
    const map = new Map({
        basemap: "arcgis/topographic" // Set the basemap style
    });
    
    // Create a new MapView instance
    const view = new MapView({
        map: map, // Set the map to the MapView
        center: [-112,42], // Set the center of the map (longitude, latitude)
        zoom: 8, // Set the initial zoom level
        container: "viewDiv" // Set the container id for the MapView
    });
    
    // Create a new GraphicsLayer instance
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer); // Add the GraphicsLayer to the map
    
    // Define the symbol for the points of interest
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Set the color of the marker (Orange)
        outline: {
            color: [255, 255, 255], // Set the color of the marker outline (White)
            width: 1 // Set the width of the marker outline
        }
    };
    
    // Define the points of interest
    const pointsOfInterest = [
        {
            name: "BYU Football Stadium", // Set the name of the point of interest
            description: "Home of the BYU Cougars", // Set the description of the point of interest
            longitude: -111.655, // Set the longitude of the point of interest
            latitude: 40.258 // Set the latitude of the point of interest
        },
        // Add more points of interest here...
    ];
    
    // Loop through the points of interest
    pointsOfInterest.forEach(function(poi) {
        // Create a point geometry for the point of interest
        const point = {
            type: "point",
            longitude: poi.longitude,
            latitude: poi.latitude
        };
        
        // Define the attributes for the point of interest
        const attributes = {
            Name: poi.name,
            Description: poi.description
        };
        
        // Define the popup template for the point of interest
        const popupTemplate = {
            title: "{Name}", // Set the title of the popup to the name of the point of interest
            content: "{Description}" // Set the content of the popup to the description of the point of interest
        };
        
        // Create a new Graphic instance for the point of interest
        const pointGraphic = new Graphic({
            geometry: point, // Set the geometry of the Graphic to the point
            symbol: simpleMarkerSymbol, // Set the symbol of the Graphic to the simpleMarkerSymbol
            attributes: attributes, // Set the attributes of the Graphic to the attributes
            popupTemplate: popupTemplate // Set the popupTemplate of the Graphic to the popupTemplate
        });
        graphicsLayer.add(pointGraphic); // Add the Graphic to the GraphicsLayer
    });
});
