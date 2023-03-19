var limitScrolling;
var scrolling = false;
var count = 0;
var lastScrollPosition = 0;
var positionBackground = 0;
var scale = 0.17;
var navbarShown = false;

function scrollHandler(event) {
    lastScrollPosition = $(document).scrollTop();
}

function scrollOnClick() {
    var section = $(this).attr("data-section");
    var offset = $("div#" + section).offset();
    window.scrollTo({
        top: offset.top,
        left: 0,
        behavior: 'smooth'
    });
}

function main() {
    limitScrolling = -0.3*$("div#scrollable-background").height();

    $("div#main-page div#main-page-container").animate({
        top:"0px",
        opacity:1
    }, 300, "linear");

    $("div.menu_buttons").on("click", scrollOnClick);
    $("div#main-page img#scroll_down").on("click", scrollOnClick);
    scrollHandler();
    $(document).on("scroll", scrollHandler);
}

$(document).ready(function() {
    setTimeout(main, 120);
});