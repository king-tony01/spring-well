const page = document.querySelector(".page");
const navigation = document.querySelectorAll(".nav-con");
const finalSend = document.getElementById("finalSend");
const sendModal = document.querySelector(".send-modal");
const successModal = document.querySelector(".sucess-modal");
const closeModal = document.querySelector(".fa-close");
const inputs = document.querySelector(".inputs");
const transactions = await getTransactions();
let mainUser = {};
await init();
//USER INITIATING
async function init() {
  const response = await fetch(`${location.origin}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: location.search.slice(3) }),
  });
  const data = await response.json();
  const user = data.data;
  mainUser = user;
  document.getElementById("userpic").src = user.profile;
  document.querySelector(".greet").textContent = `Hello, ${user.fullName} 👋`;
  page.innerHTML = `<div class="wrapper">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Card</h3>
              </div>
              <div class="cards-con-main">
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ ${mainUser.balance.toLocaleString(
                    "US"
                  )}</b>
                  <b class="card-number"
                    >${mainUser.card}</b
                  >
                  <span class="card-name">${mainUser.fullName}</span>
                </div>
              </div>
            </div>
            <div class="transactions">
              <div class="transactions-head">
                <h3>Transactions</h3>
                <select>
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                </select>
              </div>
              <ul class="transactions-list">
              ${
                transactions.length > 0
                  ? transactions.map((transaction) => {
                      return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                    })
                  : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
              }
              </ul>
            </div>
          </div>
          <div>
            <div class="chart-head">
              <div>
                <button id="expenses">Expenses</button>
                <button id="income">Income</button>
              </div>
              <div>
                <span>D</span><span>M</span><span>W</span
                ><span class="active">All</span>
              </div>
            </div>
            <canvas id="myChart" ></canvas>
            <h2>History</h2>
            <ul class="history">             ${
              transactions.length > 0
                ? transactions.map((transaction) => {
                    return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                  })
                : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
            }
            </ul>
          </div>
        </div>`;
  await chart();
}
navigation.forEach((con) => {
  con.addEventListener("click", async (e) => {
    const tab = e.target.getAttribute("data-id");
    switch (tab) {
      case "dashboard":
        page.innerHTML = `<div class="wrapper">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Card</h3>
              </div>
              <div class="cards-con-main">
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ ${mainUser.balance.toLocaleString(
                    "US"
                  )}</b>
                  <b class="card-number"
                    >${mainUser.card}</b
                  >
                  <span class="card-name">${mainUser.fullName}</span>
                </div>
              </div>
            </div>
            <div class="transactions">
              <div class="transactions-head">
                <h3>Transactions</h3>
                <select>
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                </select>
              </div>
              <ul class="transactions-list">
                         ${
                           transactions.length > 0
                             ? transactions.map((transaction) => {
                                 return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                               })
                             : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
                         }
              </ul>
            </div>
          </div>
          <div>
            <div class="chart-head">
              <div>
                <button id="expenses">Expenses</button>
                <button id="income">Income</button>
              </div>
              <div>
                <span>D</span><span>M</span><span>W</span
                ><span class="active">All</span>
              </div>
            </div>
            <canvas id="myChart"></canvas>
            <h2>History</h2>
            <ul class="history">
                         ${
                           transactions.length > 0
                             ? transactions.map((transaction) => {
                                 return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                               })
                             : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
                         }
            </ul>
          </div>
        </div>`;
        await chart();
        break;
      case "statistics":
        page.innerHTML = `<div>
          <div class="chart-head">
            <div>
              <button id="expenses">Expenses</button>
              <button id="income">Income</button>
            </div>
            <div>
              <span>D</span><span>M</span><span>W</span
              ><span class="active">All</span>
            </div>
          </div>
          <canvas id="myChart" ></canvas>
          <h2>History</h2>
          <ul class="history">
             ${
               transactions.length > 0
                 ? transactions.map((transaction) => {
                     return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                   })
                 : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
             }
               </ul>
        </div>`;
        await chart();
        break;
      case "wallet":
        page.innerHTML = `        <div style="padding-right: 20px" class="wallet">
          <div>
            <div class="cards-container">
              <div class="cards-head">
              </div>
              <div class="cards-con-main">
                <h3>My Card</h3>
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ <span id="balance">${mainUser.balance.toLocaleString(
                    "US"
                  )}</span></b>
                  <b class="card-number"
                    >${mainUser.card}</b
                  >
                  <span class="card-name">${mainUser.fullName}</span>
                </div>
              </div>
            </div>
            <div class="wallet-action">
              <button id="sendmoney">
                <i class="fas fa-arrow-up" ></i> Send</button
              >
            </div>
          </div>

          <div class="transactions">
            <div class="transactions-head">
              <h3>Transactions</h3>
              <select>
                <option value="Month">Month</option>
                <option value="Week">Week</option>
              </select>
            </div>
            <ul class="transactions-list" style="max-height: 100%;">
              ${
                transactions.length > 0
                  ? transactions.map((transaction) => {
                      return `<li>
                <div>
                    <i class="fas fa-wallet"></i><span>${transaction.trans_description}</span>
                  </div>
                  <span class="date">${transaction.created_at}</span> <span>$${transaction.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>
                `;
                    })
                  : `<div>
                    <i class="fas fa-history"></i><span> No transactions yet</span>
                  </div>`
              }
            </ul>
          </div>
        </div>`;
        const sendBtn = document.getElementById("sendmoney");
        sendBtn.addEventListener("click", () => {
          document.querySelector(".send-modal").classList.add("active");
        });
        break;
      case "profile":
        page.innerHTML = `        <section class="profile-view">
          <div class="profile-view-head">
            <img src="${mainUser.profile}" alt="" />
            <div>
              <h2>${mainUser.fullName}</h2>
              <p>${mainUser.email}</p>
            </div>
          </div>
          <div class="profile-body">
            <p>ID: ${mainUser.id_no}</p>
            <p>Card: ${mainUser.card}</p>
            <p>Acc No: ${mainUser.account_no}</p>
            <p>Address: ${mainUser.address}</p>
          </div>
        </section>`;
        break;
      default:
        break;
    }
  });
});
const now = new Date();

finalSend.addEventListener("click", async () => {
  if (
    document.getElementById("amount").value == "" ||
    document.getElementById("accountnumber").value == "" ||
    document.getElementById("desc").value == ""
  ) {
    alert("Please provide a valid account number, amount, and description");
    finalSend.textContent = "Send";
    return;
  }

  sendModal.classList.remove("active");
  successModal.classList.add("active");

  /*const response = await fetch(`${location.origin}/newtransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  if (data.stat) {
    sendModal.classList.remove("active");
    successModal.classList.add("active");
    finalSend.textContent = "Send";
  } else {
    alertDisplay(data.message, false);
    finalSend.textContent = "Send";
  }*/
});

const otpBtn = document.getElementById("send-otp");
otpBtn.addEventListener("click", async () => {
  otpBtn.textContent = "Processing...";
  const otpValue = document.getElementById("otp");
  const response = await fetch(`${location.origin}/check-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(+otpValue.value),
  });

  const resData = await response.json();
  if (resData.stat) {
    const transaction = {
      amount: parseFloat(document.getElementById("amount").value),
      desc: document.getElementById("desc").value,
      type: "Transfer",
      sender: location.search.slice(3),
      owner: +document.getElementById("accountnumber").value,
      accountName: document.getElementById("accountName").value,
      bankName: document.getElementById("bankName").value,
      stat: "Pending",
    };
    const response = await fetch(`${location.origin}/newtransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const data = await response.json();
    if (data.stat) {
      alertDisplay(data.message, true);
      sendModal.classList.remove("active");
      successModal.classList.remove("active");
      finalSend.textContent = "Send";
    } else {
      alertDisplay(data.message, false);
      finalSend.textContent = "Send";
    }
    otpBtn.textContent = "Proceed";
  } else {
    alertDisplay(resData.message, false);
    otpBtn.textContent = "Proceed";
  }
});

const closeSuc = document.getElementById("close-modal");
closeSuc.addEventListener("click", () => {
  successModal.classList.remove("active");
});

let amountCon = document.getElementById("amount");

closeModal.addEventListener("click", () => {
  sendModal.classList.remove("active");
});

async function chart() {
  let months = [];
  const currentDate = new Date();
  for (let i = 0; i <= currentDate.getMonth(); i++) {
    const date = new Date(0, i); // The second argument is the month (0-11)
    const monthName = date.toLocaleString("en-US", { month: "short" });
    months.push(monthName);
  }

  // Get the canvas element
  var ctx = document.getElementById("myChart").getContext("2d");

  // Define your data
  const transactions = await getTransactions();
  var data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: transactions.map((trans) => {
          return trans.amount;
        }),
        borderColor: "rgb(218, 192, 163)", // Line color
        borderWidth: 2, // Line width
        fill: true, // Don't fill the area under the line
        tension: 0.4,
      },
    ],
  };

  // Create the chart
  var myChart = new Chart(ctx, {
    type: "line", // Line chart
    data: data,
    options: {
      scales: {
        x: {
          grid: {
            display: false, // Remove x-axis gridlines
          },
        },
        y: {
          grid: {
            display: false, // Remove y-axis gridlines
          },
          beginAtZero: true,
        },
      },
    },
  });
}

async function getTransactions() {
  const response = await fetch(`${location.origin}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: location.search.slice(3) }),
  });

  const data = await response.json();
  return data;
}

function alertDisplay(message, type) {
  if (type) {
    const alertWindow = document.querySelector(".alert");
    alertWindow.classList.add("active");
    alertWindow.classList.add("success");
    alertWindow.innerHTML = `<i class="fas fa-exclamation-circle"></i>
                  <p>${message}</p>`;
    setTimeout(() => {
      alertWindow.classList.remove("active");
    }, 5000);
  } else {
    const alertWindow = document.querySelector(".alert");
    alertWindow.classList.add("active");
    alertWindow.classList.add("error");
    alertWindow.innerHTML = `<i class="fas fa-exclamation-triangle"></i>
                  <p>${message}</p>`;
    setTimeout(() => {
      alertWindow.classList.remove("active");
    }, 5000);
  }
}
