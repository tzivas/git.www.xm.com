$.validator.addMethod('regex', function(value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
});

$.validator.addMethod('filesize', function(value, element, param) {
    // param = size in bytes
    return this.optional(element) || (element.files[0].size <= param)
});

$.validator.addMethod('require_from_group', function(value, element, options) {
    var valid = $(options[1], element.form).filter(function() {
            return $(this).val();
        }).length >= options[0];

    return valid;
});

$.validator.addMethod('chineseCharacters', function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa50-9]+$/.test(value);
});

$.validator.addMethod('ajaxAsync', function(value, element, param) {

    var response = false;
    param.data = {};
    $.each(param.dataFields, function(key, val) {
        param.data[val] = $('[name="' + val + '"]').val();
    });

    $.ajax({
        url: param.url,
        data: param.data,
        type:'POST',
        async: false,
        success: function( data ) {
            if(data != 'false') {
                response = true;
            }
        }
    });

    return response;

});

$.validator.addMethod('dateMultiple', function(value, element, params) {

    var dayValue = $('[name="' + params[0] + '"]').val(),
        monthValue = $('[name="' + params[1] + '"]').val(),
        yearValue = $('[name="' + params[2] + '"]').val();

    if (dayValue == '' || monthValue == '' || yearValue == '')
        return true;

    var day = parseInt(dayValue, 10),
        month = parseInt(monthValue, 10),
        year = parseInt(yearValue, 10),
        date = new Date(year, month - 1, day);

    return (date.getFullYear() == year && (date.getMonth() + 1) == month && date.getDate() == day);
});

$.validator.addMethod('adultAge', function(value, element, params) {

    var dayValue = $('[name="' + params[0] + '"]').val(),
        monthValue = $('[name="' + params[1] + '"]').val(),
        yearValue = $('[name="' + params[2] + '"]').val();

    if (dayValue == '' || monthValue == '' || yearValue == '')
        return true;

    var day = parseInt(dayValue, 10),
        month = parseInt(monthValue, 10),
        year = parseInt(yearValue, 10),
        date = new Date(year, month - 1, day),
        now = new Date(),
        dateAdult = date.setYear(date.getFullYear() + 18);

    return (dateAdult < now);
});

$.validator.addMethod("exactlength", function(value, element, param) {
    return this.optional(element) || value.length == param;
});

$.validator.addMethod("doNoStartWithSpecificChars", function(value, element, param) {
    var result = value.substring(0, param);
    if (result.toUpperCase() == "CA-")
        return false;
    
    return true;
});

$.validator.addMethod('is_valid_password', function(value, element, param) {
    // The password can not contain characters that are not english or numeric 
    if(/[^a-zA-Z0-9]/.test(value))
        return false;

    // Must have at least two of the following sets (Upper, lower and numeric)
    var matches = [
        (value.match(/[A-Z]/) || []).length, 
        (value.match(/[a-z]/) || []).length, 
        (value.match(/[0-9]/) || []).length
    ];
    return (matches[0] + matches[1] + matches[2]) >= 2;
});

$.validator.addMethod('must_match_with_value_of_element', function(value, element, target_element){
    return value === $(target_element).val();
});

$.validator.addMethod('matchText', function(value, element, target_element){
    return value === $(target_element).text();
});