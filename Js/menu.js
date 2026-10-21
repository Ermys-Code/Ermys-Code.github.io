document.documentElement.classList.add("js-nav");

document.addEventListener("DOMContentLoaded", function () {
  var inner = document.querySelector(".header-inner");
  var nav = inner && inner.querySelector("nav");
  if (!nav) return;

  nav.id = "site-nav";

  var button = document.createElement("button");
  button.className = "nav-toggle";
  button.type = "button";
  button.setAttribute("aria-label", "Menú");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "site-nav");
  button.innerHTML = "<span></span><span></span><span></span>";
  inner.insertBefore(button, nav);

  function setOpen(open) {
    button.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", function (e) {
    if (!inner.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });
});

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var FADE_MS = 150;
  var root = document.documentElement;

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) root.classList.remove("is-leaving");
  });

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest("a[href]");
    if (!link) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    root.classList.add("is-leaving");
    setTimeout(function () { location.href = link.href; }, FADE_MS);
  });
})();

(function () {
  var overlay, bigImg, closeBtn, lastFocus;
  var root = document.documentElement;
 
  function build() {
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Imagen ampliada");
    overlay.innerHTML =
      '<div class="lightbox-figure">' +
        '<button class="lightbox-close" type="button" aria-label="Cerrar">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" ' +
          'stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        "</button>" +
        '<img alt="">' +
      "</div>";
    document.body.appendChild(overlay);
 
    bigImg = overlay.querySelector("img");
    closeBtn = overlay.querySelector(".lightbox-close");
 
    overlay.addEventListener("click", function (e) {
      if (e.target !== bigImg) close();
    });
  }
 
  function open(img) {
    if (!overlay) build();
    lastFocus = img;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    var ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1.6;
    bigImg.style.setProperty("--ar", ratio);
    void overlay.offsetWidth;
    var scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) root.style.paddingRight = scrollbarWidth + "px";
    overlay.classList.add("is-open");
    root.classList.add("lightbox-open");
    closeBtn.focus();
  }
 
  function close() {
    if (!overlay || !overlay.classList.contains("is-open")) return;
    overlay.classList.remove("is-open");
    root.classList.remove("lightbox-open");
    root.style.paddingRight = "";
    if (lastFocus) lastFocus.focus();
  }
 
  function isOpen() {
    return overlay && overlay.classList.contains("is-open");
  }
 
  document.addEventListener("click", function (e) {
    var img = e.target.closest(".gallery img");
    if (img) open(img);
  });
 
  document.addEventListener("keydown", function (e) {
    if (isOpen()) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") e.preventDefault();
      return;
    }
    var img = e.target.closest && e.target.closest(".gallery img");
    if (img && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open(img);
    }
  });
 
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Ampliar imagen: " + img.alt);
    });
  });
})();