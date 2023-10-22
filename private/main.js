const page = document.querySelector(".page");
const navigation = document.querySelectorAll(".nav-con");
const finalSend = document.getElementById("finalSend");
const sendModal = document.querySelector(".send-modal");
const successModal = document.querySelector(".sucess-modal");
const closeModal = document.querySelector(".fa-close");
const inputs = document.querySelector(".inputs");
init();
//USER INITIATING
let mainUser = {};
async function init() {
  const response = await fetch(`${location.origin}/user`);
  const data = await response.json();
  mainUser = data;
  page.innerHTML = `<div class="wrapper">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Cards</h3>
                <button>Add New</button>
              </div>
              <div class="cards-con-main">
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ ${mainUser.balance.toLocaleString(
                    "US"
                  )}</b>
                  <b class="card-number"
                    ><span>1230</span><span>4670</span><span>6630</span></b
                  >
                  <span class="card-name">${mainUser.userName}</span>
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
              ${mainUser.transactions.map((trans) => {
                return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
              })}
                
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
            <ul class="history">
              <li>
   ${mainUser.transactions.map((trans) => {
     return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
   })}
            </ul>
          </div>
        </div>`;
  chart();
}
navigation.forEach((con) => {
  con.addEventListener("click", (e) => {
    const tab = e.target.getAttribute("data-id");
    switch (tab) {
      case "dashboard":
        page.innerHTML = `<div class="wrapper">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Cards</h3>
                <button>Add New</button>
              </div>
              <div class="cards-con-main">
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ ${mainUser.balance.toLocaleString(
                    "US"
                  )}</b>
                  <b class="card-number"
                    ><span>1230</span><span>4670</span><span>6630</span></b
                  >
                  <span class="card-name">${mainUser.userName}</span>
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
              ${mainUser.transactions.map((trans) => {
                return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
              })}
                
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
              <li>
   ${mainUser.transactions.map((trans) => {
     return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
   })}
            </ul>
          </div>
        </div>`;
        chart();
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
${mainUser.transactions.map((trans) => {
  return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
})}
          </ul>
        </div>`;
        chart();
        break;
      case "wallet":
        page.innerHTML = `        <div style="padding-right: 20px" class="wallet">
          <div>
            <div class="cards-container">
              <div class="cards-head">
                <h3>My Cards</h3>
                <button>Add New</button>
              </div>
              <div class="cards-con-main">
                
                <div class="atm">
                  <img src="/images/master.png" alt="" />
                  <b class="balance">$ <span id="balance">${mainUser.balance.toLocaleString(
                    "US"
                  )}</span></b>
                  <b class="card-number"
                    ><span>1230</span><span>4670</span><span>6630</span></b
                  >
                  <span class="card-name">${mainUser.userName}</span>
                </div>
              </div>
            </div>
            <div class="wallet-action">
              <button id="sendmoney">
                <i class="fas fa-arrow-up" ></i> Send</button
              ><button id="recievemoney">
                <i class="fas fa-arrow-down"></i> Request
              </button>
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
 ${mainUser.transactions.map((trans) => {
   return `<li>
                  <div>
                    <i class="fas fa-wallet"></i><span>${trans.desc}</span>
                  </div>
                  <span class="date">${trans.date}</span> <span>$${trans.amount}</span
                  ><i class="fas fa-ellipsis-vertical"></i>
                </li>`;
 })}
            </ul>
          </div>
        </div>`;
        const sendBtn = document.getElementById("sendmoney");
        sendBtn.addEventListener("click", () => {
          document.querySelector(".send-modal").classList.add("active");
        });
        break;
      default:
        break;
    }
  });
});
const now = new Date();

finalSend.addEventListener("click", async () => {
  let transactionList = document.querySelector(".transactions-list");
  const balance = document.getElementById("balance");
  const transaction = {
    amount: `Amount: ${document.getElementById("amount").value}`,
    transId: `Transaction ID: ${Date.now() * (Math.random() * 10)}`,
    transDate: `Date: ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
  };
  sendModal.classList.remove("active");
  successModal.classList.add("active");
  document.querySelector(".trans-amount").textContent = transaction.amount;
  document.querySelector(".trans-id").textContent = transaction.transId;
  document.querySelector(".trans-date").textContent = transaction.transDate;

  const response = await fetch(`${location.origin}/newtransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: `${document.getElementById("amount").value}`,
      date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      desc: `${document.getElementById("desc").value}`,
      transId: `Transaction ID: ${Date.now() * Math.floor(Math.random() * 10)}`,
    }),
  });
  const data = await response.json();
  if (data.stat) {
    let timer = setTimeout(() => {
      successModal.classList.remove("active");
      clearTimeout(timer);
    }, 3000);
    await init();
  }
});

let amountCon = document.getElementById("amount");
inputs.addEventListener("click", (e) => {
  if (e.target.textContent !== "") {
    amountCon.value += e.target.textContent;
  } else if (e.target.classList.contains("fa-delete-left")) {
    amountCon.value = amountCon.value.slice(0, -1);
  }
});

closeModal.addEventListener("click", () => {
  sendModal.classList.remove("active");
});

function chart() {
  let months = [];
  const currentDate = new Date();
  for (let i = 0; i <= currentDate.getMonth(); i++) {
    const date = new Date(0, i); // The second argument is the month (0-11)
    const monthName = date.toLocaleString("en-US", { month: "long" });
    months.push(monthName);
  }

  // Get the canvas element
  var ctx = document.getElementById("myChart").getContext("2d");

  // Define your data
  var data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: mainUser.transactions.map((trans) => {
          return trans.amount;
        }),
        borderColor: "rgb(218, 192, 163)", // Line color
        borderWidth: 2, // Line width
        fill: false, // Don't fill the area under the line
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
