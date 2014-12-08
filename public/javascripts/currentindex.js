function run() {
        console.log('currentindex.js is loaded');

  var pubnub = PUBNUB.init({
     subscribe_key: 'sub-c-6c4c3056-7d53-11e4-b601-02ee2ddab7fe'
  });
  
  pubnub.subscribe({
    channel: 'mhi_heatmap',
   message : function(m){console.log(m)}
  });
  
}