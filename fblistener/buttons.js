/*

*/

$('#left20').click(function() {
    consolex.log('#left20');
    consolex.log($('#spotTouched').css('left'));
    $('#spotTouched').css('left', '110px' );
    $('#spotTouched').css('top', '110px' );
}) ;
$('#right20').click(function() {
    consolex.log('#right20');
    $('#spotTouched').css('left', '150px' );
    $('#spotTouched').css('top', '150px' );
}) ;
$('#up20').click(function() {
    consolex.log('#up20');
    $('#spotTouched').css('top', '110px' );
}) ;
$('#down20').click(function() {
    consolex.log('#down20');
    $('#spotTouched').css('top', '150px' );
}) ;

// IS THE POINT IN THE CIRCLE
$('#circle').click(function(e) {
    var r;
    consolex.log('#circle',e.pageX, e.pageY, driveIt.cx, driveIt.cy, driveIt.radius);
    r = driveIt.isPointInCircle(e.pageX, e.pageY, driveIt.cx, driveIt.cy, driveIt.radius);
    consolex.log(r);
    $('#results').html(r);
    var leftPadding = driveIt.cx - driveIt.radius;
    var topPadding  = driveIt.cy - driveIt.radius;
    // RRR - This makes sure the center of the dot moves to the center of the touch.
    // This appears to be a Zeptos bug
    //var touchRadius = 10; //$('#spotTouched').css('border-radius');
    var touchRadius = parseInt($('#spotTouched').css('width')) / 2;
    consolex.log('leftPadding:' + leftPadding, 'touchRadius:' + touchRadius );
    // touchRadius = 10;
    $('#spotTouched').css('left', (e.pageX - leftPadding - touchRadius) + 'px' );
    $('#spotTouched').css('top', (e.pageY - topPadding - touchRadius) + 'px' );
});












