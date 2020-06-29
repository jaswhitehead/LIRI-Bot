# [LIRI-Bot Video 1](https://youtu.be/8EiYB7FMJB0)
# [LIRI-Bot Video 2](https://youtu.be/1EssmQHPabE)

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface,  LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

# LIRI Available Functions
concert-this

spotify-this-song

movie-this

do-what-it-says

# Command: concert-this
$ node liri.js concert-this (band name)

Using the Bands In Town API, this will show the following information about the first three events the user searches for:

•Name of the Venue

•Location of the Venue

•Date of the Event

# Command: spotify-this-song
$ node liri.js spotify-this-song (song name)

Using the Spotify API, this will show the following information about the song the user searches for:

•Artist

•Song Name

•Album of the Song

•Song Preview Link
If no song is provided, the song "The Sign" will be pulled up instead.

# Command: movie-this
$ node liri.js movie-this (movie name)

Using the OMBD API, this will show the following information about the movie the user searches for:

•Title of the Movie

•Year the Movie was Released

•Director

•The IMDB Rating

•Country the Movie was made in

•Language the Movie is in

•Plot of the Movie

•Actors in the Movie
If no movie is provided, the movie "Mr. Nobody." will be pulled up instead.

# Command: do-what-it-says
$ node liri.js do-what-it-says

The program will take the text inside of random.txt and use it to call the first command with the second part as it's parameter.

Currently in random.txt, the following text is there:

spotify-this-song I Want It That Way

This would call the spotify-this-song function and pass in "I Want it That Way" as the song.

# Technologies Used
Javascript
NodeJS

## Node packages:

•Axios

•Moment

•DotEnv

## APIs used:

•Bands in Town

•Node-Spotify-API

•OMDB
_______________________________________________________________________________________________________
# Watch the videos

https://youtu.be/8EiYB7FMJB0

https://youtu.be/1EssmQHPabE
