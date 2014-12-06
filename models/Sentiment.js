var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    weight       : Number
  , loc: {
      type: { type: String }, 
      coordinates: []
    }
  , date       : Date
});

schema.index({ loc : '2dsphere' });
// Create a static getTweets method to return tweet data from the db
schema.statics.getSentiments = function(numberToReturn, callback) {

  var sentiments = [];

  // Query the db, using skip and limit to achieve page chunks
  Sentiment.find({},'weight location date',{skip: 0, limit: numberToReturn}).sort({date: 'desc'}).exec(function(err,docs){

    // If everything is cool...
    if(!err) {
      sentiments = docs;  
    }

    // Pass them back to the specified callback
    callback(sentiments);

  });

};

module.exports = Sentiment = mongoose.model('Sentiment', schema);