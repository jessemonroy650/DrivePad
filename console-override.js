/*
	Created: 2015-04-18
    Updated: 2016-02-02

    Purpose: This module simulates `console.log()` except it pastes to the
             bottom of a webpage.

	1) Make this file load the next to last javascript file, before 'deviceready'.

    2) Add a `timeOut()` after trapping the 'deviceready' event.
       Use the timeout to call `deviceReady(true)`.

	2) Stick the HTML element (just below) at the bottom of the Document, above (</body>).

	    <pre id=dbug_console></pre>

	3) Put the lines below, at the top of your ''onDeviceReady()'' function.

	    myConsole = document.getElementById("dbug_console");
        if (flag === true) {
            consolex = console;
            consolex.log("timeout occured.");
        }

*/
// http://stackoverflow.com/questions/7042611/override-console-log-for-production
var consolex = {};
var theArgs = "";
// http://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
consolex.log = function() {
	theArgs = "";
    return;
	for (var i = 0; i < arguments.length; i++) {
		 theArgs = theArgs + JSON.stringify(arguments[i]) + ',' ;
	}
	myConsole.innerHTML = theArgs + "\n" + myConsole.innerHTML;
};
