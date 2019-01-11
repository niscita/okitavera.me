import "@babel/polyfill";
import LazyLoad from "vanilla-lazyload";
import disqusLoader from "./modules/DisqusLoader";
import importScr from "./modules/ImportSrc";
import pageLoader from "./modules/PageLoader";

function toggleScrollTopView(button) {
  var CALL_TICK = 250;
  setInterval(() => {
    var body = document.documentElement || document.body;
    var treshold = body.scrollTop > body.clientHeight / 4 ? 1 : 0;
    if (treshold) button.classList.add("show");
    else button.classList.remove("show");
  }, CALL_TICK);
}

function bannerListener(background) {
  function moveBackgroundPosition() {
    var limit = background.offsetTop + background.offsetHeight;

    if (window.pageYOffset < limit)
      background.style.backgroundPositionY = `-${window.pageYOffset / 6}px`;
    else background.style.backgroundPositionY = `0px`;
  }

  if (background && window.matchMedia("(min-width: 775px)").matches) {
    if (!window.requestAnimationFrame) moveBackgroundPosition();
    else window.requestAnimationFrame(moveBackgroundPosition);
  }
}

var imageLoader = new LazyLoad({ elements_selector: ".imlazy" });

var onPageScroll = function() {
  var banner = document.querySelector("[data-parallax]");
  var button = document.querySelector(".backtotop");
  bannerListener(banner);
  toggleScrollTopView(button);
};

var onPageLoad = function() {
  imageLoader.update();
  document.documentElement.style.scrollBehavior = "smooth";
  disqusLoader(disqusdata.username);
  document.querySelectorAll(".btn").forEach(function(button) {
    var color = getComputedStyle(button).color;
    button.addEventListener("mouseover", function() {
      button.style.color = color;
    });
  });
};

if ("fetch" in window) pageLoader(onPageLoad);

if (!"scroll-behaviour" in document.documentElement.style)
  importScr("/assets/js/polyfills/ScrollBehaviour.js");

window.addEventListener("load", onPageLoad);
window.addEventListener("scroll", onPageScroll, { passive: true });

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
