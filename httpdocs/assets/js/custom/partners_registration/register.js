$(document).ready(function() {
    var fields = ['title', 'first_name', 'last_name', 'day', 'month', 'year', 'country', 'city', 'address', 'postal_zip', 'state_region', 'phone_number', 'skype', 'messenger', 'qq', 'wechat', 'email'],
        countryField = $('[name="country"]'),
        phoneField = $('[name="phone_number"]');

    $('select').on('change', function () {
        $(this).valid();
    });

    $.each(fields, function(key, value) {
        var field = $('[name="' + value + '"]');
        if (field.val() != '')
            field.valid();
    });

    addCodeToPhoneField();

    countryField.on('change', function () {
        addCodeToPhoneField();
    });

    /**
     *  Functions
     */
    function addCodeToPhoneField() {
        var countryValue = countryField.val(),
            phoneValue = phoneField.val();

        if (phoneValue.length < 5) {
            if (countryValue == '')
                phoneField.val('');
            else if(countries[countryValue])
                phoneField.val('+' + countries[countryValue].cc);
        }
    }
});