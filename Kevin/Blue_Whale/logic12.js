var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var myMap = L.map("map", {
  center: [
    34.0522, -118.2437
  ],
  zoom: 7,
  layers: [lightmap]
});

d3.csv("resources/Blue_whales_North.csv").then((blue) => {
  // console.log("data_blue: ", data_blue);

  var blue_id_filter = blue.map(x => x.individualID);

  var blue_filter = blue_id_filter.filter((x, index) =>{
      return blue_id_filter.indexOf(x) === index;
  });

  var blue_id = d3.select("#selDataset");

  // var selected = true
  var test = blue_filter.map((id) => {
      blue_id
        .append("option")
        .property("value", id)
        .text(id);
    });

    // if (selected) {
    //   Blue_whale_id.property("selected")
    // }
});

var legend = L.control({position: 'topright'});
legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'selDataset');
    div.innerHTML = '<select id = selDataset></select>;';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};
legend.addTo(myMap);

var dropdown = d3.select("#selDataset").on("change", createFeatures);

function createFeatures(Blue_Blue_whale_id_filter) {

  // createFeatures(Blue_Blue_whale_id_filter).preventdefault()

  if (Blue_Blue_whale_id_filter == "1993CA-Bmu-00834") {
    var blue_id = "1993CA-Bmu-00834"
  }
  // else if (Blue_Blue_whale_id_filter === undefined){
  //   var blue_id = "1993CA-Bmu-00834"
  // }
  else{
  console.log(this.value);
    var blue_id = this.value
  }

  d3.csv("resources/Blue_whales_North.csv").then((data_blue) => {

    var Blue_whale_ids = data_blue.filter(row => row.individualID == blue_id);
    // console.log("Blue_whale_ids: ",Blue_whale_ids)

    var Blue_whales = Blue_whale_ids.map(blue => L.circleMarker([blue.lat,blue.long], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.75,
      radius: 1})
      .bindPopup(`${blue.lat},${blue.long}`))
      // .addOverlay(whales)
      console.log(Blue_whales)
      console.log(whale_markers2)

    var whale_markers2 = L.layerGroup(Blue_whales)
    // var whale_markers = L.addOverlay(whales)

    // Sending our whales layer to the createMap function
    createMap(whale_markers2, blue_id);
  });
};

function createMap(whale_markers2, Blue_whale_id) {
console.log(Blue_whale_id)
  
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap
  
    // "Dark Map": darkmap
  };

  var overlayMaps = {

  };
  overlayMaps[Blue_whale_id] = whale_markers2
  // L.control.remove();
  var test = L.control.layers(null, overlayMaps)
  test.remove(myMap)
  
  test.addTo(myMap);
};
