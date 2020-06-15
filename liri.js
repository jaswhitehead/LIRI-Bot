require("dotenv").config();

// Set up variables to import packages for application functionality
var axios = require("axios");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotifyKeys = new spotify(keys.spotify);

var command = process.argv[2]
var commandArg = process.argv[3];

function concertThis(artist)