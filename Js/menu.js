// Menú desplegable para móvil. Sin JavaScript, la navegación se ve completa.
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
