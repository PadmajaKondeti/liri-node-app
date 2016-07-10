var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var client = new Twitter({
consumer_key: 'RSpNsiTwXfDI4MCdJJQAbcPdk',
consumer_secret: 'beKRPhk1mJWDICPo7w7a4CM7nJf8IS558Cj9roTxtcgbDkdhRl',
access_token_key: '612061683-fbQhPaUt4Ge2YMEZTmng8p7RePZy6WgONBPNJxD2',
access_token_secret: 'oLAG1ChPlj4pDmCdqul0RwmgIIp4Ew7pLtWDXjKRiT9Zn'
});

var params = {screen_name: 'girlscouts'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

