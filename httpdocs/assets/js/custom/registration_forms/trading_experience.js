var tradingKnowledgeWrapper = $("#trading-knowledge"),
    agreeAckSection = $('[data-conditional-field="agree_ack"]'),
    agreeAckField = $('[name="agree_ack"]'),
    professionalExperienceLevelField = $('[name="professional_experience_level"]'),
    tradedOtcTimesField = $('[name="traded_otc_times"]'),
    tradedDerivativesTimesField = $('[name="traded_derivatives_times"]'),
    tradedSharesTimesField = $('[name="traded_shares_times"]'),
    understandRiskField = $('[name="understand_risk"]'),
    riskAcceptanceSelector = $('[name="traded_shares_times"], [name="traded_derivatives_times"], [name="traded_otc_times"], [name="professional_experience_level"], [name="understand_risk"]'),
    displayRiskAcceptanceScore = 20,
    displayBlockWarningMessageMinScore = 0,
    displayBlockWarningMessageMaxScore = 5,
    displayLeverageWarningMessageMinScore = 10,
    displayLeverageWarningMessageMaxScore = 15,
    riskQuestionsValues = {
        "professional_experience_level": {
            "Recent work experience in a financial institution": 15,
            "A relevant professional qualification and/or education": 15,
            "Both of the above": 20,
            "None": 0,
            "": 0
        },
        "traded_otc_times": {
            "More than 25 times": 20,
            "10 to 25 times": 15,
            "Less than 10 times": 10,
            "Never": 0,
            "": 0
        },
        "traded_derivatives_times": {
            "More than 25 times": 15,
            "10 to 25 times": 10,
            "Less than 10 times": 5,
            "Never": 0,
            "": 0
        },
        "traded_shares_times": {
            "More than 25 times": 10,
            "10 to 25 times": 10,
            "Less than 10 times": 5,
            "Never": 0,
            "": 0
        },
        "understand_risk": {
            "yes": 5,
            "no": 0,
            "": 0
        }
    };

function riskAcceptance() {
    var tradedSharesTimesValue = tradedSharesTimesField.val(),
        tradedDerivativesTimesValue = tradedDerivativesTimesField.val(),
        tradedOtcTimesValue = tradedOtcTimesField.val(),
        professionalExperienceLevelValue = professionalExperienceLevelField.val(),
        understandRiskValue = understandRiskField.val();

    if (
        tradedSharesTimesValue == '' ||
        tradedDerivativesTimesValue == '' ||
        tradedOtcTimesValue == '' ||
        professionalExperienceLevelValue == '' ||
        understandRiskValue == ''
    ) {
        riskAcceptanceValidationRule = '';
        agreeAckSection.addClass('hidden');
        return;
    }

    var tradingExperienceScore = 0;
    tradingExperienceScore = tradingExperienceScore +
        riskQuestionsValues['traded_shares_times'][tradedSharesTimesValue] +
        riskQuestionsValues['traded_derivatives_times'][tradedDerivativesTimesValue] +
        riskQuestionsValues['traded_otc_times'][tradedOtcTimesValue] +
        riskQuestionsValues['professional_experience_level'][professionalExperienceLevelValue] +
        riskQuestionsValues['understand_risk'][understandRiskValue];

    if (tradingExperienceScore < displayRiskAcceptanceScore) {
        enableFormField(agreeAckField);
        agreeAckSection.removeClass('hidden');
    } else {
        disableFormField(agreeAckField);
        agreeAckSection.addClass('hidden');
    }
}

function experienceWarningMessage(clickedQuestion) {
    var professionalExperienceLevelValue = professionalExperienceLevelField.val(),
        tradedOtcTimesValue = tradedOtcTimesField.val(),
        tradedDerivativesTimesValue = tradedDerivativesTimesField.val(),
        tradedSharesTimesValue = tradedSharesTimesField.val(),
        understandRiskValue = understandRiskField.val(),
        tradingExperienceScore = 0,
        firstAnsweredQuestion = getFirstAnsweredQuestion();

    if (
        professionalExperienceLevelValue == '' &&
        tradedOtcTimesValue == '' &&
        tradedDerivativesTimesValue == '' &&
        tradedSharesTimesValue == '' &&
        understandRiskValue == ''
    ) {
        hideAllExperienceMessages();
        return;
    }

    tradingExperienceScore = tradingExperienceScore +
        riskQuestionsValues['professional_experience_level'][professionalExperienceLevelValue] +
        riskQuestionsValues['traded_otc_times'][tradedOtcTimesValue] +
        riskQuestionsValues['traded_derivatives_times'][tradedDerivativesTimesValue] +
        riskQuestionsValues['traded_shares_times'][tradedSharesTimesValue] +
        riskQuestionsValues['understand_risk'][understandRiskValue];

    if (tradingExperienceScore == displayBlockWarningMessageMinScore || tradingExperienceScore == displayBlockWarningMessageMaxScore) {
        hideAllExperienceMessages();
        checkMsgDisplayPosition(clickedQuestion, firstAnsweredQuestion, 'block_warning_msg');

    } else if(tradingExperienceScore == displayLeverageWarningMessageMinScore || tradingExperienceScore == displayLeverageWarningMessageMaxScore) {
        hideAllExperienceMessages();
        checkMsgDisplayPosition(clickedQuestion, firstAnsweredQuestion, 'leverage_warning_msg');

    } else {
        hideAllExperienceMessages();
        checkMsgDisplayPosition(clickedQuestion, firstAnsweredQuestion, 'knowledge_success_msg');
    }
}

function checkMsgDisplayPosition(clickedQuestion, firstAnsweredQuestion, msgClass) {
    if (clickedQuestion.val() != '') {
        displayExperienceMessage(clickedQuestion, msgClass);
    } else if (firstAnsweredQuestion != '') {
        displayExperienceMessage(firstAnsweredQuestion, msgClass);
    }
}

function hideAllExperienceMessages() {
    tradingKnowledgeWrapper.children().each(function() {
        $(this).find('.active')
            .removeClass('active');
    });
}

function displayExperienceMessage(selector, msgClass) {
    selector
        .parents('.score-wrap')
        .find('.' + msgClass)
        .addClass('active');
}

function getFirstAnsweredQuestion() {
    if (professionalExperienceLevelField.val() != '') {
        return professionalExperienceLevelField;
    }
    if (tradedOtcTimesField.val() != '') {
        return tradedOtcTimesField;
    }
    if (tradedDerivativesTimesField.val() != '') {
        return tradedDerivativesTimesField;
    }
    if (tradedSharesTimesField.val() != '') {
        return tradedSharesTimesField;
    }
    if (understandRiskField.val() != '') {
        return understandRiskField;
    }
    return '';
}