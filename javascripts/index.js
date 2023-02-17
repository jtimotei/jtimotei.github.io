var limitScrolling;
var scrolling = false;
var count = 0;
var lastScrollPosition = 0;
var positionBackground = 0;
var scale = 0.17;
var navbarShown = false;


function smoothLazyScroll(difference) {
    scrolling = true;

    positionBackground += (difference*scale);
    if(positionBackground < limitScrolling) {
        positionBackground = limitScrolling;
    } else if(positionBackground > 0) {
        positionBackground = 0;
    }

    $("div#scrollable-background").animate({
        top: positionBackground
    }, { 
        duration: 0,
        complete: function() {
              scrolling = false;
          }
        }
    );
}

function displayNavbar() {
    var firstPageHeight = $("div#main-page").height();
    var windowWidth = $(document).width();
    var navbarHeight = $("div#navbar").height();
    var jitter = 10;
    if (lastScrollPosition >= (firstPageHeight - jitter) && !navbarShown
            && windowWidth > 320) {
        navbarShown = true;
        $("div#navbar").css("display", "flex");
        $("div#navbar").animate({
            top:"0px"
        }, 120);
    } else if (lastScrollPosition < (firstPageHeight - jitter) && navbarShown) {     
        navbarShown = false;   
        $("div#navbar").animate({
            top:-navbarHeight
        }, {
            duration:120,
            complete: function() {
                $("div#navbar").css("display", "none");
            }
        });
    }
}

function scrollHandler(event) {
    var difference = lastScrollPosition - $(document).scrollTop();
    lastScrollPosition = $(document).scrollTop();

    if (!scrolling) {        
        smoothLazyScroll(difference);
    }

    displayNavbar();
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

    $("div#navbar").css("top", -$("div#navbar").height());
    $("div.menu_buttons").on("click", scrollOnClick);
    $("div.navbar_buttons").on("click", scrollOnClick);
    $("div#main-page img#scroll_down").on("click", scrollOnClick);
    scrollHandler();
    $(document).on("scroll", scrollHandler);
}

$(document).ready(function() {
    setTimeout(main, 120);
});