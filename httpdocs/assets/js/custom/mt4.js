$(document).ready(function() {

	var htmlLang = $('html').attr('lang');

	if (htmlLang == 'el') {
	    var uppercaseClasses = getUppercaseClasses();
	    removeAccents(uppercaseClasses);
	}

	$('.qq').on('click', function() {
        qq();
        return false;
    });

    setIframeHeight();
    $(window).resize(function() {
        setIframeHeight();
    });
});

function setIframeHeight() {
    var headerHeight = $('#header').outerHeight(),
        footerHeight = $('#footer').outerHeight(),
        windowHeight = $(window).height(),
        iframeHeight = windowHeight - (headerHeight + footerHeight);

    $('#iframe-wrap').css({'height': iframeHeight});
}

function getUppercaseClasses() {
    var classes = '#header .btn-red #header ul#info > li > a';
    return classes;
}

function removeAccents(classes) {
    $(classes).each(function() {
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
}

function qq() {
    var qqUrl = "http://b.qq.com/webc.htm?new=0&sid=800005224&eid=2188z8p8p8p8p8R8K8K8Q&o=www.trading-point.com/zh&q=7&ref=http://www.trading-point.com/zh/old",
        qqTarget = "support",
        qqWindowFeatures = "toolbar=no, resizable=yes, status=no, menubar=no, location=no, width=500, height=400, copyhistory=no, scrollbars=yes, directories=no";

    qqWindow = window.open(qqUrl, qqTarget, qqWindowFeatures);
    if (window.focus)
        qqWindow.focus();

    return;
}