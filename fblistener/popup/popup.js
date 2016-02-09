var gWaittime    = 1000;
var gTimeouttime = 100;

/* insert "timeout" time into message */
//document.getElementById('timeouttime').innerHTML = gTimeouttime/1000;

var togglePopup = function() {
    console.log('togglePopup');
    var inside = {
        isVisible : 1,
        fadeIn : function () {
            document.getElementById('popup').style.opacity = 1;
            document.getElementById('popup').style.visibility = 'visible';
            console.log('opacity:1');
        },
        fadeOut : function() {
            // without 'transitionProperty' it pops
            document.getElementById('popup').style.transitionProperty = 'all';
            document.getElementById('popup').style.transitionDelay = '0';
            document.getElementById('popup').style.opacity = 0;
            document.getElementById('popup').style.visibility = 'collapse';
            console.log('opacity:0');
        }
    };
    if (inside.isVisible) {
        inside.isVisible = 0;
        inside.fadeOut();
    } else {
        inside.isVisible = 1;
        inside.fadeIn();
    }
};
