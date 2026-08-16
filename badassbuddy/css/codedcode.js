/******************************************************************************
* Licence: WTFPL (http://es.wikipedia.org/wiki/WTFPL)
*
*
* Developed by @nestoralvaro
*
*******************************************************************************/
(function() {
    "use strict";
    // Some key codes that are used
    var up = 38,
	    down = 40,
	    left = 37,
	    right = 39,
	    A = 65,
	    B = 66;

    var	konamiCode = [up,up,down,down,left,right,left,right,B,A];
    // Deteted sequence. Empty by default
    var konamiDetected = [];

    // Attachs the function on an element (for a certain event)
    function attachCustomEvent(el, eventName, desiredFunction) {
	    if (el.addEventListener) {
		    el.addEventListener(eventName,desiredFunction,false);
	    // Old IE
	    } else {
		    el.attachEvent('on' + eventName,desiredFunction);
	    }
    }

    // Detachs the function on an element (for a certain event)
    function detachCustomEvent(el, eventName, desiredFunction) {
	    if (el.removeEventListener) {
		    el.removeEventListener(eventName,desiredFunction,false);
	    // Old IE
	    } else {
		    el.detachEvent('on' + eventName,desiredFunction);
	    }
    }

    // Function that is invoked after detecting the Konami Code
    function startUpKonami() {
	    // Prevent further detection (When removing this line the Konami code can be entered multiple times)
	    detachCustomEvent(document,"keydown",isKonamiKey);
	    konamiIsDetected();
    }

    // Function to detect whether the pressed key is part of the Konami Code
    function isKonamiKey(e) {
	    var evt = e || window.event;
        var key = evt.keyCode ? evt.keyCode : evt.which;
	    // Set to true before checking everything    
	    var codeOk = true;
        // Push the key
        konamiDetected.push(key);
        // Check if the key is valid or not
        if (konamiDetected.length < konamiCode.length) {
		    // Check that the values are Ok so far. If not clear the array
		    for (var i = 0, max = konamiDetected.length; i < max ; i++) {
        		if(konamiDetected[i] !== konamiCode[i]) {
	        		codeOk = false;
        		}
        	}
        	if (!codeOk) {
        		// Clean the array
        		konamiDetected = [];
        		// Push the just detected value inside the array
        		konamiDetected.push(key);
        	}
        } else if (konamiDetected.length === konamiCode.length) {
        	for (var j = 0, max = konamiDetected.length; j < max ; j++) {
        		if(konamiDetected[j] !== konamiCode[j]) {
	        		codeOk = false;
        		}
        	}
        	// Clean the array
        	konamiDetected = [];
        	if (codeOk) {
	        	startUpKonami();
        	}
        // This should never happen, but if it happens we clean the array
        } else {
	        konamiDetected = [];
        }
        // After everything has been checked show the resulting array after pressing such key
	    // console.log(konamiDetected);
    }

    // Attach the event detection to the whole document
    attachCustomEvent(document,"keydown",isKonamiKey);
})();

function konamiIsDetected() {
	alert("gmdieekzpzturmp");
}