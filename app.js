    //
    var myCircle = null;
    var myResults = null;
    var myX = null;
    var myY = null;
    var myCX = null;
    var myCY = null;
    var myTE = null;
    var myConsole = null;
    var drFired =  false;

var app = {
    self : {},
    //
    onDeviceReady : function () {
        //alert("device ready.");
        // Setup debug console
        myConsole = document.getElementById("dbug_console");
        console.log("device ready.");
        drFired = true;
        if (device.platform === "iOS") {
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
            //
            document.getElementById('exitApp').addEventListener('click', function() {
                app.exit();
            });
        }
        console.log("app init");
        app.init();
        console.log("drivePad init");
        drivePad.init('touch', myCircle, myContent, app.handleDrivePad);
        console.log("done with deviceReady");
    },
    //
    exit : function () {
        console.log('Called app.exit()');
        navigator.app.exitApp();
    },
    //
    init : function () {
        //alert("device ready.");
        myCircle  = document.getElementById("circle");
        myResults = document.getElementById("results");
        myContent = document.getElementById("content");
        myX = document.getElementById("x");
        myY = document.getElementById("y");
        myCX = document.getElementById("cx");
        myCY = document.getElementById("cy");
        myTE = document.getElementById("touchend");
        //
        myCX.innerHTML = drivePad.cx;
        myCY.innerHTML = drivePad.cy;
    },
    //
    handleDrivePad : function(r) {
        myResults.innerHTML = r.inside;
        myX.innerHTML       = r.x;
        myY.innerHTML       = r.y;
        myTE.innerHTML      = r.end;
        console.log(r);
    }
};


// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);
//
setTimeout(function() {
    if (! drFired ) {
        app.onDeviceReady();
    }
}, 5000);

