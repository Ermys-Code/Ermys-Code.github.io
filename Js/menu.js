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
    if (url.origin !== location.origin) return;                       // enlaces externos
    if (url.pathname === location.pathname && url.search === location.search) return; // misma página / #ancla

    e.preventDefault();
    root.classList.add("is-leaving");
    setTimeout(function () { location.href = link.href; }, FADE_MS);
  });
})();
