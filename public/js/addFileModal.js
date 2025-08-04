const addFileBtn = document.querySelector(".add-file-btn");
const addFileModal = document.querySelector(".add-file-modal");
const addFileForm = document.querySelector(".add-file-form");
const addFileCloseBtn = addFileModal.querySelector(".modal-close");
const backdrop = document.querySelector(".backdrop");

addFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
  backdrop.classList.add("show");
});

addFileForm.addEventListener("submit", () => {
  addFileModal.classList.remove("show");
  backdrop.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (
    e.target === addFileModal ||
    e.target === addFileCloseBtn ||
    e.target === backdrop
  ) {
    addFileModal.classList.remove("show");
    backdrop.classList.remove("show");
  }
});
