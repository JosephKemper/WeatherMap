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
            longitude: -111.655, // Set the longitude of the point of interest
            latitude: 40.258 // Set the latitude of the point of interest
        },
        {
            name: "Orem Utah Temple",
            longitude: -111.71931, 
            latitude:  40.2708
        },
        {
            name: "Lindon Utah Temple",
            longitude: -111.7136112, 
            latitude:  40.343056
        },
        {
            name: "Mount Timpanogos Utah Temple", 
            longitude: -111.770590, 
            latitude: 40.392786 
        },
        {
            name: "Draper Utah Temple",
            longitude: -111.840542, 
            latitude: 40.495533 
        },
        {
            name: "Oquirrh Mountain Utah Temple",
            longitude:  -111.987510, 
            latitude: 40.551145 
        },
        {
            name: "Taylorsville Utah Temple",
            longitude: -111.954167, 
            latitude: 40.666944 
        },
        {
            name: "Salt Lake Temple",
            longitude: -111.891944, 
            latitude: 40.770556 
        },
        {
            name: "Bountiful Utah Temple",
            longitude: -111.846812, 
            latitude: 40.882853 
        },
        {
            name: "Layton Utah Temple",
            longitude: -111.940251, 
            latitude: 41.062232 
        },
        {
            name: "Jordan River Utah Temple",
            longitude: -111.931532, 
            latitude: 40.566135
        },
        {
            name: "Syracuse Utah Temple",
            longitude: -112.075833, 
            latitude:  41.099167
        },
        {
            name: "Ogden Utah Temple",
            longitude: -111.976111, 
            latitude:  41.226111
        },
        {
            name: "Brigham City Utah Temple",
            longitude: -112.022222, 
            latitude:  41.500833
        },
        {
            name: "Logan Utah Temple",
            longitude: -111.843889, 
            latitude:  41.734167
        },
        {
            name: "Smithfield Utah Temple",
            longitude: -111.833333, 
            latitude:  41.844167
        },
        {
            name: "Pocatello Idaho Temple",
            longitude: -112.406389, 
            latitude:  42.915278
        },
        {
            name: "Idaho Falls Idaho Temple",
            longitude: -112.041500, 
            latitude:  43.499817
        },
        {
            name: "Rexburg Idaho Temple",
            longitude: -111.779088, 
            latitude: 43.810709
        },
        {
            name: "The Point of the Mountain",
            longitude: -106.4453331, 
            latitude:  "40.117750"
        },
        {
            name: "Weber Canyon",
            longitude: -111.90232, 
            latitude:  41.1348
        },
        {
            name: "Malad Summit",
            longitude: -112.2758343, 
            latitude:  42.350278
        }
    ];
    
// Loop through the points of interest
pointsOfInterest.forEach(function(poi) {
    // Fetch grid data for the point of interest
    fetch(`https://api.weather.gov/points/${poi.latitude},${poi.longitude}`)
        .then(response => response.json())
        .then(data => {
            // Fetch 7-day forecast data for the point of interest
            return fetch(data.properties.forecast);
        })
        .then(response => response.json())
        .then(forecastData => {
            // Fetch alert data for the point of interest
            return fetch(`https://api.weather.gov/alerts/active?point=${poi.latitude},${poi.longitude}`)
                .then(response => response.json())
                .then(alertData => {
                    return { forecastData, alertData };
                });
        })
        .then(data => {
            // Define the attributes for the point of interest
            const attributes = {
                Name: poi.name,
                Forecast: data.forecastData.properties.periods.map(period => `${period.name}: ${period.shortForecast}, ${period.temperature}°${period.temperatureUnit}`).join('<br>'),
                Alerts: data.alertData.features.length > 0 ? data.alertData.features.map(feature => feature.properties.headline).join('<br>') : 'No alerts'

            };
            
            // Define the popup template for the point of interest
            const popupTemplate = {
                title: "{Name}", // Set the title of the popup to the name of the point of interest
                content: "7-Day Forecast:<br>{Forecast}<br>Alerts:<br>{Alerts}" // Set the content of the popup to the description of the point of interest, the 7-day forecast, and the alerts
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
