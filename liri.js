require("dotenv").config();

// Set up variables to import packages for application functionality
var axios = require("axios");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
const { listenerCount } = require("process");
var spotifyKeys = new spotify(keys.spotify);

var command = process.argv[2]
var commandTwo = process.argv[3];

function concertThis(artist) {
    console.log("artist", artist);
    var uri = encodeURI("https://rest.bandsintwon.com/artists/" + artist + "/events?app_id=LIRIBot");
    requestAnimationFrame(uri, function(err, response, body) {
    });
    request(uri, function(err, response, body) {
        console.log("body: ", body, ".");
        if (err) {
          return console.log("Error occurred: " + err);
        }
        var bandInput = JSON.parse(body);
        if (bandInput.length > 0) {
          for (i = 0; i < 1; i++) {
            console.log(`Venue: ${bandInput[i].venue.name}`);
            console.log(`Venue Location via City: ${bandInput[i].venue.city}`);
            console.log(
              `Event Date/Time: ${moment(bandInput[i].datetime).format("MM/DD/YYYY hh:00 A")}`
            );
          }
        }
      });
    }
function spotifyThisSong(songName) {
    if (songName === undefined) {
        songName = "The Sign Ace of Base";
      }
      spotify.search({ type: "track", query: songName, limit: 1 }, function(
        err,
        data
      ) {
        var songsInfo = data.tracks.items;
    
        if (err) {
          return console.log("Error occurred: " + err);
        }
        for (i = 0; i < songsInfo.length; i++) {
          // console.log(songsInfo);
          console.log(`Artist: ${songsInfo[i].artists[0].name}`);
          console.log(`Song Name: ${songsInfo[i].name}`);
          console.log(`Preview Link: ${songsInfo[i].preview_url}`);
          console.log(`Album: ${songsInfo[i].album.name}`);
        }
      });  
}
function movieThis(movieName) {
}
function done() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
    }
    // Print the contents of the data
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    if (dataArr[0] === "spotify-this-song") {

    }
}



if (command === "concert-this") {
    concertThis(commadTwo);
} else if (command === "spotify-this-song") {
    spotifyThisSong(commandTwo);
} else if (command === "movie-this") {
    movieThis(commandTwo);
} else if (command === "do-what-it-says") {
    done();
} else {
    console.log("invalid command");
}