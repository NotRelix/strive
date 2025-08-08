const fileInfoContainer = document.querySelector(".file-info-container");
const bodyBackdrop = document.querySelector(".body-backdrop");
const fileInfoContainerClose = document.querySelector(
  ".file-info-container-close"
);

function openFileInfo() {
  fileInfoContainer.classList.add("show");
  bodyBackdrop.classList.add("show");
}

document.addEventListener("click", (e) => {
  if (e.target === bodyBackdrop || e.target === fileInfoContainerClose) {
    fileInfoContainer.classList.remove("show");
    bodyBackdrop.classList.remove("show");
  }
});
