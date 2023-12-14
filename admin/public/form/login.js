import { togglePasswordVisibiblity, sendJSON } from "./helpers.js";
import { signup } from "./signup.js";

export function login() {
  document.querySelector("title").textContent =
    "Springwell Trust Admin | Login";
  document.querySelector("main").innerHTML = `<form action="">
        <section class="head">
          <div>
            <h1>SPRINGWELL TRUST</h1>
            <h1>ADMIN</h1>
          </div>
          <button id="signup">Sign up</button>
        </section>
        <section class="center">
          <h2>Login</h2>
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
        <button id="submit-btn">Login</button>
      </form>`;
  togglePasswordVisibiblity();
  document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();
    signup();
  });
  document.getElementById("submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    document.getElementById("submit-btn").textContent = "Authorizing...";
    const form = new FormData(document.querySelector("form"));
    const user = {
      email: form.get("email"),
      password: form.get("password"),
    };
    const response = await sendJSON(user, "/admin/auth");
    if (response.stat) {
      const alertWindow = document.querySelector(".alert");
      alertWindow.classList.add("active");
      alertWindow.classList.add("success");
      alertWindow.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <p>${response.message}</p>`;
      document.getElementById("submit-btn").textContent = "Login";
      setTimeout(() => {
        alertWindow.classList.remove("active");
        location.assign(`/admin/home?id=${response.id}`);
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
