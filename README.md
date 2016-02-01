# DrivePad
a simple UI to remotely drive telepresencse units


## DrivePad-Plugin-UI2 ##
Date: 2016-02-01

A User Interface element to assist in driving robotic platforms, and other similar tasks.
DrivePad is intended for touch screen and regular terminals with mice.

This code will port directly to [Phonegap Build](https://build.phonegap.com/), if you have an account. It has been tested with Phonegap 5.2.0+

The LICENSE is BSD2. You can get release by emailing me.

If you would like to test, and play with, the code before download it, go to codepen.

http://codepen.io/jessemonroy650/public/

At the bottom, you'll find the *UI Plugins*.
You want to try **DrivePad Plugin**.

**NOTE:** *This example only works with mice (mouse clicks)*

### README ###

The Plugin has three (3) important components.
The HTML block, the CSS block, and the Plugin.

### HTML ###
		<div id=circle></div>

### CSS ###
	/* REMINDER: border-radius must always be half of height/width */
	#circle {
		height:280px;width:280px;border-radius:140px;
		background-color:#2222ee;
	}
### Plugin ###

The plugin has three important parts, initialize, callback, returned values.

**initialize**
```
		drivePad.init('touch', myCircle, myContent, myCallback);
```
* 'touch' or 'click' are the only two allowed paramters
* *myCircle*, the object reference of your circle, usually `document.getElementById()`
* *myContent*, the object reference of the element surrounding your "circle"
* *myCallback*, the function reference to your callback function

**callback**

Your function that does something with the data (returned values, see below).

**returned values**

A JSON will be returned; it includes "x", "y", "inside", & "end".

* "x" - the X coordinate of the touch or click
* "y" - the Y coordinate of the touch or click
* "inside" -  a boolean indicating if the touch or click was inside the circle
* "end" - for touch only, indicates the *end* of touches. That is, the finger was lifted.

*x* & *y* are relative to the viewport (or your screen). It is not normalized to the circle.


