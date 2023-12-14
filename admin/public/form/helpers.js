export function togglePasswordVisibiblity() {
  const toggleBtn = document.querySelector(".fa-eye-slash");
  const passwordInput = document.getElementById("password");
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("fa-eye");
    if (toggleBtn.classList.contains("fa-eye")) {
      passwordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
    }
  });
}

export async function sendJSON(data, path) {
  const response = await fetch(`${location.origin}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
}

export function generateID() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i <= 50; i++) {
    const index = Math.floor(Math.random() * chars.length);
    id += chars.charAt(index);
  }
  return id;
}
