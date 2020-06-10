"use strict";
document.addEventListener(
  "DOMContentLoaded",
  function() {
    var bc = new BroadcastChannel("slide_navigation");

    window.onhashchange = function(e) {
      bc.postMessage({
        newURL: e.newURL
      });
    };

    bc.onmessage = function(e) {
      window.location = e.data.newURL;
    };

    var sectionsWithBackground = document.querySelectorAll(
      "section[data-background-image]"
    );
    sectionsWithBackground.forEach(function(e) {
      var url = e.dataset.backgroundImage;
      e.style.backgroundImage = "url(" + url + ")";
      e.style.backgroundSize = "cover";
    });

    var header = document.getElementById("header");
    if (header != null) {
      header.classList.add("side-menu", "hidden");
    }

    document.body.addEventListener("keydown", keyDownPressed, false);
    document.body.addEventListener("keydown", togglePresentationMode, false);
    document.body.addEventListener("keydown", togglePauseMode, false);

    // Add a css class to body.
    function togglePresentationMode(e) {
      if (e.code == "KeyN") {
        document.body.classList.toggle("presenter");
      }
    }

    // Add a css class to body.
    function togglePauseMode(e) {
      if (e.code == "KeyB" || e.code == "Period") {
        toggleElement("#pause");
      }

      if (e.code == "KeyT") {
        toggleElement("#header");
      }

      if (e.code == "KeyH") {
        toggleElement("#help");
      }

      if (e.code == "KeyF") {
        toggleFullScreen();
      }
    }

    function toggleElement(selector) {
      document.querySelector(selector).classList.toggle("hidden");
      document.querySelector(selector).classList.toggle("visible");
    }

    function controls(event) {
      navigate(event);
    }

    function start(event) {
      if (event.code === "ArrowRight") {
        window.location.hash = getFirstSlide().id;
      }
    }

    function getFirstSlide() {
      return getSlides()[0];
    }

    function getLastSlide() {
      var slides = getSlides();
      return slides[slides.length - 1];
    }

    function getSlides() {
      return document.querySelectorAll("section");
    }

    function getNextSlide() {
      return document.querySelector("section:target + section");
    }

    function getCurrentSlide() {
      return document.querySelector("section:target");
    }

    function getPreviousSlide() {
      return getCurrentSlide().previousElementSibling;
    }

    function isFirstSlide() {
      return window.location.hash === "#" + getFirstSlide().id;
    }

    function isLastSlide() {
      return window.location.hash === "#" + getLastSlide().id;
    }

    function keyDownPressed(event) {
      var activeSlide = getCurrentSlide();

      if (!activeSlide) {
        window.location.hash = getFirstSlide().id;
      }

      if (
        activeSlide &&
        !isLastSlide() &&
        !event.shiftKey &&
        (event.code === "ArrowRight" || event.code === "ArrowDown")
      ) {
        window.location.hash = getNextSlide().id;
      }

      if (
        !isFirstSlide() &&
        !event.shiftKey &&
        (event.code === "ArrowLeft" || event.code === "ArrowUp")
      ) {
        window.location.hash = getPreviousSlide().id;
      }

      if (event.code === "ArrowLeft" && event.shiftKey) {
        window.location.hash = getFirstSlide().id;
      }
      if (event.code === "ArrowRight" && event.shiftKey) {
        window.location.hash = getLastSlide().id;
      }
    }
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenEnabled) {
    alert("Fullscreen modus not available.")
    return;
  }

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
