"use strict";

// ===== init =====
const init = () => {
  // # app height
  appHeight();
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${doc.clientHeight}px`);
};
window.addEventListener("resize", appHeight);

// ===== lenis =====
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(1 - t, 2.5)),
  smooth: true,
  mouseMultiplier: 1.0,
  smoothTouch: true,
  touchMultiplier: 1.5,
  infinite: false,
  direction: "vertical",
  gestureDirection: "vertical",
});
function raf(t) {
  lenis.raf(t);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== scroll trigger =====
const [fadeInArray, lineArray, anim] = [
  document.querySelectorAll("[data-fadein]"),
  document.querySelectorAll("[data-vertical-line]"),
  document.querySelectorAll("[data-anim]"),
];

const initScrollTrigger = (arr) => {
  arr.forEach((elem) => {
    const distInView =
      elem.getBoundingClientRect().top - window.innerHeight + 50;
    elem.classList.toggle("--show", distInView < 0);
  });
};

let ticking = false;
const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      initScrollTrigger(fadeInArray);
      initScrollTrigger(lineArray);
      initScrollTrigger(anim);
      ticking = false;
    });
    ticking = true;
  }
};

["pageshow", "scroll"].forEach((evt) => {
  window.addEventListener(evt, onScroll, { passive: true });
});

// ===== email =====
const user = "contact",
  domain = "noun-coltd.jp",
  mail = `${user}@${domain}`,
  link = `<a class="link-hover" href="mailto:${mail}">${mail}</a>`;
document.querySelector("[data-mail]").innerHTML = link;

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("pageshow", () => {
  history.scrollRestoration = "manual";
  document.body.classList.remove("fadeout");
});
window.addEventListener("DOMContentLoaded", init);
