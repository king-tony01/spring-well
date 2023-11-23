const sendBtn = document.getElementById("submit");
sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const form = new FormData(document.querySelector("form"));
  const files = form.get("imageInput");
  const user = {
    fullName: form.get("fullName"),
    id: form.get("idNumber"),
    email: form.get("email"),
    address: form.get("address"),
    password: form.get("password"),
    image: files.file[0],
  };
  const response = await fetch(`${location.origin}/newuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
});
