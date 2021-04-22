// // Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
// d3.csv("../resources/blue_fin_whales_gps.csv", function(data) {
  // ====================================================
  // d3.csv("resources/blue_fin_whales_gps.csv", function(data) {
  //   console.log("data: ", data);
  // =======================================================
  // Once we get a response, send the data.features object to the createFeatures function
  // feature_id = data.feature_id

    // console.log("data: ", data);
//     var long = data.map(row => row.longitude)
//     console.log("long: ", long);

//     var lat = data.map(row => row.latitude)
//     console.log("lat: ", lat);
// });

function createFeatures(blue_fin_whales) {
  console.log(blue_fin_whales)
  // Define a function we want to run once for each feature in the features array
  // // Give each feature a popup describing the place and time of the earthquake
  // function onEachFeature(data, layer) {
  //   layer.bindPopup("<h3>" + data.DeploymentID +
  //     "</h3><hr><p>" + new Date(data.timestamp_gmt) + "</p>");
  // }
  // // Create a GeoJSON layer containing the features array on the earthquakeData object
  // // Run the onEachFeature function once for each piece of data in the array
  // var whales = L.layerGroup(blue_fin_whales, {
  //   onEachFeature: onEachFeature
  // });
  var whales = blue_fin_whales.map(whale => L.circleMarker([whale.latitude,whale.longitude], {
    color: "red",
    fillColor: (whale.timestamp_gmt),
    fillOpacity: 0.75,
    radius: 1})
    .bindPopup("whale-marker"))

  whales=L.layerGroup(whales)

  // Sending our whales layer to the createMap function
  createMap(whales);
}

function createMap(whales) {

  // Define streetmap and darkmap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  // var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //   tileSize: 512,
  //   maxZoom: 18,
  //   zoomOffset: -1,
  //   id: "mapbox/streets-v11",
  //   accessToken: API_KEY
  // });

  // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

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
      37.7749, -122.4194
    ],
    zoom: 5,
    layers: [lightmap, whales]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
};

d3.csv("resources/blue_fin_whales_gps.csv").then(createFeatures); 
// {
  // console.log("data: ", data);

  // var long = data.map(row => row.longitude)
  // console.log("long: ", long);

  // var lat = data.map(row => row.latitude)
  // console.log("lat: ", lat);
// });
// -----------animation code--------------------------------
	mapboxgl.accessToken = 'pk.eyJ1IjoiZWxvcGV6NTE1IiwiYSI6ImNrbmZjMW13NTAwc2Uyb3J6ZXlwMGl5b3QifQ.kzp-e5UznvnSpVoKfAPQ2w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96, 37.8],
        zoom: 3
    });

    // San Francisco
    var origin = [-119.0606, 33.9908];

    // Washington DC
    var destination = [-118.6439, 33.1642];

    // A simple line from origin to destination.
    var route = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [origin, destination]
                }
            }
        ]
    };

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    var point = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': origin
                }
            }
        ]
    };

    // Calculate the distance in kilometers between route start/end point.
    var lineDistance = turf.length(route.features[0]);

    var arc = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    var steps = 500;

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        var segment = turf.along(route.features[0], i);
        arc.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    // Used to increment the value of the point measurement against the route.
    var counter = 0;

    map.on('load', function () {
        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource('route', {
            'type': 'geojson',
            'data': route
        });

        map.addSource('point', {
            'type': 'geojson',
            'data': point
        });

        map.addLayer({
            'id': 'route',
            'source': 'route',
            'type': 'line',
            'paint': {
                'line-width': 2,
                'line-color': '#007cbf'
            }
        });

        map.addLayer({
            'id': 'point',
            'source': 'point',
            'type': 'symbol',
            'layout': {
                // This icon is a part of the Mapbox Streets style.
                // To view all images available in a Mapbox style, open
                // the style in Mapbox Studio and click the "Images" tab.
                // To add a new image to the style at runtime see
                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                'icon-image': 'airport-15',
                'icon-rotate': ['get', 'bearing'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            }
        });

        function animate() {
            var start =
                route.features[0].geometry.coordinates[
                    counter >= steps ? counter - 1 : counter
                ];
            var end =
                route.features[0].geometry.coordinates[
                    counter >= steps ? counter : counter + 1
                ];
            if (!start || !end) return;

            // Update point geometry to a new position based on counter denoting
            // the index to access the arc
            point.features[0].geometry.coordinates =
                route.features[0].geometry.coordinates[counter];

            // Calculate the bearing to ensure the icon is rotated to match the route arc
            // The bearing is calculated between the current point and the next point, except
            // at the end of the arc, which uses the previous point and the current point
            point.features[0].properties.bearing = turf.bearing(
                turf.point(start),
                turf.point(end)
            );

            // Update the source with this new data
            map.getSource('point').setData(point);

            // Request the next frame of animation as long as the end has not been reached
            if (counter < steps) {
                requestAnimationFrame(animate);
            }

            counter = counter + 1;
        }

        document
            .getElementById('replay')
            .addEventListener('click', function () {
                // Set the coordinates of the original point back to origin
                point.features[0].geometry.coordinates = origin;

                // Update the source layer
                map.getSource('point').setData(point);

                // Reset the counter
                counter = 0;

                // Restart the animation
                animate(counter);
            });

        // Start the animation
        animate(counter);
    });
