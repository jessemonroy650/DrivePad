    //
    var myCircle = null;
    var myResults = null;
    var myX = null;
    var myY = null;
    var myCX = null;
    var myCY = null;
    var myTE = null;
    var myConsole = null;

var app = {
    self : {},
    //
    onDeviceReady : function () {
        //alert("device ready.");
        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
            //
            document.getElementById('exitApp').addEventListener('click', function() {
                app.exit();
            });
        } else if (device.platform == 'browser') {
            document.getElementById('exitApp').addEventListener('click', function() {
                app.exit();
            });
        }
        app.init(app.handleDrivePad);
    },
    //
    exit : function () {
        console.log('Called app.exit()');
        if ('app' in navigator) {
            navigator.app.exitApp();
        } else {
            alert('exit button hit.');
        }
    },
    //
    init : function (handler) {
        //alert("device ready.");
        myCircle  = document.getElementById("circle");
        myResults = document.getElementById("results");
        myContent = document.getElementById("content");
        myX = document.getElementById("x");
        myY = document.getElementById("y");
        myCX = document.getElementById("cx");
        myCY = document.getElementById("cy");
        myTE = document.getElementById("touchend");
        myConsole = document.getElementById("dbug_console");
        //
        drivePad.init('touch', myCircle, myContent, handler);
        myCX.innerHTML = drivePad.cx;
        myCY.innerHTML = drivePad.cy;
    },
    //
    handleDrivePad : function(r) {
        myResults.innerHTML = r.inside;
        myX.innerHTML = r.x;
        myY.innerHTML = r.y;
        myTE.innerHTML = r.end;
        console.log(r);
    }
};
//
// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);
//
