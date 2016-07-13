var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var inquirer = require('inquirer');
var SpotifyWebApi = require('spotify-web-api-node');
var omdb = require('omdb');

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
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
		var runProgram = user.choice;
		console.log(runProgram);
		if (runProgram == "my-tweets"){
			inquirer.prompt([
				{
					type: "list",
					message: "Do you want to Tweet or get tweets?",
					choices: ["my-tweets", "tweet"],
					name: "tweet"
				}
			]).then(function (user) {
				var selection = user.tweet;
				if (selection == "my-tweets"){
					//var params = {screen_name: ' + value + '};
					//client.get('statuses/user_timeline', params, function(error, tweets, response){
					client.get('statuses/user_timeline', function(error, tweets, response){
						if (!error) {
							for (var i = 0; i < 2; i++){
								console.log('data', tweets);
							}
						}					
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
							}
						});
					});
				}
			})	
		}
	}	
});