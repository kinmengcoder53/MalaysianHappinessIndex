module.exports = function(stream){

  
  stream.on('data', function(data) {
      var text = data['text'];
      var coordinates = data['coordinates'];
  });
  
  
}

