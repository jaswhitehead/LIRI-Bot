require("dotenv").config();

// Set up variables to import packages for application functionality

//Grab the axios package
var axios = require("axios");

//Grab the reqquest package
var request = require("request");

//Grab the moment package
var moment = require("moment");

//Grab the random.txt file
var fs = require("fs");

// Requiring spotify function from spotify-api
var spotify = require("node-spotify-api");

// Import the `keys.js` file
var keys = require("./keys.js");

//Access to keys information
var spotifyKeys = new spotify(keys.spotify);

// First input after node liri.js to determine the command
var command = process.argv[2]
// Second input that follows the command to determine what we are querying
var input = process.argv[3];


//You could also use a switch case here instead if you prefer.
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

// Or you could do a switch case if you prefer.
//   switch (command) {
//       case 'concert-this':
//         concertThis(input);
//         break;
//       case 'spotify-this-song'
//         spotifyThisSong(input);
//         break;
//       case 'movie-this';
//         movieThis(input);
//         break;
//       case 'do-what-it-says';
//         doWhatItSays(input);
//         break;        
// default:
//  } 

function concertThis(artistName) {
  if (artistName === undefined) {
    artist = "Tool";
  }

  var uri = encodeURI("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
  
  request(uri, function(err, response, body) {
    console.log("body: ", body, ".");
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var bandInput = JSON.parse(body);
    if (bandInput.length > 0) {
      for (i = 0; i < 1; i++) {
        console.log('=========================================================');
        console.log(`Venue: ${bandInput[i].venue.name}`);
        console.log(`Venue Location City: ${bandInput[i].venue.city}`);
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
      spotifyKeys.search({ type: "track", query: songName.trim(), limit: 3 }, function(
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
  // Attempt at getting the log file to work.
  //   fs.appendFile("log.txt", songsInfo, function (err) {
  //     if (err) throw err;
  //   });
  });  
}

function movieThis(movieName) {
    if (movieName === undefined) {
        movieName = "Shawshank Redemption";
      }
      axios
        .get(
          encodeURI("http://www.omdbapi.com/?t=" + movieName.trim() + "&y=&plot=short&apikey=trilogy")
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


//   Print the contents of the data
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


