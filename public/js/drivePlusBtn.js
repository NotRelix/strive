const plusBtn = document.querySelector(".plus-btn-container");
const plusBtnMenu = document.querySelector(".plus-btn-menu-container");
const plusBtnMenuContent = document.querySelector(".plus-btn-menu-content");
const plusAddFileBtn = document.querySelector(".plus-add-file-btn");
const plusAddFolderBtn = document.querySelector(".plus-add-folder-btn")

plusBtn.addEventListener("click", () => {
  plusBtnMenu.classList.add("show-content");
  backdrop.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".plus-btn-container") &&
    e.target !== plusBtnMenuContent
  ) {
    plusBtnMenu.classList.remove("show-content");
  }
});

plusAddFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
});

plusAddFolderBtn.addEventListener("click", () => {
  addFolderModal.classList.add("show");
})
