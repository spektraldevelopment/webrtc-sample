var rtcSessionDescription = null;
var stunServer = "stun.l.google.com:19302";

if (document.location.hash === "" || document.location.hash === undefined) {
	console.log("You are the caller!");
	var token = Date.now()+"-"+Math.round(Math.random()*10000);
    call_token = "#"+token;

    // set location.hash to the unique token for this call
    document.location.hash = token;
} else {
	console.log("You are the callee!");
}

function init() {
	var pc = initPeerConnection();
    initMediaStream(pc);
}