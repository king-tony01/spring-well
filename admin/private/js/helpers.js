export function editCard(data) {
  document.querySelector(".modal").innerHTML = `<form action="" id="fund-form">
            <div class="form-head">
              <h3>Add Account</h3>
              <i class="fas fa-close" id="close"></i>
            </div>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Name"
              value="${data.fullName}"
            />
      <input type="email" name="email" id="email" value="${data.email}" placeholder="Email" />
      <input
            type="text"
            name="address"
            id="address"
            placeholder="Residential Address"
            value="${data.address}"
          />
            <button id="fund-btn">Edit</button>
          </form>`;
}

export function openCardMenu(info) {
  const openBtn = document.querySelectorAll(".openMenu");
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(`.cl-${btn.id}`).classList.add("active");
      document.querySelectorAll(".inner").forEach((button) => {
        button.addEventListener("click", () => {
          const clicked = button.getAttribute("data-id");
          const modal = document.querySelector(".modal");
          modal.classList.add("active");
          switch (clicked) {
            case "fund":
              document.querySelector(".atm-menu").classList.remove("active");
              modal.innerHTML = `<form action="" id="fund-form">
            <div class="form-head">
              <h3>Fund special account</h3>
              <i class="fas fa-close" id="close"></i>
            </div>
            <input
              type="number"
              name="owner"
              id="amount"
              placeholder="Amount"
              min="0"
              value="${
                info.find((user) => {
                  return user.id == btn.id;
                }).account_no
              }"
            />
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              min="0"
            />
            <button id="fund-btn">Fund</button>
          </form>`;
              document
                .getElementById("fund-form")
                .addEventListener("submit", async (e) => {
                  e.preventDefault();
                  document.getElementById("fund-btn").textContent =
                    "In progress..";
                  const form = new FormData(document.querySelector("form"));
                  const transaction = {
                    owner: info.find((user) => {
                      return user.id == btn.id;
                    }).account_no,
                    amount: form.get("amount"),
                    type: "Deposit",
                    stat: "Completed",
                  };
                  const response = await getJSON(
                    transaction,
                    "/new-transaction"
                  );
                  if (response.stat) {
                    document.getElementById("fund-btn").textContent = "Fund";
                    closeForm();
                    alertDisplay(response.message, true);
                  } else {
                    closeForm();
                    document.getElementById("fund-btn").textContent = "Fund";
                    alertDisplay(response.message, false);
                  }
                });
              document.getElementById("close").addEventListener("click", () => {
                closeForm();
              });
              break;
          }
        });
      });
    });
  });
}
export function closeCardMenu() {
  document.querySelectorAll(".closeMenu").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(`.cl-${btn.id}`).classList.remove("active");
    });
  });
}

export function activateForm(type) {
  if (type == "fund") {
    const modal = document.querySelector(".modal");
    modal.classList.add("active");
    modal.innerHTML = `<form action="" id="fund-form">
            <div class="form-head">
              <h3>Fund</h3>
              <i class="fas fa-close" id="close"></i>
            </div>
            <div class="acc-no-wrap">
              <input
                type="number"
                placeholder="Receiver account number"
                id="receiver"
                name="receiver"
                min="0"
              />
              <i class="fas fa-user"></i>
            </div>
            <input
              type="number"
              name="sender"
              id="sender"
              placeholder="Sender account number"
              min="0"
            />
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              min="0"
            />
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Description"
            />
            <button id="fund-btn">Fund</button>
          </form>`;
    document
      .getElementById("fund-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        document.getElementById("fund-btn").textContent = "In progress...";
        const form = new FormData(document.querySelector("form"));
        for (const [key, value] of form) {
          if (value == "") {
            alert("Please provide all details");
            return;
          }
        }
        const transaction = {
          sender: form.get("sender"),
          amount: form.get("amount"),
          desc: form.get("desc"),
          receiver: form.get("receiver"),
          type: "Transfer",
          stat: "Completed",
        };
        const response = await getJSON(transaction, "/new-transaction");
        if (response.stat) {
          closeForm();
          alertDisplay(response.message, true);
          document.getElementById("fund-btn").textContent = "Fund";
        } else {
          closeForm();
          document.getElementById("fund-btn").textContent = "Fund";
          alertDisplay(response.message, false);
        }
      });
    document.getElementById("close").addEventListener("click", () => {
      closeForm();
    });
  } else if (type == "withdraw") {
    const modal = document.querySelector(".modal");
    modal.classList.add("active");
    modal.innerHTML = `<form action="" id="withdraw-form">
            <div class="form-head">
              <h3>Withdraw</h3>
              <i class="fas fa-close" id="close"></i>
            </div>
            <div class="acc-no-wrap">
              <input
                type="number"
                placeholder="Account number"
                id="onwer"
                name="owner"
                min="0"
              />
              <i class="fas fa-user"></i>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              min="0"
            />
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Description"
            />
            <button id="withdraw-btn">Withdraw</button>
          </form>`;
    document
      .getElementById("withdraw-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(document.querySelector("form"));
        const transaction = {
          owner: form.get("owner"),
          amount: form.get("amount"),
          desc: form.get("desc"),
          type: "Withdrawal",
          stat: "Completed",
        };
        const response = await getJSON(transaction, "/new-transaction");
        if (response.stat) {
          alertDisplay(response.message, true);
          document.getElementById("fund-btn").textContent = "Fund";
          closeForm();
        } else {
          document.getElementById("fund-btn").textContent = "Fund";
          closeForm();
          alertDisplay(response.message, false);
        }
      });
    document.getElementById("close").addEventListener("click", () => {
      closeForm();
    });
    document.getElementById("close").addEventListener("click", () => {
      closeForm();
    });
  } else if (type == "add") {
    const modal = document.querySelector(".modal");
    modal.classList.add("active");
    modal.innerHTML = `<form action="" id="add-form" enctype="multipart/form-data">
            <div class="form-head">
              <h3>Add Account</h3>
              <i class="fas fa-close" id="close"></i>
            </div>
            <input
              type="text"
              name="accountName"
              id="accountName"
              placeholder="Name"
            />
            <input type="file" name="imageInput" id="imageInput" />
      <div class="image-field" id="dropContainer">
        <i class="fas fa-image"></i>
        <small>
          Drag and drop your image ID here or
          <span class="click">click to upload</span>
        </small>
      </div>
      <input type="email" name="email" id="email" placeholder="Email" />
      <input
            type="text"
            name="address"
            id="address"
            placeholder="Residential Address"
          />
      <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
            <button id="add-btn">Add account</button>
          </form>`;
    document.getElementById("add-btn").addEventListener("click", async (e) => {
      e.preventDefault();
      document.getElementById("add-btn").textContent = "Adding...";
      const form = new FormData(document.getElementById("add-form"));
      console.log(form.get("imageInput"));
      for (const [key, value] of form) {
        if (value == "" || form.get("imageInput").name == "") {
          alertDisplay("Please fill all details", false);
          return;
        }
      }
      const response = await fetch(`${location.origin}/new-special`, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (data.stat) {
        document.getElementById("add-btn").textContent = "Add Account";
        closeForm();
        alertDisplay(data.message, true);
      } else {
        document.getElementById("add-btn").textContent = "Add Account";
        closeForm();
        alertDisplay(data.message, false);
      }
    });
    const dropContainer = document.getElementById("dropContainer");
    const imageInput = document.getElementById("imageInput");

    // Event listeners for the drop container
    dropContainer.addEventListener("drop", handleDrop);
    dropContainer.addEventListener("dragover", handleDragOver);

    // Event listener for the image input
    imageInput.addEventListener("change", (e) => {
      handleFileSelect(e);
    });
    function handleDragOver(event) {
      event.preventDefault();
    }

    function handleDrop(event) {
      event.preventDefault();
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
    }
    document.getElementById("dropContainer").addEventListener("click", () => {
      document.getElementById("imageInput").click();
    });
    document.getElementById("close").addEventListener("click", () => {
      closeForm();
    });
  }
}

function closeForm() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("active");
  const inputs = modal.querySelector("form").elements;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

export function confirmAction() {
  const modal = document.querySelector(".modal");
  modal.classList.add("active");
  modal.innerHTML = `<div class="confirm">
            <p>Are you sure you want to continue this operation?</p>
            <div class="confirm-wrapper">
              <button id="close" class="no act" data-id="no">No</button>
              <button id="yes" class="act" data-id="yes">Yes</button>
            </div>
          </div>`;
  document.querySelectorAll(".act").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("data-id") == "yes") {
        location.replace(`${location.origin}/admin`);
      } else {
        closeForm();
      }
    });
  });
}

export async function getJSON(data, path) {
  if (data && path) {
    const response = await fetch(`${location.origin}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  } else if (data == null && path) {
    const response = await fetch(`${location.origin}${path}`);
    const resData = await response.json();
    return resData;
  }
}

export function alertDisplay(message, type) {
  if (type) {
    const alertWindow = document.querySelector(".alert");
    alertWindow.classList.add("active");
    alertWindow.classList.add("success");
    alertWindow.innerHTML = `<i class="fas fa-exclamation-circle"></i>
                  <p>${message}</p>`;
    closeForm();
    setTimeout(() => {
      alertWindow.classList.remove("active");
    }, 5000);
  } else {
    const alertWindow = document.querySelector(".alert");
    alertWindow.classList.add("active");
    alertWindow.classList.add("error");
    alertWindow.innerHTML = `<i class="fas fa-exclamation-triangle"></i>
                  <p>${message}</p>`;
    closeForm();
    setTimeout(() => {
      alertWindow.classList.remove("active");
    }, 5000);
  }
}
