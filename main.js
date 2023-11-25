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
        {
            name: "Orem Utah Temple",
            description: "Public Open House underway", 
            longitude: -111.71931, 
            latitude:  40.2708
        },
        {
            name: "Lindon Utah Temple",
            description: "Under Construction", 
            longitude: -111.7136112, 
            latitude:  40.343056
        },
        {
            name: "Mount Timpanogos Utah Temple",
            description: "49th temple dedicated", 
            longitude: -111.639779, 
            latitude: 40.263666 
        },
        {
            name: "Draper Utah Temple",
            description: "129th Dedicated Temple", 
            longitude: -111.840542, 
            latitude: 40.495533 
        },
        {
            name: "Oquirrh Mountain Utah Temple",
            description: "130th Dedicated Temple", 
            longitude:  -111.987510, 
            latitude: 40.551145 
        },
        {
            name: "Taylorsville Utah Temple",
            description: "Major Construction completed", 
            longitude: -111.954167, 
            latitude: 40.666944 
        },
        {
            name: "Salt Lake Temple",
            description: "4th Dedicated Temple", 
            longitude: -111.891944, 
            latitude: 40.770556 
        },
        {
            name: "Bountiful Utah Temple",
            description: "47th Dedicated Temple", 
            longitude: -111.846812, 
            latitude: 40.882853 
        },
        {
            name: "Layton Utah Temple",
            description: "Major Construction Finished", 
            longitude: -111.940251, 
            latitude: 41.062232 
        },
        {
            name: "Jordan River Utah Temple",
            description: "20th dedicated temple", 
            longitude: -111.931532, 
            latitude: 40.566135
        },
        {
            name: "Syracuse Utah Temple",
            description: "Under Construction", 
            longitude: -112.075833, 
            latitude:  41.099167
        },
        {
            name: "Ogden Utah Temple",
            description: "14th Dedicated Temple", 
            longitude: -111.976111, 
            latitude:  41.226111
        },
        {
            name: "Brigham City Utah Temple",
            description: "139th Dedicated Temple", 
            longitude: -112.022222, 
            latitude:  41.500833
        },
        {
            name: "Logan Utah Temple",
            description: "2nd Dedicated Temple", 
            longitude: -111.843889, 
            latitude:  41.734167
        },
        {
            name: "Smithfield Utah Temple",
            description: "Under Construction", 
            longitude: -111.833333, 
            latitude:  41.844167
        },
        {
            name: "Pocatello Idaho Temple",
            description: "170th Dedicated Temple", 
            longitude: -112.406389, 
            latitude:  42.915278
        },
        {
            name: "Idaho Falls Idaho Temple",
            description: "8th Dedicated Temple", 
            longitude: -112.041500, 
            latitude:  43.499817
        },
        {
            name: "Rexburg Idaho Temple",
            description: "125th Dedicated Temple", 
            longitude: -111.779088, 
            latitude: 43.810709
        },
        {
            name: "The Point of the Mountain",
            description: "This is where I-15 crosses the Traverse Mountains between Salt Lake and Utah counties.", 
            longitude: -106.4453331, 
            latitude:  "40.117750"
        },
        {
            name: "Weber Canyon",
            description: "North of Salt Lake City, I-15 crosses the Wasatch Mountains through Weber Canyon.", 
            longitude: -111.90232, 
            latitude:  41.1348
        },
        {
            name: "Malad Summit",
            description: "Located in Oneida County, Idaho, this pass is at an elevation of 6,129 feet (1,868 m).", 
            longitude: -112.2758343, 
            latitude:  42.350278
        },
        {
            name: "Monida Pass",
            description: "This pass is located on the border of Idaho and Montana.", 
            longitude: -112.3055084, 
            latitude: 44.558338
        }
    ];
    
    // Loop through the points of interest
    pointsOfInterest.forEach(function(poi) {
        // Fetch grid data for the point of interest
        fetch(`https://api.weather.gov/points/${poi.latitude},${poi.longitude}`)
            .then(response => response.json())
            .then(data => {
                // Fetch weather data for the point of interest
                return fetch(data.properties.forecast);
            })
            .then(response => response.json())
            .then(data => {
                // Define the attributes for the point of interest
                const attributes = {
                    Name: poi.name,
                    Description: poi.description,
                    Weather: `${data.properties.periods[0].shortForecast}, 
                    ${data.properties.periods[0].temperature}°${data.properties.periods[0].temperatureUnit}`
                };
        
                // Define the popup template for the point of interest
                const popupTemplate = {
                    title: "{Name}", // Set the title of the popup to the name of the point of interest
                    // Set the content of the popup to the description of the point of interest and the current weather
                    content: "{Description}<br>Current Weather: {Weather}" 
                };

                const point = {
                    type: "point",
                    longitude: poi.longitude,
                    latitude: poi.latitude
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
});
