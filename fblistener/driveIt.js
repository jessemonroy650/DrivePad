/*
    DriveIt v0.8.0 - initial release.
*/
var driveIt = {
    Version : '0.8.0',
    theCallback : null,
    cx : null,
    cy : null,
    radius : null,
    //
    init : function(type, circleId, watchId, callback) {
        // save the callback
        driveIt.theCallback = callback;
        // assign a handler
        switch (type) {
            case 'firebase':
                // Register the 'firebase' callback - redirect to driveIt.handleTouch
            break;
            case 'pubnub':
                // Register the 'pubnub' callback - redirect to driveIt.handleTouch
            break;
            default:
                return false
            break;
        }
        // get the center of our circle, and it's radius
        // http://www.w3schools.com/js/js_function_invocation.asp
        // BUG: WebView (ala Phonegap/Android) has a rather nasty bug
        // that requires assignment to a single object, then demuxing (as seen)
        var data = driveIt.getObjectCenter(circleId);
        driveIt.cx = data[0];
        driveIt.cy = data[1];
        driveIt.radius = data[2];
        //alert('init done');
        consolex.log('center', driveIt.cx, driveIt.cy, driveIt.radius);
    },
    //
    //    This is the mouse click. We only handle the simplest of cases to test our code.
    //
    handleClick : function(e) {
        // e = point clicked
        //console.log("page", e.pageX, e.pageY);
        var x = e.pageX;
        var y = e.pageY;

        results = driveIt.isPointInCircle(x, y, driveIt.cx, driveIt.cy, driveIt.radius);
        //console.log(results);
        driveIt.theCallback({"x": x, "y": y, "inside": results});
    },
    //
    // http://www.w3.org/TR/touch-events/
    //
    handleTouch : function(e, altEndFlag) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#Example
        e.preventDefault();
        // We won't use 'targetTouches', since we may check for "touches" outside of our <div>
        //touchM = e.targetTouches;
        // http://stackoverflow.com/questions/9585487/cant-get-coordinates-of-touchevents-in-javascript-on-android-devices
        // We won't use 'touches', since 'touchend' and 'touchcanel' 
        // See W3C/Sect 5.6
        // "must not be included in the touches and targetTouches attributes."
        //touchM = e.touches;

        var x = 0; var y = 0;
        // According to the W3C/Sect 5.1,
        // only 'changedTouches' is returned with every event
        touchM = e.changedTouches;
        if (touchM.length > 0) {
            touchE = touchM[0];
            x = touchE.pageX;
            y = touchE.pageY;
        }
        var results = driveIt.isPointInCircle(x, y, driveIt.cx, driveIt.cy, driveIt.radius);
        altEndFlag = (typeof altEndFlag === 'undefined') ? false : true;
        driveIt.theCallback({"x":x, "y":y, "inside":results, "end": altEndFlag});
    },
    handleTouchEnd : function(evt) {
        driveIt.handleTouch(evt, true);
    },
    //
    //    This is rather generic.
    //
    isPointInCircle : function(x, y, cx, cy, radius) {
        //console.log("checking", x, y, cx, cy, radius);
        return ((x-cx)*(x-cx)) + ((y-cy)*(y-cy)) < radius*radius;
    },
    //
    //    Get the concentric center of the circle, and the radius.
    //
    getObjectCenter : function(myCircle) {
        // myCircle = the circle on the screen
        // https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect
        var boundObj = myCircle.getBoundingClientRect();
        // assume a perfectly round circle.
        var radius   = boundObj.height/2;
        // we'll use the left, top plus the radius to get our circle center
        // http://javascript.info/tutorial/coordinates
        var cx = boundObj.left + radius;
        var cy = boundObj.top + radius;
        //console.log("get", cx, cy, radius);
        // return (cx, cy, radius);
        return [cx, cy, radius];
    }

};
