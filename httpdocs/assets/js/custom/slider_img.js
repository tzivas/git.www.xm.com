var imgAsync = document.getElementById('imgAsync');
var img = new Image();

img.onload = function () {
    imgAsync.style.background = "#000 url('"+ imgAsync.dataset.large + "')repeat-x center top";
    imgAsync.classList.add('loaded');
};
img.src = imgAsync.dataset.large;
