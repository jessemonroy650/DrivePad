/*
	Created: 2015-04-18

	<pre id=dbug_console>
	</pre>

	1) Stick the Javascript at the top of the First Javascript expose.
	2) Stick the HTML element (just above) at the bottom of the Document, above (</body>).
	3) Put the line below, at the to of your ''onDeviceReady()''

	myConsole = document.getElementById("dbug_console");

*/
	// http://stackoverflow.com/questions/7042611/override-console-log-for-production
	var dbug_console = null;
	var console = {};
	var theArgs = "";
	// http://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
	console.log = function() {
		theArgs = "";
		for (var i = 0; i < arguments.length; i++) {
			 theArgs = theArgs + JSON.stringify(arguments[i]) + ',' ;
		}
		dbug_console.innerHTML = theArgs + "\n" + myConsole.innerHTML;
	};
	window.console = console;
