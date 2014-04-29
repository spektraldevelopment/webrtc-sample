//////////////////
//MEDIASTREAM  - setup camera
//////////////////

var
	localVideo = document.querySelector('#localVideoElement'),
	remoteVideo = document.querySelector('#remoteVideoElement'),
	mediaStream;
	
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

function initMediaStream() {
	navigator.getUserMedia({
		video: true,
		audio: false,
	}, onStream, onStreamError);
}

function onStream(stream) {
	window.stream = stream;

	stream.oninactive = function() {
		console.warn("No camera available!");
	}

	stream.onactive = function() {
		console.log("Stream is active");
	}

	stream.onaddtrack = function() {
		console.log("Track added.");
	}

	stream.onremovetrack = function() {
		console.log("Track Removed");
	}

	stream.onended = function() {
		console.log("Stream ended.");
	}

	if (window.URL) {
		localVideo.src = window.URL.createObjectURL(stream);
	} else {
		localVideo.src = stream;
	}

	localVideo.onloadedmetadata = function() {
		console.log('SpektralMedia: Meta Data Loaded');
	}
	localVideo.play();

	mediaStream = stream;
}

function onStreamError(error) {
	console.error('Stream error occurred: ' + error);
}