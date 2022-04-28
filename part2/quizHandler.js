


function handleQuizSubmission(e) {

    var quizFile = `./quizzes/${e.value}.xml`;
    evaluateQuestions(quizFile);
    this.disabled = true;
}


function XmlHttpWrapper() {
    var xmlHttp;
    if (window.ActiveXObject === undefined) {

        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlHttp;
}

function ColorCodeAnswer(index, answer, status) {
    let statusColor = ""
    switch (status) {
        case "correct":
            statusColor = "#b90505";
            break;
        case "incorrect":
            statusColor = "#29a629";
            break;
        default:
            break;
    }
    var answers = document.getElementsByName(index);
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].value == answer) {
            var answerValue = answers[i].nextElementSibling;
            answerValue.style.color = statusColor;
        }

    }
}

function evaluateQuestions(xmlFileName) {
    var xmlHttp = XmlHttpWrapper();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            markAccumulator(this);
    };

    xmlHttp.open("GET", xmlFileName, true);
    xmlHttp.send();
}

function loadQuestions(xmlFileName) {
    var xmlHttp = XmlHttpWrapper();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            renderQuestions(this);
    };

    xmlHttp.open("GET", xmlFileName, true);
    xmlHttp.send();
}




function renderQuestions(xmlDocument) {

    var score = document.getElementById("score");
    score.style.display = 'none';

    $('#quizContent').empty();
    $("#quizTitle").empty();
    var response = xmlDocument.responseXML;
    var title = returnElementVal(response, "quizTitle");
    var titleElement = `<h2>${title}</h2>`;
    $(titleElement).appendTo("#quizTitle");

    var questionElements = response.getElementsByTagName("question");
    for (var i = 0; i < questionElements.length; i++) {
        var formElement = "<form>";
        var questionText = returnElementVal(questionElements[i], "text");
        questionText = `<bold>Question ${i + 1}:</bold> ${questionText}`;

        formElement += "<p>" + questionText + "</p><br/>";
        if (getAnswersInput(questionElements[i], "a", i)) {
            formElement += getAnswersInput(questionElements[i], "a", i);
        }

        if (getAnswersInput(questionElements[i], "b", i)) {
            formElement += getAnswersInput(questionElements[i], "b", i);
        }

        if (getAnswersInput(questionElements[i], "c", i)) {
            formElement += getAnswersInput(questionElements[i], "c", i);
        }

        if (getAnswersInput(questionElements[i], "d", i)) {
            formElement += getAnswersInput(questionElements[i], "d", i);
        }

        formElement += "</form>";

        $(formElement).appendTo("#quizContent");
        $("<hr/>").appendTo("#quizContent");
    }
}

function getAnswersInput(question, ansLetter, index) {
    var answerText = returnElementVal(question, ansLetter);
    if (!answerText) {
        return null;
    }
    var input = `<input type="radio" name="${index}" value="${ansLetter}"\"><span>${answerText}</span><br />`;
    return input;
}

function returnElementVal(parent, tag) {
    try {
        return parent.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
    } catch (e) {
        return null;
    }
}


function markAccumulator(xmlDocument) {
    var countCorrect = 0;
    var response = xmlDocument.responseXML;
    var correctAnswers = response.getElementsByTagName("answer");
    const numCorrectAns = correctAnswers.length
    for (var index = 0; index < numCorrectAns; index++) {
        ColorCodeAnswer(index, correctAnswers[index].textContent, "correct");
        try {
            const elemQuery = `input[name="${index}"]:checked`;
            var inputAns = document.querySelector(elemQuery).value;
            if (inputAns == correctAnswers[index].textContent) {
                countCorrect++;
            }
            else {
                ColorCodeAnswer(index, inputAns, "incorrect");
            }

        } catch (e) {
            console.log("Error occured in markAccumulator");
        }
    }

    const numCorrect = correctAnswers.length;
    percentage = Math.round(((countCorrect / numCorrect) * 100));
    var score = document.getElementById("score");
    score.textContent = `Mark: ${percentage}%`
    score.style.display = 'inline';
}








