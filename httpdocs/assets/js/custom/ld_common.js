$(document).ready(function() {

// Trim form fields on change
$('input, select').each(function(){
    $(this).on('change', function(){
        $(this).val($.trim($(this).val()));
    });
});

// Replace arrow-up with arrow-down and vice versa
$('.competition_paragraph a.expander').click(function() {
	$('.competition_paragraph span').toggleClass('arrow-down');
	$('.competition_paragraph span').toggleClass('arrow-up');
});

// Copyright message vertical align
if($('.copyright .text').outerWidth() > 959){
	$('.case-breaker').html('<br>');
	$('.copyright .text').css({'line-height':16+'px' , 'margin-top':1, 'width':960});
}

// Auto align footer icons based on number+width of them - first row
var ftIconsWidth_frow = 0;
for(i=0; i<$('#footer .frow span.items img').length; i++){
    ftIconsWidth_frow = ftIconsWidth_frow + $('#footer .frow span.items img').eq(i).width();
}
if(htmlLang=='ar' || htmlLang=='fa'){
    var ftIconMargin = (956-ftIconsWidth_frow)/($('#footer .frow span.items img').length-1);
    $('#footer .frow span.items').css('margin-left',ftIconMargin);
    $('#footer .frow span.items').eq($('#footer .frow span.items img').length-1).css('margin-left',0);
} else {
    var ftIconMargin = (924-ftIconsWidth_frow)/($('#footer .frow span.items img').length-1);
    $('#footer .frow span.items').css('margin-right',ftIconMargin);
    $('#footer .frow span.items').eq($('#footer .frow span.items img').length-1).css('margin-right',0);
}

var ftngIconsWidth_frow = 0;
for(i=0; i<$('#footer-no_bg .frow span.items img').length; i++){
    ftngIconsWidth_frow = ftngIconsWidth_frow + $('#footer-no_bg .frow span.items img').eq(i).width();
}
if(htmlLang=='ar' || htmlLang=='fa'){
    var ftbgIconMargin = (956-ftngIconsWidth_frow)/($('#footer-no_bg .frow span.items img').length-1);
    $('#footer-no_bg .frow span.items').css('margin-left',ftbgIconMargin);
    $('#footer-no_bg .frow span.items').eq($('#footer-no_bg .frow span.items img').length-1).css('margin-left',0);
} else {
    var ftbgIconMargin = (924-ftngIconsWidth_frow)/($('#footer-no_bg .frow span.items img').length-1);
    $('#footer-no_bg .frow span.items').css('margin-right',ftbgIconMargin);
    $('#footer-no_bg .frow span.items').eq($('#footer-no_bg .frow span.items img').length-1).css('margin-right',0);
}

// Auto align footer icons based on number+width of them - sec row
var ftIconsWidth_srow = 0;
for(i=0; i<$('#footer .srow span.items img').length; i++){
    ftIconsWidth_srow = ftIconsWidth_srow + $('#footer .srow span.items img').eq(i).width();
}
if(htmlLang=='ar' || htmlLang=='fa'){
    var ftIconMargin = (956-ftIconsWidth_srow)/($('#footer .srow span.items img').length-1);
    $('#footer .srow span.items').css('margin-left',ftIconMargin);
    $('#footer .srow span.items').eq($('#footer .srow span.items img').length-1).css('margin-left',0);
} else {
    var ftIconMargin = (924-ftIconsWidth_srow)/($('#footer .srow span.items img').length-1);
    $('#footer .srow span.items').css('margin-right',ftIconMargin);
    $('#footer .srow span.items').eq($('#footer .srow span.items img').length-1).css('margin-right',0);
}

var ftngIconsWidth_srow = 0;
for(i=0; i<$('#footer-no_bg .srow span.items img').length; i++){
    ftngIconsWidth_srow = ftngIconsWidth_srow + $('#footer-no_bg .srow span.items img').eq(i).width();
}
if(htmlLang=='ar' || htmlLang=='fa'){
    var ftbgIconMargin = (956-ftngIconsWidth_srow)/($('#footer-no_bg .srow span.items img').length-1);
    $('#footer-no_bg .srow span.items').css('margin-left',ftbgIconMargin);
    $('#footer-no_bg .srow span.items').eq($('#footer-no_bg .srow span.items img').length-1).css('margin-left',0);
} else {
    var ftbgIconMargin = (924-ftngIconsWidth_srow)/($('#footer-no_bg .srow span.items img').length-1);
    $('#footer-no_bg .srow span.items').css('margin-right',ftbgIconMargin);
    $('#footer-no_bg .srow span.items').eq($('#footer-no_bg .srow span.items img').length-1).css('margin-right',0);
}

$('.expander').simpleexpand();

$('.qq').on('click', function() {
    qq();
    return false;
});

function qq() {
    var qqUrl = "http://b.qq.com/webc.htm?new=0&sid=800005224&eid=2188z8p8p8p8p8R8K8K8Q&o=www.trading-point.com/zh&q=7&ref=http://www.trading-point.com/zh/old",
        qqTarget = "support",
        qqWindowFeatures = "toolbar=no, resizable=yes, status=no, menubar=no, location=no, width=500, height=400, copyhistory=no, scrollbars=yes, directories=no";

    qqWindow = window.open(qqUrl, qqTarget, qqWindowFeatures);
    if (window.focus)
        qqWindow.focus();

    return;
}

// Remove tones from greek capital letters
jQuery(".comp_title, .actionstrip h4, .top_bullets").each(function() {
    $(this).html($(this).html().replace(/[ά]/g,"α"));
    $(this).html($(this).html().replace(/[έ]/g,"ε"));
    $(this).html($(this).html().replace(/[ή]/g,"η"));
    $(this).html($(this).html().replace(/[ύ]/g,"υ"));
    $(this).html($(this).html().replace(/[ώ]/g,"ω"));
    $(this).html($(this).html().replace(/[ί]/g,"ι"));
    $(this).html($(this).html().replace(/[ό]/g,"ο"));
    $(this).html($(this).html().replace(/[Ά]/g,"Α"));
    $(this).html($(this).html().replace(/[Έ]/g,"Ε"));
    $(this).html($(this).html().replace(/[Ή]/g,"Η"));
    $(this).html($(this).html().replace(/[Ύ]/g,"Υ"));
    $(this).html($(this).html().replace(/[Ώ]/g,"Ω"));
    $(this).html($(this).html().replace(/[Ί]/g,"Ι"));
    $(this).html($(this).html().replace(/[Ό]/g,"Ο"));
});

});