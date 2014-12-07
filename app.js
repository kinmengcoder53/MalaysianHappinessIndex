
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , util = require('util')
  , twitter = require('twitter')
  , mongoose = require('mongoose')
  , config = require('./config')
  , twitterStreamHandler = require('./utils/twitterstreamhandler')
  , schedule = require('node-schedule')
  , indexcalc = require('./utils/indexcalc');
  
  
var pubnub = require('pubnub')(config.pubnub);

var app = module.exports = express.createServer();

// Configuration
var twit = new twitter(config.twitter);
mongoose.connect('mongodb://localhost/mhi');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, '0.0.0.0', function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var rule = new schedule.RecurrenceRule();
rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55];

var j = schedule.scheduleJob(rule, function(){
    indexcalc(pubnub);
});

twit.stream('statuses/filter',{ 'locations': '101.197312, 1.078921, 119.258835, 7.037783'}, function(stream){
  twitterStreamHandler(stream, pubnub);
});
