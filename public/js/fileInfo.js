const fileInfoContainer = document.querySelectorAll(".file-info-container");
const bodyBackdrop = document.querySelector(".body-backdrop");
const fileInfoContainerClose = document.querySelectorAll(
  ".file-info-container-close",
);

function openFileInfo(index) {
  fileInfoContainer[index].classList.add("show");
  bodyBackdrop.classList.add("show");
}

document.addEventListener("click", (e) => {
  if (e.target === bodyBackdrop) {
    fileInfoContainer.forEach((container) => {
      container.classList.remove("show");
    });
    bodyBackdrop.classList.remove("show");
  }

  fileInfoContainerClose.forEach((closeBtn, index) => {
    if (e.target === closeBtn) {
      fileInfoContainer[index].classList.remove("show");
      bodyBackdrop.classList.remove("show");
    }
  });
});
