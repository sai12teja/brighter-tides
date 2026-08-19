/*
 * Re-runs the template's page-scoped animation setup.
 *
 * WHY THIS EXISTS
 * ---------------
 * assets/js/main.js was written for a multi-page static site: the browser
 * builds the DOM once, main.js runs once, and every animation is bound to
 * the elements that exist at that moment. React Router breaks that
 * assumption - navigating to another route unmounts the whole `<main>` and
 * mounts fresh DOM, so every element main.js had initialised is gone and
 * every element that replaced it was never initialised. Measured after one
 * client-side navigation: banner background images unapplied, 0/9 headings
 * split, testimonial and project sliders dead, counters frozen at 0.
 *
 * main.js itself cannot simply be re-executed - it also binds window- and
 * document-level handlers (sticky header, custom cursor, search overlay,
 * back-to-top) that would stack up a duplicate set on every navigation.
 * Those live on chrome that never unmounts, so they are correctly bound
 * once and left alone. Only the per-page half is repeated here, with the
 * same options as the original so behaviour does not drift.
 */

const isDesktop = () => window.innerWidth > 991;

/** The selector the template's sticky sidebar is built on - the one thing
 *  its resize handler is entitled to clear. See below. */
const STICKY_SIDEBAR = ".tj-sticky";

let unfilteredGetAll = null;

/** The real trigger list, whatever `ScrollTrigger.getAll` has been narrowed
 *  to for the template's benefit. */
function allScrollTriggers() {
  if (unfilteredGetAll) return unfilteredGetAll();
  return window.ScrollTrigger?.getAll?.() ?? [];
}

/**
 * Stops the template's sticky-sidebar setup from taking the whole page down
 * with it on every resize.
 *
 * main.js, verbatim:
 *
 *     function initStickySidebar() {
 *       if (window.innerWidth >= 992) {
 *         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
 *         gsap.to(".tj-sticky", { scrollTrigger: { ... pin: true ... } });
 *       }
 *     }
 *     initStickySidebar();
 *     window.addEventListener("resize", () => initStickySidebar());
 *
 * That first line kills *every* ScrollTrigger on the page - not the
 * sidebar's, everyone's - and then rebuilds only its own. On a desktop it
 * never shows, because nobody resizes a window mid-read. Small screens fire
 * `resize` constantly: hiding and re-showing the browser's address bar while
 * scrolling changes the viewport height, and so do rotation, the on-screen
 * keyboard and any change of zoom. Measured on this page at 1366x700, one
 * such event takes it from 44 scroll animations to 1 - mid-scroll, the
 * pinned service cards unpin and the content under the cursor jumps ~350px
 * at a scroll position the visitor never moved, the stacking effect is gone,
 * and nothing recovers until the next navigation. The 992px floor is why it
 * is tablets and small laptops that suffer and phones do not.
 *
 * The kill loop only knows what `ScrollTrigger.getAll()` tells it, so this
 * narrows that to the sidebar's own triggers. The template still cleans up
 * after itself - its previous pin is in the list it gets, so repeated
 * resizes cannot stack pins up - and every other animation on the page is
 * simply invisible to it. ScrollTrigger re-measures the survivors on resize
 * as it always has.
 *
 * Narrowing the static is safe: `getAll` returns a copy of an internal array
 * that the library itself works off directly and never reads back through
 * this method (checked against the bundled 3.11.4), and the one caller in
 * the template is the loop above. Everything of ours reads the real list
 * through `allScrollTriggers()`.
 */
export function protectVendorScrollTriggers() {
  const ST = window.ScrollTrigger;
  if (!ST || unfilteredGetAll) return;

  unfilteredGetAll = ST.getAll.bind(ST);
  ST.getAll = () => unfilteredGetAll().filter((trigger) => trigger.vars?.trigger === STICKY_SIDEBAR);
  // `ScrollTrigger.getAll()` is the first thing anyone reaches for in the
  // console when a scroll animation misbehaves, and from here on it answers
  // with one trigger. This is the way back to the real list.
  ST.getAllUnfiltered = unfilteredGetAll;
}

/** Elements React just replaced leave their ScrollTriggers pointing at
 *  detached nodes. Left alone these accumulate on every navigation and
 *  keep measuring nodes that are no longer laid out. */
function killDetachedScrollTriggers() {
  allScrollTriggers().forEach((trigger) => {
    const el = trigger.trigger || trigger.vars?.trigger;
    if (el instanceof Element && !document.body.contains(el)) {
      trigger.kill();
    }
  });
}

/** Swiper keeps its own resize and observer handlers alive for as long as
 *  the instance exists. Sliders belonging to a route React has unmounted go
 *  on listening and measuring detached nodes, so every navigation left
 *  another dead slider running. */
const liveSwipers = [];

function destroySwipersOfDetachedNodes() {
  for (let i = liveSwipers.length - 1; i >= 0; i -= 1) {
    const instance = liveSwipers[i];
    if (instance.el && document.body.contains(instance.el)) continue;
    // `destroy(deleteInstance, cleanStyles)` - styles are moot on a node that
    // is already gone, but it also detaches the listeners, which is the point.
    instance.destroy?.(true, false);
    liveSwipers.splice(i, 1);
  }
}

/** main.js: "Data BG Js" */
function applyDataBackgrounds() {
  document.querySelectorAll("[data-bg-image]").forEach((el) => {
    el.style.backgroundImage = `url(${el.getAttribute("data-bg-image")})`;
  });
  document.querySelectorAll("[data-mask]").forEach((el) => {
    el.style.maskImage = `url(${el.getAttribute("data-mask")})`;
  });
}

/** main.js: "Fun Fact Js" - jQuery.appear swaps in `data-count`, and the
 *  Odometer instance animates the digit roll off that mutation. */
function initCounters($) {
  window.Odometer?.init?.();
  if (!$?.fn?.appear) return;
  $(".odometer").each(function () {
    const $this = $(this);
    if ($this.data("bt-appear-bound")) return;
    $this.data("bt-appear-bound", true);
    $this.appear(
      function () {
        $this.html($this.attr("data-count"));
      },
      { accX: 0, accY: 0 }
    );
  });
}

/** main.js: "Rating Js" */
function initRatings($) {
  if (!$ || $(".fill-ratings span").length === 0) return;
  $(".star-ratings").width($(".fill-ratings span").width());
}

const SWIPERS = [
  {
    selector: ".tj-testimonial-slider",
    options: {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      speed: 1500,
      autoplay: { delay: 8500 },
      navigation: { nextEl: ".slider-next", prevEl: ".slider-prev" },
      pagination: { el: ".testimonial-pagination", clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        992: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      },
    },
  },
  {
    selector: ".project-slider",
    options: {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      speed: 2000,
      breakpoints: {
        375: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 3 },
        1400: { slidesPerView: 4 },
      },
    },
  },
  {
    // about.html's light logo strip. Same motion as brand-slider-1, with the
    // breakpoint ladder main.js gives this variant.
    selector: ".brand-slider-2",
    options: {
      slidesPerView: "auto",
      spaceBetween: 30,
      freemode: true,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      allowTouchMove: false,
      autoplay: { delay: 1, disableOnInteraction: true },
      breakpoints: {
        0: { slidesPerView: 2 },
        430: { slidesPerView: 2.5 },
        768: { slidesPerView: 3.3 },
        992: { slidesPerView: 4.5 },
        1200: { slidesPerView: 5.2 },
        1400: { slidesPerView: 6 },
      },
    },
  },
  {
    selector: ".brand-slider-1",
    options: {
      slidesPerView: "auto",
      spaceBetween: 30,
      freemode: true,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      allowTouchMove: false,
      autoplay: { delay: 1, disableOnInteraction: true },
      breakpoints: {
        0: { slidesPerView: 2 },
        576: { slidesPerView: 2.5 },
        768: { slidesPerView: 3.3 },
        992: { slidesPerView: 4.5 },
        1200: { slidesPerView: 5.2 },
        1400: { slidesPerView: 6 },
      },
    },
  },
];

function initSwipers() {
  if (typeof window.Swiper !== "function") return;
  SWIPERS.forEach(({ selector, options }) => {
    document.querySelectorAll(selector).forEach((el) => {
      // `el.swiper` is set by Swiper on the element it owns, so an already
      // live slider (e.g. the footer's, which never unmounts) is skipped.
      if (el.swiper) return;
      liveSwipers.push(new window.Swiper(el, options));
    });
  });
}

/** main.js: "Text Effect Animation" */
function initSplitTextHeadings() {
  const { gsap, SplitText } = window;
  if (!gsap || typeof SplitText !== "function") return;

  document.querySelectorAll(".text-anim").forEach((element) => {
    if (element.dataset.btSplit === "true") return;
    element.dataset.btSplit = "true";

    const split = new SplitText(element, { type: "chars, words" });
    gsap.from(split.chars, {
      duration: 1,
      delay: 0.1,
      x: 20,
      autoAlpha: 0,
      stagger: 0.03,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 85%" },
    });
  });
}

/** main.js: the `.svg-animate` stroke draw-in */
function initSvgDraw() {
  const { gsap } = window;
  if (!gsap) return;

  document.querySelectorAll(".svg-animate").forEach((box) => {
    if (box.dataset.btDrawn === "true") return;
    box.dataset.btDrawn = "true";

    box.querySelectorAll("path").forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        visibility: "visible",
        opacity: 1,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: box, start: "top 80%", toggleActions: "play none none none" },
      });
    });
  });
}

/** main.js: "Skill Progress Bar Js" */
function initProgressBars() {
  const { gsap } = window;
  if (!gsap) return;

  document.querySelectorAll(".tj-progress").forEach((container) => {
    if (container.dataset.btProgress === "true") return;
    container.dataset.btProgress = "true";

    const bar = container.querySelector(".tj-progress__bar");
    if (!bar) return;
    const target = parseInt(bar.getAttribute("data-perchant"), 10) || 0;

    gsap.to(bar, {
      width: `${target}%`,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: { trigger: container, start: "top 90%", end: "top 30%" },
      onUpdate() {
        const label = container.querySelector(".tj-progress__perchant");
        if (label) label.textContent = `${Math.round((target * Math.round(this.progress() * 100)) / 100)}%`;
      },
    });
  });
}

/** main.js: the pinned `.service-stack` cards (desktop only) */
function initServiceStack() {
  const { gsap } = window;
  if (!gsap || !isDesktop()) return;

  document.querySelectorAll(".service-stack").forEach((item) => {
    if (item.dataset.btStack === "true") return;
    item.dataset.btStack = "true";

    gsap.to(item, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      scrollTrigger: { trigger: item, scrub: true, start: "top top", pin: true, pinSpacing: false },
    });
  });
}

/** main.js: hero parallax (desktop only) */
function initHeroParallax() {
  const { gsap } = window;
  const hero = document.querySelector(".heroStack .tj-hero-section");
  if (!gsap || !hero || !isDesktop() || hero.dataset.btParallax === "true") return;
  hero.dataset.btParallax = "true";

  gsap.to(hero, {
    y: "30%",
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  });
}

/**
 * main.js: WOW reveals.
 *
 * WOW runs a 50ms interval and a body-wide MutationObserver per instance, so
 * building a new one on every navigation leaked one of each per route change.
 * One instance is kept and `sync()` re-scans for the boxes the new route
 * mounted - which is what WOW's live mode is for.
 */
let wow = null;

/**
 * Scroll transitions: a slow rise as a block comes into view, and the same in
 * reverse on the way back up.
 *
 * The template's own reveals (WOW.js) fire once and stay fired - scroll back
 * up and nothing moves, which is what made the page feel one-directional.
 * These are scrubbed instead: the tween is tied to scroll position rather
 * than played on a trigger, so it runs forwards and backwards with the wheel
 * and lands wherever the reader stops. Lenis drives ScrollTrigger from the
 * same ticker, so the motion is as smooth as the scroll itself.
 *
 * Transform only, never opacity: WOW owns opacity on these same elements, and
 * two owners of one property is a fight. Transform also stays on the
 * compositor, so a long page does not pay layout for it.
 */
function initScrollTransitions() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll("main > section > .container, main > div > .container").forEach((el) => {
    if (el.dataset.btScrollTx === "true") return;

    // The hero animates itself, and the services list is pinned - a second
    // transform on either fights an existing one.
    if (el.closest(".heroStack, .tj-service-section, .tj-evolute-area")) return;

    el.dataset.btScrollTx = "true";

    gsap.fromTo(
      el,
      { y: 44 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          // Starts as the block clears the fold and finishes well before it
          // leaves, so the movement is over by the time anyone reads it.
          start: "top bottom",
          end: "top 62%",
          scrub: 0.7,
        },
      }
    );
  });
}

/**
 * main.js: the process rail.
 *
 * It binds `#tj-process` once, at load, against the DOM of a static page - so
 * on a client-rendered route it finds nothing, and the rail's marker never
 * moves off the first step. Same logic, re-run per page: hovering a step
 * marks it active and slides the marker to its share of the rail.
 */
function initProcessRail() {
  document.querySelectorAll("#tj-process, #tj-process-2").forEach((container) => {
    if (container.dataset.btRail === "true") return;

    const items = container.querySelectorAll(".process-item");
    const marker = container.querySelector(".process-line-active");
    if (!items.length || !marker) return;

    container.dataset.btRail = "true";
    const portion = 100 / items.length;
    marker.style.insetInlineStart = "0";
    marker.style.top = "0";

    items.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        items.forEach((other) => other.classList.remove("active"));
        marker.style.top = `${portion * i}%`;
        item.classList.add("active");
      });
    });
  });
}

function initWow() {
  if (typeof window.WOW !== "function") return;

  if (wow) {
    wow.sync();
    return;
  }

  wow = new window.WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 80,
    callback(box) {
      box.style.visibility = "visible";
      box.style.opacity = "1";
    },
  });
  wow.init();
}

/**
 * main.js: "Nice Select Js".
 *
 * Without this the contact form's dropdown renders as a bare native select
 * on any client-side navigation, since main.js only styles the selects that
 * existed at load. nice-select is safe to re-run: it skips any select that
 * already has a `.nice-select` sibling, and re-binds its document handlers
 * under the `.nice_select` namespace after clearing them, so they cannot
 * stack up.
 */
function initNiceSelect($) {
  if (!$?.fn?.niceSelect) return;
  if ($("select").length === 0) return;
  $("select").niceSelect();
}

/** main.js: VenoBox video lightbox */
function initVideoPopup() {
  if (typeof window.VenoBox !== "function") return;
  const targets = document.querySelectorAll(".video-popup:not([data-bt-veno])");
  if (targets.length === 0) return;
  targets.forEach((el) => el.setAttribute("data-bt-veno", "true"));
  new window.VenoBox({ selector: ".video-popup", autoplay: true, spinner: "pulse" });
}

/**
 * A refresh one frame after mount measures a page whose images have no
 * dimensions yet, so every trigger below the first image is positioned
 * against a document that is about to grow. ScrollTrigger's own auto-refresh
 * listens for the window `load` event, which never fires again after the
 * first page, and image `load` does not bubble - so this re-measures once
 * the route's images have actually settled.
 */
function refreshWhenImagesSettle() {
  const images = Array.from(document.querySelectorAll("main img")).filter((img) => !img.complete);
  if (images.length === 0) return;

  let pending = images.length;
  const done = () => {
    pending -= 1;
    if (pending === 0) window.ScrollTrigger?.refresh?.();
  };

  images.forEach((img) => {
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

/**
 * Marks everything main.js initialised on the first page as already done.
 *
 * Every guard in this file (`data-bt-split`, `data-bt-drawn`, ...) is written
 * by this file alone - main.js leaves no marker of its own. So on first load
 * the same headings were split twice, the same paths re-armed twice, and the
 * same cards pinned twice, each pair fighting the other for the same element.
 * Called once, straight after main.js runs.
 */
export function claimVendorInitialised() {
  document.querySelectorAll(".text-anim").forEach((el) => (el.dataset.btSplit = "true"));
  document.querySelectorAll(".svg-animate").forEach((el) => (el.dataset.btDrawn = "true"));
  document.querySelectorAll(".tj-progress").forEach((el) => (el.dataset.btProgress = "true"));
  document.querySelectorAll(".service-stack").forEach((el) => (el.dataset.btStack = "true"));
  document.querySelectorAll(".video-popup").forEach((el) => el.setAttribute("data-bt-veno", "true"));

  const hero = document.querySelector(".heroStack .tj-hero-section");
  if (hero) hero.dataset.btParallax = "true";

  const $ = window.jQuery;
  if ($) $(".odometer").data("bt-appear-bound", true);

  // main.js constructs its own WOW instance in its load handler; adopting it
  // as ours would mean holding a reference we do not have, so instead the
  // first sync-or-create below is skipped by marking one as live.
  vendorWowLive = true;
}

let vendorWowLive = false;

/**
 * Initialise every page-scoped animation for whatever is currently mounted.
 * Safe to call repeatedly: each step either targets only un-initialised
 * elements or is idempotent.
 */
export function refreshTemplateAnimations() {
  const $ = window.jQuery;

  killDetachedScrollTriggers();
  destroySwipersOfDetachedNodes();

  applyDataBackgrounds();
  initCounters($);
  initRatings($);
  initSwipers();
  initSplitTextHeadings();
  initSvgDraw();
  initProgressBars();
  initServiceStack();
  initHeroParallax();
  initNiceSelect($);
  initVideoPopup();

  if (vendorWowLive) {
    // main.js's instance is live for this first page; its MutationObserver
    // picks up anything React mounts. Ours takes over from the next route.
    vendorWowLive = false;
  } else {
    initWow();
  }

  initProcessRail();
  initScrollTransitions();

  // Positions shift as the new sections lay out (and as pinned cards add
  // spacing), so triggers must re-measure once everything is in place.
  window.ScrollTrigger?.refresh?.();
  refreshWhenImagesSettle();
}
