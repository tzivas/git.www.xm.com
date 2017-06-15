$(document).ready(function() {
    // Trim form fields on change
    $('input[type!="file"], select').each(function(){
        $(this).on('change', function(){
            $(this).val($.trim($(this).val()));
        });
    });

    topStickyHandler();
    $('.top-sticky i').on('click', function() {
        topStickyHandler();
    });

    if ($('[data-conditional]').length > 0) {
        $('[data-conditional]').addClass('hidden');
        var currentDataControl;
        $('select')
            .click(function () {
                currentDataControl = $('option[value="' + $(this).val() + '"]', this).data('control');
            })
            .on('change', function () {
                var selectedDataControl = $('option:selected', this).data('control');

                if (currentDataControl !== undefined && currentDataControl !== selectedDataControl)
                    $('[data-conditional="' + currentDataControl + '"]').addClass('hidden');

                else if (selectedDataControl !== undefined)
                    $('[data-conditional="' + selectedDataControl + '"]').removeClass('hidden');
            });
    }

    $('[data-conditional-target]')
        .each(function () {
            conditionalFields($(this));
        })
        .on('change', function () {
            conditionalFields($(this));
        });

    $('[data-conditional-field]').each(function() {
        $(this).addClass('hidden');
    });

    $('[data-conditional-handler]')
        .each(function () {
            conditionalFormFields($(this));
        })
        .on('change', function () {
            conditionalFormFields($(this));
        });

    if (htmlLang == 'el') {
        var uppercaseClasses = getUppercaseClasses();
        removeAccents(uppercaseClasses);
    }

    $('.clear-input').on('click', function() {
        var inputGroup = $(this).closest('.row').find('.input-group');
        if (inputGroup.find('input').val())
            inputGroup
                .find('input')
                .val('')
                .end()
                .removeClass('has-success has-error')
                .find('.glyphicon-wrapper').remove()
                .end()
                .siblings('label.error').remove();
    });

    var currentPath = location.href.split('#')[0];
    $('.sidebar .menu li a').each(function() {
        var $this = $(this);
        if ($(this).attr('href') == currentPath)
            $(this).addClass('active');

        if(currentPath.search("password/reset/investor") != -1) {
            if ($(this).attr('href').search("password/reset") != -1)
                $(this).addClass('active');
        }
    });

    //$('.whatis.enable').tooltip();
    $('.whatis.enable').each(function(index, element){
        $(element).popover({
            html: true,
            placement: 'bottom',
            animation: 'true',
            trigger: 'hover',
            template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="whatis-content" class="popover-content">' + $(element).attr("data-original-title") + '</div></div>',
            content: function() {
                return $(element).html();
            }
        });
    });

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

    //Multi-Date Seminar
    $("#seminar_select").change(function () {
        $(".seminarInfo").addClass('hidden');
        $("#not-applicable-form").addClass('hidden');
        $("#"+$(this).val()).removeClass('hidden');

        if ($(this).val() == '') {
            $(".seminarInfo").addClass('hidden');
            $("#not-applicable-form").removeClass('hidden');
        }
    });

});

function topStickyHandler() {
    $('.top-sticky').slideToggle(500);
}

function conditionalFields(selector) {
    var target = selector.data('conditional-target'),
        targetSelector = $('[data-conditional="' + target + '"]'),
        triggerValues = selector.data('conditional-values'),
        currentValue = selector.val();
    if (currentValue !== undefined && $.inArray(currentValue, triggerValues) != -1) {
        targetSelector.removeClass('hidden');
    }
    else {
        targetSelector.addClass('hidden');
    }
}

function conditionalFormFields(selector) {
    var handler = selector.data('conditional-handler'),
        handlerValue = selector.val();
    $.each(handler, function(key, value) {
        var fieldSelector = $('[data-conditional-field="' + key + '"]');
        if (fieldSelector.length > 0) {
            if (handlerValue !== undefined && $.inArray(handlerValue, value) != -1) {
                fieldSelector.removeClass('hidden');
            } else {
                fieldSelector.addClass('hidden');
            }
        }
    });
}

function enableFormField(selector) {
    selector
        .removeAttr('disabled');
}

function disableFormField(selector) {
    selector
        .attr('disabled','disabled')
        .removeClass('error')
        .siblings('label.error').remove()
        .end()
        .siblings('.glyphicon-wrapper').remove()
        .end()
        .closest('.form-group').removeClass('has-error');
}

function scrollToObject(obj) {
    var stickyBarHeight = $('.sticky-bar.active').height();
    $('html, body').animate({
        scrollTop: obj.offset().top - 40 - stickyBarHeight
    }, 500);
}

function displayMt4ErrorMsg(mt4idObj, emailObj, message) {
    mt4idObj
        .removeClass('valid')
        .addClass('error');
    emailObj
        .removeClass('valid')
        .addClass('error');
    mt4idObj.parent().append('<label class="error" generated="true" for="mt4id">' + message + '</label>');
    scrollToObject(mt4idObj);
}

function filterObject(source, filter) {
    var result = {};
    $.each(source, function(key, value) {
        if ($.inArray(key,filter) == -1)
            result[key] = value;
    });
    return result;
}

function updateSelectOptions(fieldName, options, method) {
    method = method || 'append';

    var field = $('[name="' + fieldName + '"]'),
        fieldValue = field.val();

    field.find('option').remove();
    $.each(options, function(key, value) {
        addSelectOption(fieldName, key, value, method);
    });

    if (fieldValue == 0)
        field.prop('selectedIndex', 0);
    else if ((fieldValue in options) == false)
        field
            .prop('selectedIndex', 0)
            .valid();
    else
        field.val(fieldValue);
}

function addSelectOption(name, value, text, method) {
    method = method || 'append';

    if ($('[name="' + name + '"] option[value="' + value + '"]').length == 0) {
        $('[name="' + name + '"]')[method](
            $('<option/>', {
                value: value,
                text: text
            })
        );
    }
}

function removeSelectOption(name, value) {
    var selectField = $('[name="' + name + '"]'),
        initialSelectFieldVal = selectField.val(),
        selectFieldOption = $('[name="' + name + '"] option[value="' + value + '"]');

    if (selectFieldOption.length > 0) {
        $('[name="' + name + '"] option[value="' + value + '"]').remove();
        if (selectField.val() != '' || initialSelectFieldVal != '')
            selectField.valid();
    }
}

function getUppercaseClasses() {
    var classes = '.main-photo .block h2, #owl-main .item .block h2, .toggleLeftNav span, .toggleRightNav span, ul#main-nav.navbar-nav > li > a, .buttons-wrap a.btn div, .reasons-list li a, h3.border, .main-photo .block .btn-readmore, #owl-main .item .block .btn-readmore, .seminars .panel-default > .panel-heading .date .month, .parent .top-bar h1';
    //.header-top .buttons-nav
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