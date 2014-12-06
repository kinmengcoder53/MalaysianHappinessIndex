var sentiment = require('sentiment');
var SentimentModel = require('../models/Sentiment');

module.exports = function(stream, pubnub){

  
  stream.on('data', function(data) {
      var text = data['text'];
      var coordinates = data['coordinates'];
      var place = data.place.country_code;
      var lang = data.lang;
      
      
      if(place === 'MY' && lang === 'en') {
        console.log("Text: " + text);
        console.log("Coordinates: "  + coordinates);
        console.log("Place: " + place);
        console.log("Language: " + lang);
        var sentimentResult = sentiment(text);
        var score = sentimentResult.score;
        var weight = 0;
        if(score < 0) {
            weight = score * -1;
        }
        
        var result = {
          weight: weight,
          loc: coordinates,
          date: new Date()
        };
    
        // Create a new model instance with our object
        var sentimentEntry = new SentimentModel(result);
    
        
        sentimentEntry.save(function(err) {
          if (!err) {
            pubnub.publish({ 
                channel   : 'mhi_heatmap',
                message   : result,
                callback  : function(e) { console.log( "SUCCESS!", e ); },
                error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
            });
            
          }
        });
      }
  });
  
  
}

