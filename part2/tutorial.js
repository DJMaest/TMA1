const tutorial = $("#tutorial");

const navButtonArr = [
    { codePath: './tutorial-sections/welcome.html', element: $("#welcomeBtn") },
    { codePath: './tutorial-sections/unit1.html', element: $("#unit1Btn") },
    { codePath: './tutorial-sections/unit2.html', element: $("#unit2Btn") },
    { codePath: './tutorial-sections/unit3.html', element: $("#unit3Btn") }
];
tutorial.load('./tutorial-sections/welcome.html');


navButtonArr.forEach(b => {
    b.element.on("click", () => {
        tutorial.load(b.codePath, ()=>{
            return;
        });
        navButtonArr.forEach(btn => {
            if (btn.element != b.element) {
                btn.element.attr("disabled", false)
            } else {
                btn.element.attr("disabled", true)
            }
        })
    })
});




