const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const context = document.getElementById("slideshowCanvas").getContext("2d");
context.imageSmoothingEnabled = true;
const caption = document.getElementById("imageCaption");
const playBtn= document.getElementById("playBtn");
const playBtnContainer = document.getElementById("");
const showToggle = document.getElementById("showToggle");
const transitionEffect = document.getElementById("transitionEffect");
var transitionLoop;
var interval;
var alpha = 0,   /// current alpha value
    delta = 0.005, /// delta = speed of fade
    widthInterval = 0,
    widthDelta = 20,
    imageIndex = 0,
    isPlaying = false,
    timeout = 3000,
    isRandom = false,
    effect = "none";
const images = [
    { path: "../shared/images/screen1.png", caption: "screen-1" },
    { path: "../shared/images/screen2.png", caption: "screen-2" },
    { path: "../shared/images/screen3.png", caption: "screen-3" },
    { path: "../shared/images/screen4.png", caption: "screen-4" },
    { path: "../shared/images/screen5.png", caption: "screen-5" },
];
const { dWidth, dHeight } = { dWidth: 800, dHeight: 600 };
displayImage(); // display default image

function setRandomIndex() {
    return Math.floor(Math.random() * images.length);
}

function setDisplayInterval() {

    clearInterval(interval);

    interval = setInterval(() => {
        var randValue = imageIndex;
        while (randValue === imageIndex)
            randValue = Math.floor(Math.random() * images.length);


        isRandom ? imageIndex = randValue : imageIndex = (imageIndex + 1) % images.length;
        displayImage();

    }, timeout);
}

function doSlideTransition() {
    context.globalAlpha = 1.0
    widthInterval += widthDelta;

    if (widthInterval > dWidth) {
        return;
    }
    const img = new Image();
    img.src = images[imageIndex].path;
    img.caption = images[imageIndex].caption;
    caption.innerHTML = images[imageIndex].caption;
    img.addEventListener("load", () => {

        context.drawImage(img, 0, 0, img.width, img.height, -dWidth + widthInterval, 0, dWidth, dHeight);
        transitionLoop = setTimeout(doSlideTransition, 32);

    });

}

function doFadeTransition() {
    alpha += delta;
    if (alpha > 1) return;
    const img = new Image();
    img.src = images[imageIndex].path;
    img.caption = images[imageIndex].caption;
    caption.innerHTML = images[imageIndex].caption;
    context.globalAlpha = alpha;
    img.addEventListener("load", () => {

        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, dWidth, dHeight);
        transitionLoop = setTimeout(doFadeTransition, 32);

    });
}

function displayImage() {
    alpha = 0
    switch (effect) {
        case "none": {

            clearTimeout(transitionLoop);
            context.globalAlpha = 1.0
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.beginPath();
            const img = new Image();
            img.src = images[imageIndex].path;
            img.caption = images[imageIndex].caption;
            caption.innerHTML = images[imageIndex].caption;
            img.addEventListener("load", () => {

                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, dWidth, dHeight);

            });
            break;
        }
        case "fade":
            /// clear canvas, set alpha and re-draw image
            alpha = 0;
            clearTimeout(transitionLoop);

            doFadeTransition();
            break;
        case "slide":
            widthInterval = 0;
            clearTimeout(transitionLoop);

            doSlideTransition();


            break;
    }



}

nextBtn.addEventListener("click", () => {
    if (effect === "slide") {
        const img = new Image();
        img.src = images[imageIndex].path;
        img.caption = images[imageIndex].caption;
        caption.innerHTML = images[imageIndex].caption;
        img.addEventListener("load", () => {

            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, dWidth, dHeight);

        });
    }
    imageIndex = (imageIndex + 1) % images.length;
    displayImage();
    clearInterval(interval);
    isPlaying && setDisplayInterval(); // reset interval

});

previousBtn.addEventListener("click", () => {
    if (effect === "slide") {
        const img = new Image();
        img.src = images[imageIndex].path;
        img.caption = images[imageIndex].caption;
        caption.innerHTML = images[imageIndex].caption;
        img.addEventListener("load", () => {

            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, dWidth, dHeight);

        });
    }
    imageIndex--;
    imageIndex < 0 ? imageIndex = imageIndex + images.length : imageIndex = imageIndex;
    displayImage();
    clearInterval(interval);
    isPlaying && setDisplayInterval();
});

playBtn.addEventListener("mouseenter", ()=>{
    document.getElementsByClassName("toggle-play-btn")[0].src = isPlaying? "../shared/icons/pause.png":"../shared/icons/play.png";
});

playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    document.getElementsByClassName("toggle-play-btn")[0].src = isPlaying? "../shared/icons/pause.png":"../shared/icons/play.png";

    if (isPlaying) {
        setDisplayInterval();
    }
    else if (interval) {
        clearInterval(interval);
    }

});




showToggle.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "random") {
        nextBtn.style.display="none";
        previousBtn.style.display="none";
        isRandom = true;
    } else {
        isRandom = false;
        nextBtn.style.display="";
        previousBtn.style.display="";
    }

});

transitionEffect.addEventListener("change", (e) => {
    const val = e.target.value;
    switch (val) {
        case "none":
            effect = "none";
            break;
        case "fade":
            effect = "fade";
            break;
        case "slide":
            effect = "slide";
            break;
    }
})