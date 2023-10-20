const sideNav = document.querySelector("nav");
const menuBtn = document.querySelector(".fa-bars");
const modal = document.querySelector(".modal");

menuBtn.addEventListener("click", () => {
  sideNav.style.display = "block";
  modal.style.display = "block";
});

modal.addEventListener("click", () => {
  sideNav.style.display = "none";
  modal.style.display = "none";
});
