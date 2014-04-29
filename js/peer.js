//////////////////
//RTC PEER CONNECTION
//////////////////

function initPeerConnection() {
	////////////////////////
	////LOCAL PEER - caller
	////////////////////////
	var localPeer;

	localPeer = new RTCPeerConnection({
		"iceServers": [{
			"url": "stun: " + stunServer
		}]
	});

	localPeer.onicecandidate = function(iceEvent) {

	};

	localPeer.onaddstream = function(event) {

	};

	function callerSignalHandler(event) {
		var signal = JSON.parse(event.data);
		if (signal.type === "callee_arrived") {
			//callee arrived
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

		} else {
			//Not sure what to do
		}
	}

	////////////////////////
	////GENERIC - functions used by both caller and callee
	////////////////////////
	function newDescCreated(desc) {

	}
}