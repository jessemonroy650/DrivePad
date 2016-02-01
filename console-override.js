/*
	Created: 2015-04-18
    Updated: 2016-02-01

	<pre id=dbug_console></pre>

	1) Make this file the next to last javascript file loaded, before 'deviceready'.
	2) Stick the HTML element (just above) at the bottom of the Document, above (</body>).
	3) Put the line below, at the top of your ''onDeviceReady()'' function.

	myConsole = document.getElementById("dbug_console");

*/
// http://stackoverflow.com/questions/7042611/override-console-log-for-production
var console = {};
var theArgs = "";
// http://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
console.log = function() {
	theArgs = "";
	for (var i = 0; i < arguments.length; i++) {
		 theArgs = theArgs + JSON.stringify(arguments[i]) + ',' ;
	}
	myConsole.innerHTML = theArgs + "\n" + myConsole.innerHTML;
};
window.console = console;
