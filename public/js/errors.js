const closeBtns = document.querySelectorAll(".close-btn");

document.addEventListener("DOMContentLoaded", () => {
  const notifications = document.querySelectorAll(".notification-container li");
  notifications.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in");
    }, index * 50);
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    parent.style.opacity = "0";
    parent.style.transform = "translateX(100%)";
    setTimeout(() => {
      parent.style.display = "none";
    }, 300);
  });
});
