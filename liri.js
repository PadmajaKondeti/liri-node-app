var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var inquirer = require('inquirer');
var SpotifyWebApi = require('spotify-web-api-node');
var omdb = require('omdb');

var omdb = require('rcb-omdb');

var spotify = require('spotify');
var fs = require('fs');
//variables - file reading
var method="", argument="";
//spotify
var spotifyQuery ="";

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
var logInfoFunction = function(info){
	var addtext = '\n' + info + '\n';
	fs.appendFile('log.txt', addtext, (err) => {
		if (err) throw err;
		console.log('The "data is append" was appended to file!');
	});
};

// Here we give the user a list to choose from.
// Create a "Prompt" with a series of questions.

inquirer.prompt([
	{
		type: "list",
		message: "Do you want to Tweet, spotify-this-song, movie-this, do-what-it-says?",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		name: "choice"
	}
]).then(function (user) {
	if (user.choice == 'my-tweets' ){
		tweetFunction();
	} else if (user.choice == 'spotify-this-song' ){
		spotifyFunction();
	} else if (user.choice == 'movie-this' ){
		movieFunction();
	} else if (user.choice == 'do-what-it-says' ){
		doWhateverFunction();

	}
});
var tweetFunction = function(){
	inquirer.prompt([
		{
			type: "list",
			message: "Do you want to Tweet or get tweets?",
			choices: ["my-tweets", "tweet"],
			name: "tweet"
		}
	]).then(function (user) {
		if (user.tweet == "my-tweets"){
			client.get('statuses/user_timeline', function(error, tweets, response){
				if (!error) {
					for (var i = 0; i < 2; i++){
						console.log('data', tweets);
						logInfoFunction(tweets);
					};
				};					
			});
		} else {
			inquirer.prompt([
				{
					type: "input",
					message: "Enter your twitter message?",
					name: "message"
				}
			]).then(function (user) {
				var value = user.message || 'Have a wonderful day!!';	
				client.post('statuses/update',{ status:value}, function(error, tweet, response) {
					if (!error) {
						console.log(tweet);
						logInfoFunction(user.message);
					};
				});
			});
		};
	});	
};
var spotifyFunction = function(){
	if (argument.length >0 ){
		spotifyQuery = argument;
		getSpotify();
	} else {
		inquirer.prompt([
			{
				type: "input",
				message: "Please enter the song name?",
				name: "spotify"
			 }
		]).then(function (user) {
			var spotifyQuery = user.spotify || 'dancing in the moonlight';
			spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
				if ( !err ) {
					// Do something with 'data'
					var logInfo = "Artist(s)- "  + data.tracks.items[0]['artists'][0]['name'];
					logInfo += "Song Name - "  + data.tracks.items[0].name;
					logInfo +=  "Preview link -  "  + data.tracks.items[0].preview_url;
					logInfo += "Album -  "  + data.tracks.items[0]['album']['name'];
					logInfoFunction(logInfo);
					console.log("Artist(s)- "  + data.tracks.items[0]['artists'][0]['name']);
					console.log("Song Name - "  + data.tracks.items[0].name);
					console.log("Preview link -  "  + data.tracks.items[0].preview_url);
					console.log("Album -  "  + data.tracks.items[0]['album']['name']);
				}
			});
		});	
	
	}
};
var movieFunction= function(){
	inquirer.prompt([
		{
			type: "input",
			message: "Please enter the movie name?",
			name: "movie"
		 }
	]).then(function (user) {
		var movieQuery = user.movie || 'Mr. Nobody ';
		omdb.get({ title: movieQuery, options: "tomato:true"}, true, function(err, movie) {
			if(err) {
		        return console.error(err);
		    }		 
		    if(!movie) {
		        return console.log('Movie not found!');
		    }
		    var logInfo = 'Movie info -' +  movie.title + ' , '+ movie.year + ' , ' + movie.imdb.rating;
		    logInfo += 'country - ' + movie.countries;
		    logInfo +=  'plot - ' + movie.plot;
		    logInfo += 'Actors - ' + movie.actors;
			logInfoFunction(logInfo);
		    console.log('Movie info - %s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
		    console.log('country - ' + movie.countries);
		    console.log('Language - ' + movie.language);
		    console.log('plot - ' + movie.plot);
		    console.log('Actors - ' + movie.actors);
		    console.log('Rotten Tomatoes Rating - ' + movie.tomato);

		 });
	})
};
var getSpotify = function(){
	spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
		console.log(data);
		if ( !err ) {
			// Do something with 'data'
			var logInfo = "Artist(s)- "  + data.tracks.items[0]['artists'][0]['name'];
			logInfo += "Song Name - "  + data.tracks.items[0].name;
			logInfo +=  "Preview link -  "  + data.tracks.items[0].preview_url;
			logInfo += "Album -  "  + data.tracks.items[0]['album']['name'];
			logInfoFunction(logInfo);
			console.log("Artist(s)- "  + data.tracks.items[0]['artists'][0]['name']);
			console.log("Song Name - "  + data.tracks.items[0].name);
			console.log("Preview link -  "  + data.tracks.items[0].preview_url);
			console.log("Album -  "  + data.tracks.items[0]['album']['name']);
		}
	});
};
var doWhateverFunction = function(){
	// read the file 
	fs.readFile("random.txt", "utf8", function(error, data) {

		// We will then print the contents of data
		console.log(data);

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(',');

		// We will then re-display the content with the split for aesthetics.
		console.log(dataArr);
		method = dataArr[0];
		argument = dataArr[1];
		switch (dataArr[0]) {
			case "my-tweets":
				tweetFunction();
				break;
			case "spotify-this-song":
				spotifyFunction();
				break;
			case "movie-this":
				movieFunction();
				break;
		};
	
	});
};