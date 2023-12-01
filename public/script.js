const sideNav = document.querySelector("nav");
const menuBtn = document.querySelector(".fa-bars");
const modal = document.querySelector(".modal");
const links = document.querySelectorAll(".link");
const sendMessage = document.getElementById("sendmessage");
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

sendMessage.addEventListener("click", async (e) => {
  e.preventDefault();
  const form = new FormData(document.getElementById("form"));
  const messageData = {
    fullName: form.get("fullname"),
    email: form.get("email"),
    message: form.get("message"),
  };

  const res = await fetch(`${location.origin}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  const resData = await res.json();
  alert(resData.message);
});
