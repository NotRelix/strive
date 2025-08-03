const addFileBtn = document.querySelector(".add-file-btn");
const addFileModal = document.querySelector(".add-file-modal");

addFileBtn.addEventListener("click", () => {
  addFileModal.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (e.target === addFileModal) {
    addFileModal.classList.remove("show");
  }
});
