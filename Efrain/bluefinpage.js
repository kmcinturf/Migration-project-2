var whales = [];
// var whale_id = d3.select('#selID')

// d3.csv("resources/blue_fin_whales_gps.csv").then((id) => {
    // var blue_fin_id = id.DeploymentID
    // console.log("blue_fin_id:", blue_fin_id)
    // blue_fin_id.map((data) => {

    //     console.log(data)
    //     if (whales.indexOf(data) === -1) {
    //         whales.push(data)

    //         console.log("whales: ", data)
    //     }

    // });
// });
// console.log("start")
// function updateMap() {
    
// }
// var button = d3.select("#filter-btn");

// var form = d3.select("#selDataset");

// button.on("click", runEnter);
// form.on("submit", runEnter);


d3.csv("resources/blue_fin_whales_gps.csv").then((data) => {
    console.log("data: ", data);

    var whale_id_filter = data.map(x => x.DeploymentID);

    var id_filter = whale_id_filter.filter((x, index) =>{
        return whale_id_filter.indexOf(x) === index;
    });

    var whale_id = d3.select("#selDataset");

    id_filter.map((id) => {
        whale_id
          .append("option")
          .property("value", id)
          .text(id);
      });
  // =======================================================
  // Once we get a response, send the data.features object to the createFeatures function
//   feature_id = data.feature_id
//   console.log("feature_id: ", feature_id)

//        if (whales.indexOf(feature_id) === -1) {
//             whales.push(feature_id)

//             console.log("whales: ", whales)
//         }
    // console.log("feature_id: ", feature_id);
    // var long = data.map(row => row.longitude)
    // console.log("long: ", long);

    // var lat = data.map(row => row.latitude)
    // console.log("lat: ", lat);
});


// whale_id
//   .append("option")
//   .property("value", "")
//   .text("Select Whale ID");




// function optionID() {



// }