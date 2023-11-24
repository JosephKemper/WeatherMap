import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";

const map = new ArcGISMap ({
    basemap: "topo"
});

const view = new MapView ({
    map,
    container: "viewDiv",
    center: [-118, 34],
    zoom: 8
});

view.when(()=>{
    console.log("view ready");
});