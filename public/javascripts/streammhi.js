function initialize() {
  var myLatlng = new google.maps.LatLng(5.626798, 108.804958);
  var myOptions = {
    zoom: 6,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
  var heatmap;
  var indexes = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: indexes,
    radius: 25
  });
  heatmap.setMap(map);

  var pubnub = PUBNUB.init({
     subscribe_key: 'sub-c-6c4c3056-7d53-11e4-b601-02ee2ddab7fe'
  });
  
  pubnub.subscribe({
    channel: 'mhi_heatmap',
    message: function(m){
        var locationObj = m['loc'];
        var coordinates = locationObj['coordinates'];
        var point = { 'location':new google.maps.LatLng(coordinates[1], coordinates[0])
        , 'weight': m['weight']};
        indexes.push(point);
    }
  });
  
}