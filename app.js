//
var myCircle  = null;
var myContent = null;
var myResults = null;
var myX = null;
var myY = null;
var myRX = null;
var myRY = null;
var myBX = null;
var myBY = null;
var myCX = null;
var myCY = null;
var myEX = null;
var myEY = null;
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
        consolex.log("drivePad init touch");
        drivePad.init('touch', myCircle, myContent, app.handleDrivePad);
        consolex.log("drivePad init click (mouse)");
        drivePad.init('click', myCircle, myContent, app.handleDrivePad);
        myCX.innerHTML = Math.round(drivePad.cx);
        myCY.innerHTML = Math.round(drivePad.cy);
        myEX.innerHTML = Math.round(drivePad.boundLeft);
        myEY.innerHTML = Math.round(drivePad.boundTop);
        //
        //consolex.log("myFirebase init");
        myFirebase.init("https://bot-drive.firebaseio.com/drive", app.remoteSays);
        consolex.log("done with deviceReady");
        togglePopup();
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
        myRX = document.getElementById("rx");
        myRY = document.getElementById("ry");
        myBX = document.getElementById("bx");
        myBY = document.getElementById("by");
        myCX = document.getElementById("cx");
        myCY = document.getElementById("cy");
        myEX = document.getElementById("ex");
        myEY = document.getElementById("ey");
        myTE = document.getElementById("touchend");
    },
    //
    handleDrivePad : function(r) {
        var rndx = Math.round(r.pageX);
        var rndy = Math.round(r.pageY);
        myX.innerHTML       = rndx;
        myY.innerHTML       = rndy;
        myResults.innerHTML = r.inside;
        myTE.innerHTML      = r.end;
        myRX.innerHTML      = r.rx;
        myRY.innerHTML      = r.ry;
        myBX.innerHTML      = r.bx;
        myBY.innerHTML      = r.by;
        consolex.log("r:" + JSON.stringify(r));
        app.followInput({'pageX': rndx, 'pageY': rndy});
        setTimeout( function () {app.broadcastTrail({'x': r.bx, 'y': r.by}); }, 200);
    },
    remoteSays : function (r) {
        consolex.log("remoteSays:" + JSON.stringify(r));
/*
        var leftPadding = drivePad.cx - drivePad.radius;
        var topPadding  = drivePad.cy - drivePad.radius;
        var touchRadius = parseInt($('#dotAfter').css('width')) / 2;
*/
        var touchRadius = parseInt($('#dotAfter').css('width')) / 2;
        var x = r.x - touchRadius;
        var y = r.y - touchRadius;
        consolex.log("after:x,y:",x,y);
        $('#dotAfter').css('left', x + 'px' );
        $('#dotAfter').css('top', y + 'px' );
    },
    //
    followInput : function(e) {
        //consolex.log(e); return;
        var r = drivePad.isPointInCircle(e.pageX, e.pageY, drivePad.cx, drivePad.cy, drivePad.radius);
        $('#results').html(r);
        var leftPadding = drivePad.cx - drivePad.radius;
        var topPadding  = drivePad.cy - drivePad.radius;
        var touchRadius = parseInt($('#spotTouched').css('width')) / 2;
        //
        var x = e.pageX - leftPadding - touchRadius;
        var y = e.pageY - topPadding - touchRadius;
        console.log('touch:left,top:', x,y);
        $('#spotTouched').css('left', x + 'px' );
        $('#spotTouched').css('top', y + 'px' );
    },
    //
    broadcastTrail : function(r) {
        myFirebase.broadcastTrail(r);
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
