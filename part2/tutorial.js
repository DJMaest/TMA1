const tutorialContainer = $("#tutorialContainer");
const welcomeBtn = $("#welcomeBtn");
const unit1Btn = $("#unit1Btn");
const unit2Btn = $("#unit2Btn");
const unit3Btn = $("#unit3Btn");
tutorialContainer.append($('<div>').load('./tutorial-section/welcome.html'));
welcomeBtn.attr("disabled", true);
