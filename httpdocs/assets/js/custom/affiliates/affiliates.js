$(document).ready(function() {
    var fields = ['title', 'first_name', 'last_name', 'dob_day', 'dob_month', 'dob_year', 'country', 'address', 'postal_zip', 'city', 'state_region', 'phone_number', 'email', 'skype', 'messenger', 'wechat', 'phone_number_2', 'company', 'url', 'vat_id', 'preferred_language', 'account_password', 'account_password_confirmation'],
        countryField = $('[name="country"]');

    $('select').on('change', function () {
        $(this).valid();
    });

    $.each(fields, function(key, value) {
        var field = $('[name="' + value + '"]');
        if (field.val() != '') {
            field.valid();
        }
    });

    displayCountryRestrictionMsg();

    countryField.on('change', function () {
        displayCountryRestrictionMsg();
    });

    /**
     *  Functions
     */
    function displayCountryRestrictionMsg() {
        $('#country-restriction').remove();
        if ($.inArray(countryField.val(), xmCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmCountriesMsg)).insertAfter('#country');
        }
        else if ($.inArray(countryField.val(), xmbzCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmbzCountriesMsg)).insertAfter('#country');
        }
    }
});