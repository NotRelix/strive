const addFileBtn = document.querySelector(".add-file-btn");
const addFileModal = document.querySelector(".add-file-modal");
const addFileForm = document.querySelector(".add-file-form");
const addFileCloseBtn = addFileModal.querySelector(".add-file-close-btn");

const addFolderBtn = document.querySelector(".add-folder-btn");
const addFolderModal = document.querySelector(".add-folder-modal");
const addFolderInput = addFolderModal.querySelector("input");
const addFolderCloseBtn = document.querySelector(".add-folder-close-btn");
const addFolderForm = document.querySelector(".add-folder-form");
const backdrop = document.querySelector(".backdrop");

addFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
  backdrop.classList.add("show");
});

window.addEventListener("load", () => {
  addFileModal.classList.remove("show");
  backdrop.classList.remove("show");
});

addFolderBtn.addEventListener("click", () => {
  addFolderModal.classList.add("show");
  backdrop.classList.add("show");
  addFolderInput.focus();
});

window.addEventListener("load", () => {
  addFolderModal.classList.remove("show");
  backdrop.classList.remove("show");
})

document.addEventListener("click", (e) => {
  if (
    e.target === addFileModal ||
    e.target === addFileCloseBtn ||
    e.target === backdrop
  ) {
    addFileModal.classList.remove("show");
    backdrop.classList.remove("show");
  }

  if (
    e.target === addFolderModal ||
    e.target === addFolderCloseBtn ||
    e.target === backdrop
  ) {
    addFolderModal.classList.remove("show");
    backdrop.classList.remove("show");
  }
});
