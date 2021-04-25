// function createFeatures(blue_fin_whales) {
d3.csv("resources/blue_fin_whales_gps.csv").then((data) => {

  // console.log(blue_fin_whales)

  var whale_id_filter = data.map(row => row.DeploymentID);
  // console.log("whale_ids: ",whale_ids)

  var id_filter = whale_id_filter.filter((x, index) =>{
      return whale_id_filter.indexOf(x) === index;
  });

  console.log("id_filter: ", id_filter);

  var whale_id = d3.select("#selDataset");
  id_filter.map((id) => {
      whale_id
        .append("option")
        .property("value", id)
        .text(id);
    });

  var legend = L.control({position: 'topright'});
  legend.onAdd = function (myMap) {
      whale_id
      var div = L.DomUtil.create('div', 'selDataset');
      div.innerHTML = '<select id = selDataset><option>Select Whale </option></select>;';
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
  };
  // legend.addTo(myMap);
console.log("id_filter[0]", id_filter[0])
createMap(id_filter[0])
});
// // --------------------------------------------------------
//   var whales = whale_ids.map(whale => L.circleMarker([whale.latitude,whale.longitude], {
//     color: "red",
//     fillColor: (whale.timestamp_gmt),
//     fillOpacity: 0.75,
//     radius: 1})
//     .bindPopup("whale-marker"))

//   whales=L.layerGroup(whales)

//   // Sending our whales layer to the createMap function
//   createMap(whales);
// });
// // ----------------------------------------------------
var dropdown = d3.select("#selDataset").on("change", createMap);
// var dropdown = d3.select("#leaflet-interactive").on("change", createMap);

function createMap(id_filter) {
    if (id_filter == "2014CA-MK10-05644") {
        var id_selected = "2014CA-MK10-05644"
    }
    else if (id_selected === undefined){
      var id_selected = "2014CA-MK10-05644"
    }
    else{
    console.log(this.value)
    var id_selected = this.value
    // console.log("id_selected: ", id_selected);
    }
    console.log("id_selected: ", id_selected);

    d3.csv("resources/blue_fin_whales_gps.csv").then((data) => {

      select_map = d3.select("#map")

      var whale_ids = data.filter(row => row.DeploymentID == id_selected);

      select_map.html("");

      var whales = whale_ids.map(whale => L.circleMarker([whale.latitude,whale.longitude], {
      color: "red",
      fillColor: (whale.timestamp_gmt),
      fillOpacity: 0.75,
      radius: 1})
      .bindPopup("whale-marker"))

      whales=L.layerGroup(whales)

      // Define streetmap and darkmap layers
      var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });

      // Define a baseMaps object to hold our base layers
      var baseMaps = {
        "Light Map": lightmap
        // "Dark Map": darkmap
      };

      // Create overlay object to hold our overlay layer
      var overlayMaps = {
        "Whales": whales
      };

      // Create our map, giving it the streetmap and earthquakes layers to display on load
      var myMap = L.map("map", {
        center: [
          34.0522, -122.4194
        ],
        zoom: 7,
        layers: [lightmap, whales]
      });

      // Create a layer control
      // Pass in our baseMaps and overlayMaps
      // Add the layer control to the map

      var legend = L.control({position: 'topright'});
      legend.onAdd = function (myMap) {
          var div = L.DomUtil.create('div', 'selDataset');
          div.innerHTML = '<select id = selDataset><option>Select Whale </option></select>;';
          div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
          return div;
      };
      legend.addTo(myMap);

      var whale_id_filter = data.map(row => row.DeploymentID);
      // console.log("whale_ids: ",whale_ids)
    
      var id_filter = whale_id_filter.filter((x, index) =>{
          return whale_id_filter.indexOf(x) === index;
      });
    
      // console.log("id_filter: ", id_filter);
    
      var whale_id = d3.select("#selDataset");
      id_filter.map((id) => {
          whale_id
            .append("option")
            .property("value", id)
            .text(id);
        });
    
      // Sending our whales layer to the createMap function
      // createMap(whales);
      });
      // console.log("data", data);

      // var mapping = d3.select('map')

      // mapping.html("")

      // var mapping = data.






    // createMap(whales);
    };
    
// };

// function createMap(whales) {

//   // Define streetmap and darkmap layers
//   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Light Map": lightmap
//     // "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     "Whales": whales
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       34.0522, -122.4194
//     ],
//     zoom: 7,
//     layers: [lightmap, whales]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map



//   var legend = L.control({position: 'topright'});
//   legend.onAdd = function (myMap) {
//       var div = L.DomUtil.create('div', 'selDataset');
//       div.innerHTML = '<select id = selDataset><option>Select Whale </option></select>;';
//       div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
//       return div;
//   };
//   legend.addTo(myMap);


 

//   // L.control.layers(baseMaps, overlayMaps, {
//   //   collapsed: false
//   // }).addTo(myMap);
// };

// Pulls in whale points into map
// d3.csv("resources/blue_fin_whales_gps.csv").then(createFeatures); 
// This creates our drop down menu ----FINAL
// d3.csv("resources/blue_fin_whales_gps.csv").then((data) => {
//   // console.log("data: ", data);

//   var whale_id_filter = data.map(x => x.DeploymentID);

//   var id_filter = whale_id_filter.filter((x, index) =>{
//       return whale_id_filter.indexOf(x) === index;
//   });

//   console.log("id_filter: ", id_filter);
//   var whale_id = d3.select("#selDataset");

//   var test = id_filter.map((id) => {
//       whale_id
//         .append("option")
//         .property("value", id)
//         .text(id);
//     });

// optionChanged(id_filter[0])
// });

// -----------------------------------------------------------------------------------------------------------------





// }




// {

  // console.log("data: ", data);

  // var long = data.map(row => row.longitude)
  // console.log("long: ", long);

  // var lat = data.map(row => row.latitude)
  // console.log("lat: ", lat);
// });
// -----------animation code--------------------------------
// 	mapboxgl.accessToken = 'pk.eyJ1IjoiZWxvcGV6NTE1IiwiYSI6ImNrbmZjMW13NTAwc2Uyb3J6ZXlwMGl5b3QifQ.kzp-e5UznvnSpVoKfAPQ2w';
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [-96, 37.8],
//         zoom: 3
//     });

//     // San Francisco
//     var origin = [-119.0606, 33.9908];

//     // Washington DC
//     var destination = [-118.6439, 33.1642];

//     // A simple line from origin to destination.
//     var route = {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'LineString',
//                     'coordinates': [origin, destination]
//                 }
//             }
//         ]
//     };

//     // A single point that animates along the route.
//     // Coordinates are initially set to origin.
//     var point = {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': origin
//                 }
//             }
//         ]
//     };

//     // Calculate the distance in kilometers between route start/end point.
//     var lineDistance = turf.length(route.features[0]);

//     var arc = [];

//     // Number of steps to use in the arc and animation, more steps means
//     // a smoother arc and animation, but too many steps will result in a
//     // low frame rate
//     var steps = 500;

//     // Draw an arc between the `origin` & `destination` of the two points
//     for (var i = 0; i < lineDistance; i += lineDistance / steps) {
//         var segment = turf.along(route.features[0], i);
//         arc.push(segment.geometry.coordinates);
//     }

//     // Update the route with calculated arc coordinates
//     route.features[0].geometry.coordinates = arc;

//     // Used to increment the value of the point measurement against the route.
//     var counter = 0;

//     map.on('load', function () {
//         // Add a source and layer displaying a point which will be animated in a circle.
//         map.addSource('route', {
//             'type': 'geojson',
//             'data': route
//         });

//         map.addSource('point', {
//             'type': 'geojson',
//             'data': point
//         });

//         map.addLayer({
//             'id': 'route',
//             'source': 'route',
//             'type': 'line',
//             'paint': {
//                 'line-width': 2,
//                 'line-color': '#007cbf'
//             }
//         });

//         map.addLayer({
//             'id': 'point',
//             'source': 'point',
//             'type': 'symbol',
//             'layout': {
//                 // This icon is a part of the Mapbox Streets style.
//                 // To view all images available in a Mapbox style, open
//                 // the style in Mapbox Studio and click the "Images" tab.
//                 // To add a new image to the style at runtime see
//                 // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
//                 'icon-image': 'airport-15',
//                 'icon-rotate': ['get', 'bearing'],
//                 'icon-rotation-alignment': 'map',
//                 'icon-allow-overlap': true,
//                 'icon-ignore-placement': true
//             }
//         });

//         function animate() {
//             var start =
//                 route.features[0].geometry.coordinates[
//                     counter >= steps ? counter - 1 : counter
//                 ];
//             var end =
//                 route.features[0].geometry.coordinates[
//                     counter >= steps ? counter : counter + 1
//                 ];
//             if (!start || !end) return;

//             // Update point geometry to a new position based on counter denoting
//             // the index to access the arc
//             point.features[0].geometry.coordinates =
//                 route.features[0].geometry.coordinates[counter];

//             // Calculate the bearing to ensure the icon is rotated to match the route arc
//             // The bearing is calculated between the current point and the next point, except
//             // at the end of the arc, which uses the previous point and the current point
//             point.features[0].properties.bearing = turf.bearing(
//                 turf.point(start),
//                 turf.point(end)
//             );

//             // Update the source with this new data
//             map.getSource('point').setData(point);

//             // Request the next frame of animation as long as the end has not been reached
//             if (counter < steps) {
//                 requestAnimationFrame(animate);
//             }

//             counter = counter + 1;
//         }

//         document
//             .getElementById('replay')
//             .addEventListener('click', function () {
//                 // Set the coordinates of the original point back to origin
//                 point.features[0].geometry.coordinates = origin;

//                 // Update the source layer
//                 map.getSource('point').setData(point);

//                 // Reset the counter
//                 counter = 0;

//                 // Restart the animation
//                 animate(counter);
//             });

//         // Start the animation
//         animate(counter);
//     });

//     var whales = [];
// // var whale_id = d3.select('#selID')

// // d3.csv("resources/blue_fin_whales_gps.csv").then((id) => {
//     // var blue_fin_id = id.DeploymentID
//     // console.log("blue_fin_id:", blue_fin_id)
//     // blue_fin_id.map((data) => {

//     //     console.log(data)
//     //     if (whales.indexOf(data) === -1) {
//     //         whales.push(data)

//     //         console.log("whales: ", data)
//     //     }

//     // });
// // });
// // console.log("start")
// // function updateMap() {
    
// // }
// // var button = d3.select("#filter-btn");

// // var form = d3.select("#selDataset");

// // button.on("click", runEnter);
// // form.on("submit", runEnter);
