$(document).ready(function() {

    var fields = ['title', 'first_name', 'last_name', 'day', 'month', 'year', 'country', 'address', 'postal_zip', 'city', 'us_tax', 'us_tax_identification', 'phone_number', 'phone_number_2', 'email', 'trading_platform_type', 'account_type', 'account_currency', 'account_leverage', 'investment_amount', 'info_income', 'info_networth', 'info_education', 'info_transactions_purpose', 'info_employment', 'info_business', 'info_source_funds', 'traded_shares_times', 'traded_derivatives_times', 'traded_otc_times', 'professional_experience_level', 'understand_risk', 'account_password', 'account_password_confirmation'],
        countryField = $('[name="country"]'),
        phoneField = $('[name="phone_number"]'),
        accountField = $('[name="account_type"]');

    validateSelectFieldsOnChange();

    if (step == 1) {
        phoneFieldChange();
        displayCountryRestrictionMsg();
        displayCountryAccountTypeMsg();
        displayBrandInfoMsg();
        countryField.on('change', function () {
            phoneFieldChange();
            displayCountryRestrictionMsg();
            displayCountryAccountTypeMsg();
            displayBrandInfoMsg();
        });

        accountField.on('change', function () {
            displayCountryAccountTypeMsg();
        });
    }
    else if (step == 2) {
        validateFields();
        riskAcceptance();
        riskAcceptanceSelector.on('change', function () {
            riskAcceptance();
            if ($('.experience_msg').length) {
                experienceWarningMessage($(this));
            }
        });
    }

    /**
     *  Functions
     */
    function validateFields() {
        if (bonusAccountRule != '') {
            fields.push('bonus_account');
        }
        $.each(fields, function(key, value) {
            var field = $('[name="' + value + '"]');
            if (field.val() != '') {
                field.valid();
            }
        });
    }

    function validateSelectFieldsOnChange() {
        $('select').on('change', function() {
            $(this).valid();
        });
    }

    function phoneFieldChange() {
        var countryValue = countryField.val(),
            phoneValue = phoneField.val();

        if (phoneValue.length < 5) {
            if (countryValue == '') {
                phoneField.val('');
            } else if(countries[countryValue]) {
                phoneField.val('+' + countries[countryValue].cc);
            }
        }
    }

    function displayCountryRestrictionMsg() {

        $('#country-restriction').remove();

        if ($.inArray(countryField.val(), xmauCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmauCountriesMsg)).insertAfter('#country');
        }
        else if ($.inArray(countryField.val(), xmukCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmukCountriesMsg)).insertAfter('#country');
        }
        else if ($.inArray(countryField.val(), xmbzCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmbzCountriesMsg)).insertAfter('#country');
        }
        else if ($.inArray(countryField.val(), xmCountries) != -1) {
            $(countryRestrictionMsg.replace('{{country_msg}}', xmCountriesMsg)).insertAfter('#country');
        }
    }

    function displayCountryAccountTypeMsg() {
        if (countryField.val() == 'CN' && $.inArray(accountField.val(), chinaAccountTypes) != -1) {
            $('#account-types-restriction').remove();
            $(accountTypesRestrictionMsg.replace('{{account_types_msg}}', chinaAccountTypesMsg)).insertAfter('#account_type');
        }
        else {
            $('#account-types-restriction').remove();
        }
    }

    function displayBrandInfoMsg() {

        $('#info-message').remove();
        $('#trading-bonus-section').remove();

        if ($.inArray(countryField.val(), xmukCountriesInfo) != -1) {
            $(infoMsg.replace('{{info_msg}}', xmukInfoMsg)).insertAfter('#info');

            $(sidebarTradingBonusSection.replace('{{trading_bonus_title}}', xmuksidebarTradingBonusTitle)
                .replace('{{trading_bonus_msg}}', xmuksidebarTradingBonusMsg)
            ).insertAfter('#trading-bonus-xmuk');

            $('#trading-bonus-xmuk').hide();
        }
        else {
            $('#trading-bonus-xmuk').show();
        }
    }
});