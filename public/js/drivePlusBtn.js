const plusBtn = document.querySelector(".plus-btn-container");
const plusBtnMenu = document.querySelector(".plus-btn-menu-container");

plusBtn.addEventListener("click", () => {
  plusBtnMenu.classList.add("show");
  backdrop.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".plus-btn-container")) {
    plusBtnMenu.classList.remove("show");
  }
});
