require("dotenv").config();

// Set up variables to import packages for application functionality

//Grab the axios package
var axios = require("axios");

//Grab the moment package
var moment = require("moment");

//Grab the random.txt file
var fs = require("fs");

// Requiring spotify function from spotify-api
var spotify = require("node-spotify-api");

// Import the `keys.js` file
var keys = require("./keys.js");

const { listenerCount } = require("process");

//Access to keys information
var spotifyKeys = new spotify(keys.spotify);

// First input after node liri.js to determine the command
var command = process.argv[2]
// Second input that follows the command to determine what we are querying
var input = process.argv[3];
console.log(command, input);

function concertThis(artist) {
  console.log("artist", artist);
  var preview_url = encodeURI(
    "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp"
  );
  request(url, function(err, response, body) {
    console.log("body: ", body, ".");
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var bandInput = JSON.parse(body);
    if (bandInput.length > 0) {
      for (i = 0; i < 1; i++) {
        console.log('=========================================================');
        console.log(`Venue: ${bandInput[i].venue.name}`);
        console.log(`Venue Location via City: ${bandInput[i].venue.city}`);
        console.log(`Event Date/Time: ${moment(bandInput[i].datetime).format("MM/DD/YYYY hh:00 A")}`
        
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
          console.log('=========================================================');
          console.log(`Artist: ${songsInfo[i].artists[0].name}`);
          console.log(`Song Name: ${songsInfo[i].name}`);
          console.log(`Preview Link: ${songsInfo[i].preview_url}`);
          console.log(`Album: ${songsInfo[i].album.name}`);
          console.log('========================================================= \n');
        }
      });  
}

function movieThis(movieName) {
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
      }
      axios
        .get(
          encodeURI(
            "http://www.omdbapi.com/?t=" +
              movieName.trim() +
              "&y=&plot=short&apikey=trilogy"
          )
        )
        .then(function(response) {
          console.log('=========================================================');
          console.log("Movie Title: " + response.data.Title);
          console.log("Movie Year: " + response.data.Year);
          console.log("Movie Rating via IMDB: " + response.data.imdbRating);
          console.log("Movie Rating via Rotten Tomatoes: " + response.data.Ratings[1].Value);
          console.log("Movie Production Country: " + response.data.Country);
          console.log("Movie Language: " + response.data.Language);
          console.log("Movie Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log('========================================================= \n');
        })
        .catch(err => console.error(err));
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
        spotifyThisSong(dataArr[1]);
    }
    if (dataArr[0] === "concert-this") {
      concertThis(dataArr[1]);
    }
    if (dataArr[0] === "movie-this") {
      movieThis(dataArr[1]);
    }
  });
}


//Wondering if I should use a switch case here instead.
if (command === "concert-this") {
    concertThis(input);
} else if (command === "spotify-this-song") {
    spotifyThisSong(input);
} else if (command === "movie-this") {
    movieThis(input);
} else if (command === "do-what-it-says") {
    done();
} else {
    console.log("invalid command");
}


// Is this how you would do something like that?
//switch (command) {
//    case 'concert-this':
//    concertThis(input);
//    break;
//}