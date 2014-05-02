//////////////////
//RTC PEER CONNECTION
//////////////////

function initPeerConnection() {
	////////////////////////
	////LOCAL PEER - caller
	////////////////////////

	var peerConnection = new RTCPeerConnection({
		"iceServers": [{
			"url": "stun: " + stunServer
		}]
	});

	peerConnection.onicecandidate = function(iceEvent) {

	};

	peerConnection.onaddstream = function(event) {

	};

	function callerSignalHandler(event) {
		var signal = JSON.parse(event.data);
		if (signal.type === "callee_arrived") {
			//callee has arrived initiated JSEP offer/answer process
			peerConnection.createOffer(newDescCreated, logError);
		} else if (signal.type === "new_ice_candidate") {
			//new ice candidate
		} else if (signal.type === "new_description") {
			//new description
		} else {
			//Not sure what to do
		}
	}

	////////////////////////
	////REMOTE PEER - callee
	////////////////////////
	function calleeSignalHandler(event) {
		var signal = JSON.parse(event.data);
		if (signal.type === "new_ice_candidate") {

		} else if (signal.type === "new_description") {
            peerConnection.setRemoteDescription(
                new rtcSessionDescription(signal.sdp),
                function () {
                    if (peerConnection.remoteDescription.type === "offer") {
                        peerConnection.createAnswer(newDescCreated, logError);
                    }
                }, logError
            );
		} else {
			//Not sure what to do
		}
	}

	////////////////////////
	////GENERIC - functions used by both caller and callee
	////////////////////////
	function newDescCreated(desc) {
		//if offer is created succesfully, resulting description is set locally
		peerConnection.setLocalDescription(description,
            function () {
			signalingServer.send(
				JSON.stringify({
					call_token: callToken,
					type: "new_description",
					sdp: description
				})
			);
		}, logError);
	}
	return peerConnection;
}

function logError(msg) {
	console.error(msg);
}