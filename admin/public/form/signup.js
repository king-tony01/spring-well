import { generateID, sendJSON, togglePasswordVisibiblity } from "./helpers.js";
import { login } from "./login.js";

export function signup() {
  document.querySelector("title").textContent =
    "Springwell Trust Admin | Signup";
  document.querySelector("main").innerHTML = `<form action="">
        <section class="head">
          <div>
            <h1>SPRINGWELL TRUST</h1>
            <h1>ADMIN</h1>
          </div>
          <button id="login">Login</button>
        </section>
        <section class="center">
          <h2>Sign Up</h2>
          <div class="input">
            <i class="fas fa-user-tie"></i>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full name"
            />
          </div>
          <div class="input">
            <i class="fas fa-envelope"></i>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div class="input">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <i class="fas fa-eye-slash"></i>
          </div>
        </section>
        <button id="submit-btn">Sign Up</button>
      </form>`;
  togglePasswordVisibiblity();
  document.getElementById("login").addEventListener("click", (e) => {
    console.log(e);
    e.preventDefault();
    login();
  });
  document.getElementById("submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    document.getElementById("submit-btn").textContent = "Signing up...";
    const form = new FormData(document.querySelector("form"));
    const user = {
      id: generateID(),
      fullName: form.get("fullName"),
      email: form.get("email"),
      password: form.get("password"),
    };
    const response = await sendJSON(user, "/new-admin");
    if (response.stat) {
      const alertWindow = document.querySelector(".alert");
      alertWindow.classList.add("active");
      alertWindow.classList.add("success");
      alertWindow.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <p>${response.message}</p>`;
      document.getElementById("submit-btn").textContent = "Sign Up";
      setTimeout(() => {
        alertWindow.classList.remove("active");
        location.assign(`/admin/home?id=${user.id}`);
      }, 2000);
    } else {
      const alertWindow = document.querySelector(".alert");
      alertWindow.classList.add("active");
      alertWindow.classList.add("error");
      alertWindow.innerHTML = `<i class="fas fa-exclamation-triangle"></i>
        <p>${response.message}</p>`;
      setTimeout(() => {
        alertWindow.classList.remove("active");
      }, 2000);
    }
  });
}
