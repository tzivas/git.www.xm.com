$(document).ready(function() {

// Set height to .centered-ver-wrapper divs
if($('#content .section .text').length > 0) {
    for(var i=0; i<$('#content .section .text').length; i++) {
        $('#content .section .image.centered-ver-wrapper').css('height', $('#content .section .text').eq(i).outerHeight() );
    }
}

});