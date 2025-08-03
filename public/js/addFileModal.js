const addFileBtn = document.querySelector(".add-file-btn");
const addFileModal = document.querySelector(".add-file-modal");
const addFileCloseBtn = addFileModal.querySelector(".modal-close");

addFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (e.target === addFileModal || e.target === addFileCloseBtn) {
    addFileModal.classList.remove("show");
  }
});
