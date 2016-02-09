/*
    Date: 2016-02-03
*/

var myFirebaseRef = {};

var myFirebase = {
    callback : {},
    init     : function (URI, callback) {
        myFirebase.callback = callback
        myFirebaseRef       = new Firebase(URI);
        if (callback) {
            myFirebaseRef.on("child_added", function(snapshot) {
                myFirebase.callback(snapshot.val());
            });
        }
    },
    broadcastTrail : function (packet) {
        consolex.log('broadcastTrail:',packet);
        // This 'if' allows us to disable this function by commenting out myFirebase.init()
        if (typeof myFirebaseRef.push === 'function') {
            myFirebaseRef.push(packet);
        }
    }
};
