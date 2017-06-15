$(document).ready(function() {
    var fields = ['first_name', 'last_name', 'country', 'city', 'phone_number', 'email', 'trading_platform_type', 'account_type', 'account_currency', 'account_leverage', 'investment_amount', 'account_password', 'account_password_confirmation'],
        countryField = $('[name="country"]'),
        phoneField = $('[name="phone_number"]'),
        accountField = $('[name="account_type"]'),
        currencyFieldName = 'account_currency',
        leverageFieldName = 'account_leverage';

    validateFields();
    validateSelectFieldsOnChange();

    phoneFieldChange();
    displayCountryRestrictionMsg();
    displayCountryAccountTypeMsg();
    updateCurrencyOptions();
    updateLeverageOptions();

    countryField.on('change', function () {
        phoneFieldChange();
        displayCountryRestrictionMsg();
        displayCountryAccountTypeMsg();
        updateCurrencyOptions();
        updateLeverageOptions();
    });

    accountField.on('change', function () {
        displayCountryAccountTypeMsg();
        updateCurrencyOptions();
        updateLeverageOptions();
    });

    /**
     *  Functions
     */
    function validateFields() {
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
            if (countryValue == '')
                phoneField.val('');
            else if(countries[countryValue])
                phoneField.val('+' + countries[countryValue].cc);
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

    function updateCurrencyOptions() {
        var fieldValue = {
            'country': countryField.val(),
            'account_type': accountField.val()
        };

        updateSelectOptions(currencyFieldName, allCurrencies);

        // Account Type
        if (currencyRestrictions['account_type'][fieldValue['account_type']] !== undefined) {
            $.each(currencyRestrictions['account_type'][fieldValue['account_type']], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        }

        // Brand ID based on Country / Account Type selected
        if ($.inArray(fieldValue['country'], xmauCountries) != -1 && currencyRestrictions['brand_id']['xmau'] !== undefined) { // XMAU
            $.each(currencyRestrictions['brand_id']['xmau'], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        } else if ($.inArray(fieldValue['country'], xmbzCountries) != -1 && currencyRestrictions['brand_id']['xmbz'] !== undefined) { // XMBZ
            $.each(currencyRestrictions['brand_id']['xmbz'], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        } else if (($.inArray(fieldValue['country'], xmukCountries) != -1 && currencyRestrictions['brand_id']['xmuk'] !== undefined)
            || (fieldValue['country'] == 'CN' && $.inArray(fieldValue['account_type'], ['XMZero']) != -1)) { // XMUK
            $.each(currencyRestrictions['brand_id']['xmuk'], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        } else if ($.inArray(fieldValue['country'], xmCountries) != -1 && currencyRestrictions['brand_id']['xm'] !== undefined) { // XM
            $.each(currencyRestrictions['brand_id']['xm'], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        } else if (brandId == 'xmtd' && currencyRestrictions['brand_id']['xmtd'] !== undefined) { // XMTD
            $.each(currencyRestrictions['brand_id']['xmtd'], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        }

        // Country
        if (fieldValue['country'] == 'IR') {
            $.each(currencyRestrictions['country'][fieldValue['country']], function(index, value) {
                removeSelectOption(currencyFieldName, value);
            });
        }

        // Combination: Country & Account Type
        $.each(currencyRestrictions['country_account_type'], function(index, values) {
            if ($.inArray(fieldValue['country'], values['country']) != -1 && values['account_type'] == fieldValue['account_type']) {
                $.each(values['not_allowed_currencies'], function(key, currency) {
                    removeSelectOption(currencyFieldName, currency);
                });
            }
        });
    }

    function updateLeverageOptions() {
        var fieldValue = {
            'country': countryField.val(),
            'account_type': accountField.val()
        },
        leverageFieldOptions = allLeverages,
        restrictionLeverage = [],
        invalidLeverage = [],
        maxLeverage;

        // XMUK restriction
        if (($.inArray(fieldValue['country'], xmukCountries) != -1 || (fieldValue['country'] == 'CN' && $.inArray(fieldValue['account_type'], ['XMZero']) != -1))
            && leverageRestrictions['brand_id']['xmuk'] !== undefined) {
            restrictionLeverage.push(leverageRestrictions['brand_id']['xmuk']['maximum']);
        }

        // Account type restrictions
        if (leverageRestrictions['account_type'][fieldValue['account_type']] !== undefined) {
            restrictionLeverage.push(leverageRestrictions['account_type'][fieldValue['account_type']]['maximum']);
        }

        // Country restrictions
        $.each(leverageRestrictions['country']['maximum'], function(levValue, LevCountries) {
            if (jQuery.inArray(fieldValue['country'], LevCountries) >= 0) {
                restrictionLeverage.push(levValue);
            }
        });

        // Filter leverage options based on maxLeverage
        var leverages = Object.keys(leverageFieldOptions);
        maxLeverage = Math.max.apply(Math,leverages);
        if ($.isEmptyObject(restrictionLeverage) === false) {
            maxLeverage = Math.min.apply(Math, restrictionLeverage);
            $.each(leverageFieldOptions, function(index, value) {
                if (index > maxLeverage) {
                    invalidLeverage.push(index);
                }
            });
            leverageFieldOptions = filterObject(leverageFieldOptions, invalidLeverage);
        }

        // Update leverage select options
        leverageFieldOptions = filterObject(leverageFieldOptions, ['']);
        updateSelectOptions(leverageFieldName, leverageFieldOptions, 'prepend');
    }
});