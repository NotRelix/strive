document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-href]");

  if (!el) return;
  if (e.ctrlKey || e.metaKey || e.button !== 0) return;

  const href = el.getAttribute("data-href");
  if (!href || !href.startsWith("/")) return;

  e.preventDefault();

  document.getElementById("loading-screen").style.display = "flex";

  setTimeout(() => {
    window.location.href = href;
  }, 50);
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function () {
    document.getElementById("loading-screen").style.display = "flex";
  });
});

window.addEventListener("load", () => {
  document.getElementById("loading-screen").style.display = "none";
});
