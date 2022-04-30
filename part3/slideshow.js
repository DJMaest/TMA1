const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const context = document.getElementById("slideshowCanvas").getContext("2d");
context.imageSmoothingEnabled = true;
const caption = document.getElementById("imageCaption");
const playBtn = document.getElementById("playBtn");
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
    { path: "../shared/images/part3/image-8.png", caption: "Edmonton balcony view at night" },
    { path: "../shared/images/part3/image-7.png", caption: "Edmonton at night" },
    { path: "../shared/images/part3/image-1.png", caption: "Casper on a circle" },
    { path: "../shared/images/part3/image-2.png", caption: "Casper and fruites" },
    { path: "../shared/images/part3/image-3.png", caption: "Casper peaking" },
    { path: "../shared/images/part3/image-4.png", caption: "Casper on the sofa" },
    { path: "../shared/images/part3/image-5.png", caption: "Embeded systems project" },
    { path: "../shared/images/part3/image-6.png", caption: "Persian new year table" },
    { path: "../shared/images/part3/image-9.png", caption: "Skiing at snow valley resort" },
    { path: "../shared/images/part3/image-10.png", caption: "Sunset at Elk island" },
    { path: "../shared/images/part3/image-11.png", caption: "Commute Bike" },
    { path: "../shared/images/part3/image-12.png", caption: "Outdoor barbeque" },
    { path: "../shared/images/part3/image-13.png", caption: "Northern Alberta Jubilee" },
    { path: "../shared/images/part3/image-14.png", caption: "Lego Night" },
    { path: "../shared/images/part3/image-15.png", caption: "Japanese BBQ" },
    { path: "../shared/images/part3/image-16.png", caption: "Ethiopian cuisine" },
    { path: "../shared/images/part3/image-17.png", caption: "Skiing helment and goggles" },
    { path: "../shared/images/part3/image-18.png", caption: "Bookshelf" },
    { path: "../shared/images/part3/image-19.png", caption: "Gaming PC" },
    { path: "../shared/images/part3/image-20.png", caption: "Skiing set" },

];
const { dWidth, dHeight } = { dWidth: 800, dHeight: 800 };
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

function setImageCaption(img){
    img.src = images[imageIndex].path;
    img.caption = images[imageIndex].caption;
    img.caption = `Image ${imageIndex + 1}: ${images[imageIndex].caption}`;
    caption.innerHTML = `Image ${imageIndex + 1}: ${images[imageIndex].caption}`;
}

function doSlideTransition() {
    context.globalAlpha = 1.0
    widthInterval += widthDelta;

    if (widthInterval > dWidth) {
        return;
    }
    const img = new Image();
    setImageCaption(img)
    img.addEventListener("load", () => {

        context.drawImage(img, 0, 0, img.width, img.height, -dWidth + widthInterval, 0, dWidth, dHeight);
        transitionLoop = setTimeout(doSlideTransition, 32);

    });

}

function doFadeTransition() {
    alpha += delta;
    if (alpha > 1) return;
    const img = new Image();
    setImageCaption(img)
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
            setImageCaption(img)
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
        setImageCaption(img)
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
        setImageCaption(img)
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

playBtn.addEventListener("mouseenter", () => {
    document.getElementsByClassName("toggle-play-btn")[0].src = isPlaying ? "../shared/icons/pause.png" : "../shared/icons/play.png";
});

playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    document.getElementsByClassName("toggle-play-btn")[0].src = isPlaying ? "../shared/icons/pause.png" : "../shared/icons/play.png";

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
        nextBtn.style.display = "none";
        previousBtn.style.display = "none";
        isRandom = true;
    } else {
        isRandom = false;
        nextBtn.style.display = "";
        previousBtn.style.display = "";
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