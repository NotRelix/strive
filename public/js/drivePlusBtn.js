const plusBtn = document.querySelector(".plus-btn-container");
const plusBtnMenu = document.querySelector(".plus-btn-menu-container");
const plusBtnMenuContent = document.querySelector(".plus-btn-menu-content");
const plusAddFileBtn = document.querySelector(".plus-add-file-btn");

plusBtn.addEventListener("click", () => {
  plusBtnMenu.classList.add("show");
  backdrop.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".plus-btn-container") && e.target !== plusBtnMenuContent) {
    plusBtnMenu.classList.remove("show");
  }
});

plusAddFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
})
