var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
	//consumer_key: 'RSpNsiTwXfDI4MCdJJQAbcPdk',
// consumer_secret: 'beKRPhk1mJWDICPo7w7a4CM7nJf8IS558Cj9roTxtcgbDkdhRl',
// access_token_key: '612061683-fbQhPaUt4Ge2YMEZTmng8p7RePZy6WgONBPNJxD2',
// access_token_secret: 'oLAG1ChPlj4pDmCdqul0RwmgIIp4Ew7pLtWDXjKRiT9Zn'
});
console.log(client);

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
// client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
//   if (!error) {
//     console.log(tweet);
//   };
//  });
// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//   console.log(tweets);
// });
var omdb = require('omdb');
 
omdb.search('Forrest Gump', function(err, movies) {
    if(err) {
        return console.error(err);
    }
 
    if(movies.length < 1) {
        return console.log('No movies were found!');
    }
 
    movies.forEach(function(movie) {
        console.log('%s (%d)', movie.title, movie.year);
    });
 
    // Saw (2004) 
    // Saw II (2005) 
    // Saw III (2006) 
    // Saw IV (2007) 
    // ... 
});
 
omdb.get({ title: 'Forrest Gump', year: 1994 }, true, function(err, movie) {
    if(err) {
        return console.error(err);
    }
 
    if(!movie) {
        return console.log('Movie not found!');
    }
 
    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);
 
    // Saw (2004) 7.6/10 
    // Two men wake up at opposite sides of a dirty, disused bathroom, chained 
    // by their ankles to pipes. Between them lies... 
});

var spotify = require('spotify');
 spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
     console.log( data);
    
    // Do something with 'data' 
});
//spotify.lookup( function({ type: 'drake', id: 'Spotify ID Hash' }, hollaback));

//spotify.get( function(query, hollaback));//; -- See http://developer.spotify.com/en/metadata-api/overview/ ;
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

// // Get multiple albums
// spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
//   .then(function(data) {
//     console.log('Albums information', data.body);
//   }, function(err) {
//     console.error(err);
//   });

// // Get Elvis' albums
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }, function(err, data) {
//   if (err) {
//     console.error('Something went wrong!');
//   } else {
//     console.log(data.body);
//   }
// });

// Search tracks whose name, album or artist contains 'Love'
spotifyApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });

