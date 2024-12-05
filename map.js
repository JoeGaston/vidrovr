// Derived from ESRI/ GeoJSON documentation

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer"
], function (Map, MapView, GeoJSONLayer) {
  // Initialize the map
  const map = new Map({
      basemap: "streets-navigation-vector"
  });

  // Initialize the map frontend
  const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [120.987, 14.612], // Adjust to yourr area
      zoom: 4
  });

  // more copy/pasted ESRI documentation
  const geoJsonLayer = new GeoJSONLayer({
      url: "http://localhost:4000/batch-data", // Your server endpoint
      popupTemplate: {
          title: "Asset Information",
          content: "ID: {id} <br> Text: {text}"
      },
      renderer: {
          type: "simple", // Apply a simple renderer
          symbol: {
              type: "simple-marker",
              color: "red",
              size: 8,
              outline: {
                  color: "black",
                  width: 1
              }
          }
      }
  });

  // Add the layer to the map
  map.add(geoJsonLayer);

  // Debugging: Check if the GeoJSONLayer is loading correctly
  geoJsonLayer.when(() => {
      console.log("GeoJSONLayer loaded successfully.");
  }).catch((error) => {
      console.error("Error loading GeoJSONLayer:", error);
  });
});
