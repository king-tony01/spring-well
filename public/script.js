const sideNav = document.querySelector("nav");
const menuBtn = document.querySelector(".fa-bars");
const modal = document.querySelector(".modal");
const links = document.querySelectorAll(".link");
menuBtn.addEventListener("click", () => {
  sideNav.style.display = "block";
  modal.style.display = "block";
});

modal.addEventListener("click", () => {
  hideMenu();
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = link.getAttribute("data-link");
    switch (clicked) {
      case "home":
        hideMenu();
        location.assign("/");
        break;
      case "services":
        hideMenu();
        document
          .querySelector(".services")
          .scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        hideMenu();
        document.querySelector(".about").scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        hideMenu();
        document
          .querySelector(".get-in-touch")
          .scrollIntoView({ behavior: "smooth" });
        break;
      case "login":
        hideMenu();
        location.assign("/loginform");
        break;
      case "signup":
        hideMenu();
        location.assign("/signupform");
        break;
    }
  });
});

function hideMenu() {
  sideNav.style.display = "none";
  modal.style.display = "none";
}
