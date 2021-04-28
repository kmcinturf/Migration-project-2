// var tracks = 


d3.csv("resources/blue_fin_whales_gps.csv").then((data) => {
    
    // var parseDate = d3.timeParse("%d-%m-%y")
    var format = d3.timeParse("%s");
    var whale_ids = data.filter(row => row.DeploymentID == "2014CA-MK10-05644");
    var coordinates = whale_ids.map(whale => [whale.longitude,whale.latitude])
    var time2 = whale_ids.map(row => row.timestamp_gmt)
    var time =format(time2)
   

  var blue_fin = {
   
  "type": "Feature",
  "geometry": {
    "type": "MultiPoint",
    "coordinates": coordinates
  },
  "properties": {
    "time": time
  }

  } 
  
  var demoTracks = blue_fin
//   tracks = demoTracks
  console.log(demoTracks)
  console.log(demoTracks.properties.time[0])
  console.log(demoTracks.properties.time[demoTracks.properties.time.length - 1]);
whalemarkers(demoTracks)




}
) 

function whalemarkers(demoTracks) {
  // Get start/end times
  var startTime = new Date(demoTracks.properties.time[0]);
  var endTime = new Date(demoTracks.properties.time[demoTracks.properties.time.length - 1]);

  // Create a DataSet with data
  var timelineData = new vis.DataSet([{ start: startTime, end: endTime, content: 'Demo GPS Tracks' }]);

  // Set timeline options
  var timelineOptions = {
    "width":  "100%",
    "height": "120px",
    "style": "box",
    "axisOnTop": true,
    "showCustomTime":true
  };
  
  // Setup timeline
  var timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);
      
  // Set custom time marker (blue)
  timeline.setCustomTime(startTime);

  // Setup leaflet map
  var map = new L.Map('map');

  var basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');

  // Center map and default zoom level
  map.setView([34.1, -118.2], 10);

  // Adds the background layer to the map
  map.addLayer(basemapLayer);

  // =====================================================
  // =============== Playback ============================
  // =====================================================
  
  // Playback options
  var playbackOptions = {

      playControl: true,
      dateControl: true,
      
      // layer and marker options
      layer : {
          pointToLayer : function(featureData, latlng) {
              var result = {};
              
              if (featureData && featureData.properties && featureData.properties.path_options) {
                  result = featureData.properties.path_options;
              }
              
              if (!result.radius){
                  result.radius = 5;
              }
              
              return new L.CircleMarker(latlng, result);
          }
      },
      
      marker: { 
          getPopup: function(featureData) {
              var result = '';
              
              if (featureData && featureData.properties && featureData.properties.title) {
                  result = featureData.properties.title;
              }
              
              return result;
          }
      }
      
  };
      
  // Initialize playback
  var playback = new L.Playback(map, null, onPlaybackTimeChange, playbackOptions);
  
  playback.setData(demoTracks);    
  playback.addData(blueMountain);

  // Uncomment to test data reset;
  //playback.setData(blueMountain);    
  
  // Set timeline time change event, so cursor is set after moving custom time (blue)
  timeline.on('timechange', onCustomTimeChange);    

  // A callback so timeline is set after changing playback time
  function onPlaybackTimeChange (ms) {
      timeline.setCustomTime(new Date(ms));
  };
  
  // 
  function onCustomTimeChange(properties) {
      if (!playback.isPlaying()) {
          playback.setCursor(properties.time.getTime());
      }        
  }       
}