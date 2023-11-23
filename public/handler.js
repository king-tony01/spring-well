document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.getElementById("dropContainer");
  const imageInput = document.getElementById("imageInput");

  // Event listeners for the drop container
  dropContainer.addEventListener("drop", handleDrop);
  dropContainer.addEventListener("dragover", handleDragOver);

  // Event listener for the image input
  imageInput.addEventListener("change", (e) => {
    handleFileSelect(e);
  });
});
const sendBtn = document.getElementById("submit");
let a;

function handleDragOver(event) {
  event.preventDefault();
  event.target.classList.add("dragover");
}

function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove("dragover");

  const files = event.dataTransfer.files;

  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFileSelect(event) {
  const files = event.target.files;

  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFile(file) {
  const dropContainer = document.getElementById("dropContainer");
  const imageInput = document.getElementById("imageInput");

  // Display the dropped or selected image
  const reader = new FileReader();
  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;

    // Append the image to the drop container
    dropContainer.innerHTML = "";
    dropContainer.appendChild(image);
  };

  reader.readAsDataURL(file);
  a = file;
  // Update the input element with the selected file
  //imageInput.files = [file];
  console.log(a);
}

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const form = new FormData(document.querySelector("form"));
  const response = await fetch(`${location.origin}/newuser`, {
    method: "POST",
    body: form,
  });
  const data = await response.json();
  if (data.stat) {
    console.log(data);
    location.assign(`${location.origin}/loginform`);
  } else {
    console.log(data);
    alert(data.message);
  }
});

document.querySelector(".click").addEventListener("click", () => {
  document.getElementById("imageInput").click();
});
document.getElementById("dropContainer").addEventListener("click", () => {
  document.getElementById("imageInput").click();
});

let reveal = document.querySelector(".fa-eye-slash");
let passwordInput = document.getElementById("password");
reveal.addEventListener("click", () => {
  reveal.classList.toggle("fa-eye");
  if (reveal.classList.contains("fa-eye")) {
    passwordInput.setAttribute("type", "text");
  } else {
    passwordInput.setAttribute("type", "password");
  }
});
