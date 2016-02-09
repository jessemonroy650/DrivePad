/*
    DrivePad v0.8.1 - initial release. touch not working, yet.
            v0.8.1 - 2015-04-18 - knocked out a nasty Phonegap/Android bug
            v0.9.0 - 2015-04-19T02:00 - touch working
            v0.9.1 - 2015-04-19 - clean up
            v0.9.2 - 2016-02-01 - localized some more variables.
            v0.9.3 - 2016-02-04 - Added getObjectLeftTop() and positionRelativeToCenter()
                         direction() = arctan(x/y)
                         speed()     = sqrt(x^2 + y^2);
            v0.9.4 - 2016-02-06 - refactor to add commonHandling()
*/
var drivePad = {
    Version : '0.9.4',
    theCallback : null,
    boundLeft : null,  /* left edge from left edge of window */
    boundTop  : null,  /* top edge from top edge of window */
    cx : null,  /* The circle center 'x'. */
    cy : null,  /* The circle center 'y'. */
    radius : null,
    //
    init : function(type, circleId, watchId, callback) {
        // save the callback
        drivePad.theCallback = callback;
        // assign a handler
        switch (type) {
            case 'click':
                watchId.addEventListener('click', drivePad.handleClick);
            break;
            case 'touch':
                watchId.addEventListener('touchstart',  drivePad.handleTouch);
                watchId.addEventListener('touchend',    drivePad.handleTouchEnd);
                watchId.addEventListener('touchcancel', drivePad.handleTouchEnd);
                watchId.addEventListener('touchmove',   drivePad.handleTouch);
            break;
            default:
                return false
            break;
        }
        // get the center of our circle, and it's radius
        // http://www.w3schools.com/js/js_function_invocation.asp
        // BUG: WebView (ala Phonegap/Android) has a rather nasty bug
        // that requires assignment to a single object, then demuxing (as seen)
        var data = drivePad.getObjectCenter(circleId);
        drivePad.cx = data[0];
        drivePad.cy = data[1];
        drivePad.radius = data[2];
        //
        var data2 = drivePad.getObjectLeftTop(circleId);
        drivePad.boundLeft = data2[0];
        drivePad.boundTop  = data2[1];
        //alert('init done');
    },
    commonHandling : function(x,y,altEndFlag) {
        altEndFlag = (typeof altEndFlag === 'undefined') ? false : true;
        var results = drivePad.isPointInCircle(x, y, drivePad.cx, drivePad.cy, drivePad.radius);
        var rel     = drivePad.positionRelativeToCenter({'x':x,'y':y });
        var bound   = drivePad.positionRelativeToParent({'x':x,'y':y });
        //consolex.log(rel);
        //consolex.log({"x":x, "y":y,"rx":rel[0], "ry":rel[1], "inside":results, "end": altEndFlag});
        drivePad.theCallback({
           "pageX":x,    "pageY":y,
           "bx":bound[0],"by":bound[1],
           "rx":rel[0],  "ry":rel[1],
           "inside":results, "end": altEndFlag});
    },
    //
    //    This is the mouse click. We only handle the simplest of cases to test our code.
    //
    handleClick : function(e) {
        // e = point clicked
        consolex.log("page", e.pageX, e.pageY);
        var x = e.pageX;
        var y = e.pageY;
        drivePad.commonHandling(x,y);
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
        drivePad.commonHandling(x,y,altEndFlag);
    },
    handleTouchEnd : function(evt) {
        drivePad.handleTouch(evt, true);
    },
    // ---------------------------------------------------------
    //
    //    return angels in cw=clockwise,ccw=counter-clockwise
    //
    direction : function (incomingObj) {
        return atan(abs(incomingObj.x)/abs(incomingObj.y));
    },
    //
    //    return length of third side - right angled triangle (solve for hypotenuse)
    //
    speed : function (incomingObj) {
        var data = positionRelativeToCenter(incomingObj);
        var x = abs(data.x);
        var y = abs(data.y);
        return sqrt((x*x) + (y*y));
    },
    // ---------------------------------------------------------
    //
    //    This position returned is relative to the page.
    //    Assume the `incomingObj` is relative to the center of the circle.
    //
    positionRelativeToPage : function (incomingObj) {
        var x = parseInt(incomingObj.x + drivePad.cx);
        var y = parseInt(incomingObj.y + drivePad.cy);
        //consolex.log('positionRelativeToPage:' + JSON.stringify(incomingObj), x, y);        
        return [x, y];
    },
    //
    //    This position returned is relative to the page.
    //    Assume the `incomingObj` is relative to the page.
    //
    positionRelativeToParent : function (incomingObj) {
        var x = incomingObj.x - drivePad.boundLeft;
        var y = incomingObj.y - drivePad.boundTop;
        //consolex.log('positionRelativeToParent:' + JSON.stringify(incomingObj),
        //            drivePad.boundLeft, drivePad.boundTop, x, y);        
        return [x, y];
    },
    //
    //    This position returned is relative to the center of the circle.
    //    Assume the `incomingObj` is relative to the page.
    //
    positionRelativeToCenter : function (incomingObj) {
        var x = parseInt(incomingObj.x - drivePad.cx);
        var y = parseInt(incomingObj.y - drivePad.cy);
        //consolex.log('positionRelativeToCenter:' + JSON.stringify(incomingObj), x, y);        
        return [x, y];
    },
    // ---------------------------------------------------------
    //
    //    This is rather generic. THIS IS RELATIVE TO THE WINDOW.
    //
    isPointInCircle : function(x, y, cx, cy, radius) {
        //consolex.log("checking", x, y, cx, cy, radius);
        return ((x-cx)*(x-cx)) + ((y-cy)*(y-cy)) < radius*radius;
    },
    //
    //    Get the Left Top coordinates of the circle.
    //
    getObjectLeftTop : function(myCircle) {
        var boundObj = myCircle.getBoundingClientRect();
        var x = Math.round( boundObj.left );
        var y = Math.round( boundObj.top );
        consolex.log('getObjectLeftTop:', x, y);
        return [x, y];
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
        //consolex.log("get", cx, cy, radius);
        // return (cx, cy, radius);
        return [cx, cy, radius];
    }
};
