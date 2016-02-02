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
    onDeviceReady : function (flag) {
        drFired = true;
        //alert("device ready.");
        // Setup debug console
        myConsole = document.getElementById("dbug_console");
        if (flag === true) {
            consolex = console;
            consolex.log("timeout occured.");
        }
        consolex.log("device ready.");
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
        } else if (device.platform === "browser") {
            // hide Exit button. They don't have one with the webbrowser.
            document.getElementById('exitApp').classList.add("hidden");
        }
        consolex.log("app init");
        app.init();
        consolex.log("drivePad init");
        drivePad.init('touch', myCircle, myContent, app.handleDrivePad);
        consolex.log("done with deviceReady");
    },
    //
    exit : function () {
        consolex.log('Called app.exit()');
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
        consolex.log(r);
    }
};

var device = {'platform':'browser'};

// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);
//

setTimeout(function() {
    if (! drFired ) {
        app.onDeviceReady(true);
    }
}, 2000);
