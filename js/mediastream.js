//////////////////
//MEDIASTREAM  - setup camera
//////////////////

var
	localVideo = document.querySelector('#localVideoElement'),
	remoteVideo = document.querySelector('#remoteVideoElement'),
	mediaStream, peerConn;
	
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

function initMediaStream(pc) {
	navigator.getUserMedia({
		video: true,
		audio: false,
	}, onStream, onStreamError);
	peerConn = pc;
	console.log("peerConn is: " + peerConn);
}

function onStream(stream) {
	window.stream = stream;

	console.log("peerConn is:  " + peerConn);

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

//	if (window.URL) {
//		localVideo.src = window.URL.createObjectURL(stream);
//	} else {
//		localVideo.src = stream;
//	}
    connectStreamToSrc(stream, localVideo);

	localVideo.onloadedmetadata = function() {
		console.log('SpektralMedia: Meta Data Loaded');
	}
	localVideo.play();

	mediaStream = stream;

    peerConn.addStream(mediaStream);

    peerConn.onaddstream = function (event) {
    	connectStreamToSrc(event.stream, remoteVideo);

    	document.getElementById("loadingState").style.display = "none";
    	document.getElementById("openCallState").style.display = "block";
	} 
}

function connectStreamToSrc (mStream, mElement) {
  //mElement.src = window.URL.createObjectURL(mStream);
    if (window.URL) {
        mElement.src = window.URL.createObjectURL(mStream);
    } else {
        mElement.src = mStream;
    }
};

function onStreamError(error) {
	console.error('Stream error occurred: ' + error);
};