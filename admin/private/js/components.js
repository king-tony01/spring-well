import { closeCardMenu, openCardMenu, activateForm } from "./helpers.js";

export function overview(items, data) {
  const { users, trans, revenue } = items;
  if (items) {
    document.querySelector(".page").innerHTML = `<section>
            <h1>Overview</h1>
            <div class="main-overview-wrap">
              <div class="main-overview-card">
                <i class="fas fa-users"></i>
                <div>
                  <h2>${users.length}</h2>
                  <p>Total Users</p>
                </div>
              </div>
              <div class="main-overview-card">
                <i class="fas fa-money-bill-alt"></i>
                <div>
                  <h2>${revenue.toLocaleString("US")}</h2>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>
            <div class="trans-history">
              <div class="trans-history-head">
                <b>History</b>
                <button id="see-all">See All</button>
              </div>
              <ul class="trans-history-list">
             ${trans
               .map((transaction) => {
                 return `<li>
                  <div class="trans-icon-part">
                    <i class="fas fa-dollar"></i>
                    <div>
                      <b>${transaction.trans_description}</b
                      ><small>${transaction.created_at}</small>
                    </div>
                  </div>
                  <div>
                    <b>${
                      transaction.transaction_type == "Deposit" ? "+" : "-"
                    } $${transaction.amount}</b>
                    <small class="status success">${
                      transaction.trans_status ? transaction.trans_status : ""
                    }</small>
                  </div>
                </li>`;
               })
               .join(" ")}
              </ul>
            </div>
          </section>`;
    document.getElementById("see-all").addEventListener("click", () => {
      portfolioView(data);
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => tab.classList.remove("active"));
      document.getElementById("portfolio").classList.add("active");
    });
  } else {
    document.querySelector(".page").innerHTML = `<section>
            <h1>Overview</h1>
            <div class="main-overview-wrap">
              <div class="main-overview-card">
                <i class="fas fa-users"></i>
                <div>
                  <h2>0</h2>
                  <p>Total Users</p>
                </div>
              </div>
              <div class="main-overview-card">
                <i class="fas fa-money-bill-alt"></i>
                <div>
                  <h2>0</h2>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>
            <div class="trans-history">
              <div class="trans-history-head">
                <b>History</b>
              </div>
              <ul class="trans-history-list">
                
              </ul>
            </div>
          </section>`;
  }
}

export function clientsView(clients) {
  if (clients.length > 0) {
    document.querySelector(".page").innerHTML = `<section>
            <h1>Clients</h1>
            <div class="clients-wrapper">
            ${clients
              .map((client) => {
                return `<div class="client-card" data-id="${client.id}">
                <img src="${client.profile_url}" alt="" />
                <div class="info">
                  <b>${client.full_name}</b>
                  <small>${client.email}</small>
                  <b><span>Acc No: ${client.account_no}</span></b>
                </div>
              </div>`;
              })
              .join(" ")}
            </div>
          </section>`;
    const cards = document.querySelectorAll(".client-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const clicked = card.getAttribute("data-id");
        const client = clients.find((client) => {
          return client.id == clicked;
        });
        clientPreview(client);
      });
    });
  } else {
    document.querySelector(".page").innerHTML = `<section>
            <h1>Clients</h1>
            <div class="clients-wrapper">
            
            </div>
          </section>`;
  }
}

export function portfolioView(data) {
  if (data) {
    const { specialAccounts, transactions } = data;
    document.querySelector(".page").innerHTML = ` <section>
            <h1>Portfolio</h1>
            <section class="account-cards">
              <div class="cards-wrapper">
                ${specialAccounts
                  .map((user) => {
                    return `<div class="atm">
                <div class="atm-menu ${user.id}">
                    <i class="fas fa-close closeMenu" id="${user.id}"></i>
                    <div class="inner" data-id="fund">
                      <i class="fas fa-wallet"></i> Fund
                    </div>
                    <div class="inner" data-id="delete">
                      <i class="fas fa-trash"></i> Remove
                    </div>
                    <div class="inner" data-id="edit">
                      <i class="fas fa-pen"></i> Edit
                    </div>
                  </div>
                  <div class="atm-head">
                    <b>${user.full_name}</b>
                    <i class="fas fa-ellipsis-vertical openMenu" id="${
                      user.id
                    }"></i>
                  </div>
                  <h2 class="balance">$ ${user.balance.toLocaleString(
                    "US"
                  )}</h2>
                  <p class="acc-no">${user.account_no}</p>
                </div>`;
                  })
                  .join(" ")}
              </div>
              <div class="action-buttons">
                <button id="add-new">Add New</button>
                <button id="fund-btn">Fund</button>
                <button id="withdraw">Withdraw</button>
              </div>
            </section>
            <div class="trans-history">
              <div class="trans-history-head">
                <b>History</b>
              </div>
              <ul class="trans-history-list">
              ${transactions
                .map((transaction) => {
                  return `<li>
                  <div class="trans-icon-part">
                    <i class="fas fa-dollar"></i>
                    <div>
                      <b>${transaction.trans_description}</b
                      ><small>${transaction.created_at}</small>
                    </div>
                  </div>
                  <div>
                    <b>${
                      transaction.transaction_type == "Deposit" ? "+" : "-"
                    } $${transaction.amount}</b>
                    <small class="status success">${
                      transaction.trans_status ? transaction.trans_status : ""
                    }</small>
                  </div>
                </li>`;
                })
                .join(" ")}
              </ul>
            </div>
          </section>`;
    document.querySelector(".action-buttons").addEventListener("click", (e) => {
      const button = e.target.id;
      switch (button) {
        case "add-new":
          activateForm("add");
          break;
        case "fund-btn":
          activateForm("fund");
          break;
        case "withdraw":
          activateForm("withdraw");
          break;
      }
    });
    openCardMenu(specialAccounts);
    closeCardMenu();
  } else {
    document.querySelector(".page").innerHTML = ` <section>
            <h1>Portfolio</h1>
            <section class="account-cards">
              <div class="cards-wrapper">
                <div class="atm">
                  <div class="atm-menu">
                    <i class="fas fa-close closeMenu" id=""></i>
                    <div class="inner" data-id="delete">
                      <i class="fas fa-trash"></i> Remove
                    </div>
                    <div class="inner" data-id="edit">
                      <i class="fas fa-pen"></i> Edit
                    </div>
                  </div>
                  <div class="atm-head">
                    <b>Major Dinero</b>
                    <i class="fas fa-ellipsis-vertical" id="openMenu"></i>
                  </div>
                  <h2 class="balance">$ 40,000</h2>
                  <p class="acc-no">2352845734</p>
                </div>
              </div>
              <div class="action-buttons">
                <button id="add-new">Add New</button>
                <button id="fund-btn">Fund</button>
                <button id="withdraw">Withdraw</button>
              </div>
            </section>
            <div class="trans-history">
              <div class="trans-history-head">
                <b>History</b>
              </div>
              <ul class="trans-history-list">
                <li>
                  <div class="trans-icon-part">
                    <i class="fas fa-dollar"></i>
                    <div>
                      <b>Credit to Major Dinero</b
                      ><small>Dec 7th, 2023 22:45</small>
                    </div>
                  </div>
                  <div>
                    <b>+ $400</b>
                    <small class="status success">Successful</small>
                  </div>
                </li>
              </ul>
            </div>
          </section>`;
    document.querySelector(".action-buttons").addEventListener("click", (e) => {
      const button = e.target.id;
      switch (button) {
        case "add-new":
          activateForm("add");
          break;
        case "fund-btn":
          activateForm("fund");
          break;
        case "withdraw":
          activateForm("withdraw");
          break;
      }
    });
    openCardMenu();
    closeCardMenu();
  }
}

export function clientPreview(data) {
  const modal = document.querySelector(".modal");
  modal.classList.add("active");
  modal.innerHTML = `<div class="client-preview">
            <i class="fas fa-close" id="close-client-preview"></i>
            <img src="${data.profile_url}" alt="" />
            <div>
              <p>${data.full_name}</p>
              <small>Email: ${data.email}</small>
              <small>ID: ${data.id_no}</small>
              <small>Card: ${data.card}</small>
              <small>Acc No: ${data.account_no}</small>
              <small>Balance: <b>$${data.balance}</small></b>
            </div>
          </div>`;
  document
    .getElementById("close-client-preview")
    .addEventListener("click", () => {
      modal.classList.remove("active");
    });
}
