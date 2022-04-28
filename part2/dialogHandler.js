
function openDialog(modal, quiz){
    modal.show();
    loadQuestions(`./quizzes/${quiz}.xml`);
}

function closeDialog(modal){
    modal.hide()
}

