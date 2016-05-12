document.addEventListener('DOMContentLoaded', function(){
	var songIds = [
		'6f49kbOuQSOsStBpyGvQfA', 
		'3PHY6UdRcHVgNnAvcXpN7y', 
		'5mBuX0Vr848sUOnzxYwMjw',
		'0AFbdcmIezpC0ciM8Rm117',
		'3KMiS22Z62ni87uklUt5uk'
	];
	var currentSongIdIndex = 0;

	function incrementCurrentSongIdIndex() {
		if (currentSongIdIndex === songIds.length-1) {
			return 0;
		}
		return currentSongIdIndex++;
	}

	function playRandomSong(){
		var request = new XMLHttpRequest();
		request.open('GET', 'https://api.spotify.com/v1/tracks/' + songIds[currentSongIdIndex], true);
		incrementCurrentSongIdIndex();

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    var response = JSON.parse(request.responseText);
		    var artist = response.artists[0].name;
		    var songName = response.name;
		    var songUrl = response.preview_url;
		    document.getElementById('songName').innerHTML = songName;
		    document.getElementById('artistName').innerHTML = artist;
		  	document.getElementById('audioUrl').setAttribute('src', songUrl);
		  } else {
		  	console.log("We reached our server but it returned error");
		  }
		};

		request.onerror = function() {
			console.log("There was a connection error"); 
		};

		request.send();
	}

	document.getElementById('playButton').addEventListener('click', playRandomSong);

	setInterval(playRandomSong, 15000);
});
