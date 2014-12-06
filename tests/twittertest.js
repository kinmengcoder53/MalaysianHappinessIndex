var twitter = require('twitter'),
util = require('util')
config = require('../config'),
twitterStreamHandler = require('../utils/twitterstreamhandler');

var twit = twitter(config.twitter);

twit.stream('statuses/filter',{ 'locations': '100.702713, 1.303148, 119.258835, 7.037783'}, function(stream){
  twitterStreamHandler(stream);
  setTimeout(stream.destroy, 5000);
});