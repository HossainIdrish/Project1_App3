require([
    "esri/config", 
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Legend", 
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/widgets/LayerList" // Import the LayerList widget
], function (esriConfig, WebScene, SceneView, Legend, FeatureLayer, Search, LayerList) {

    esriConfig.apiKey =  "AAPK6221ccc708944717801b1e737e84e229ARkRORCTCsMHPkG82l8m647wlPBVSru5T3Z9cJ0JjaSyfYk-s0mQw-UiHP3Xv8jT"; 

    const webscene = new WebScene({
        portalItem: {
            id: "738fb62eba4c468998db87c0e5c9d71d"
        }
    });

    const view = new SceneView({
        container: "viewDiv",
        map: webscene
    });

    const legend = new Legend ({
        view: view
    });

    view.ui.add(legend, "top-right");

    const countyprklayer = new FeatureLayer({
        url: "https://services2.arcgis.com/w657bnjzrjguNyOy/arcgis/rest/services/Park_Boundaries/FeatureServer"
    });

    webscene.add(countyprklayer);

    var template = {
        title: "{stop_name}"
    };  

    const metrolayer = new FeatureLayer({
        url: "https://services8.arcgis.com/gQbFGrxM4JkVjXE0/arcgis/rest/services/Metro_St_Louis_transit_routes/FeatureServer", 
        outFields: ["*"],
        popupTemplate: template
    });

    webscene.add(metrolayer, 0);

    metrolayer.renderer = {
        type: "simple",  
        symbol: {
            type: "simple-marker",  
            size: 6,
            color: "red",
            outline: {  
                width: 0.5,
                color: "white"
            }
        }
    };

    // Create a Search widget instance
    const searchWidget = new Search({
        view: view // Set the view to the SceneView
    });

    // Add the Search widget to the view's UI
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
    });

    // Create a LayerList widget instance
    const layerList = new LayerList({
        view: view // Reference to the SceneView
    });

    // Add the LayerList widget to the view's UI
    view.ui.add(layerList, {
        position: "bottom-right"
    });
});
