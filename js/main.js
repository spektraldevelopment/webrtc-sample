var rtcSessionDescription = null;
var stunServer = "stun.l.google.com:19302";

if (document.location.hash === "" || document.location.hash === undefined) {
	console.log("You are the caller!");
} else {
	console.log("You are the callee!");
}

function init() {
	var pc = initPeerConnection();
    initMediaStream(pc);
}