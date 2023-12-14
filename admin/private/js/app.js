import { clientsView, overview, portfolioView } from "./components.js";
import { confirmAction, getJSON } from "./helpers.js";
document.addEventListener("DOMContentLoaded", async () => {
  const adminId = `${location.search.slice(4)}`;
  const admin = await getJSON({ id: adminId }, "/admin/detail");
  const username = document.querySelectorAll(".admin-name");
  const email = document.querySelector(".admin-email");
  email.textContent = admin[0].email;
  username.forEach((username) => {
    username.textContent = admin[0].full_name;
  });
  let data = await getJSON(null, "/users");
  const { users, transactions } = data;
  const money = transactions.map((transaction) => {
    return +transaction.amount;
  });
  const overviewData = {
    trans: transactions,
    users: users,
    revenue: money.reduce((total, current) => total + current, 0),
  };
  console.log(money);
  const specials = await getJSON(null, "/all-special");
  const portData = {
    specialAccounts: specials,
    transactions: transactions,
  };
  overview(overviewData, portData);
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tab.classList.add("active");
      const clicked = tab.getAttribute("data-tab");
      switch (clicked) {
        case "overview":
          data = await newData();
          overview(overviewData, portData);
          break;
        case "clients":
          clientsView(users);
          break;
        case "portfolio":
          portfolioView(portData);
          break;
        case "logout":
          confirmAction();
          break;
      }
    });
  });
});

async function newData() {
  const newData = await getJSON(null, "/users");
  return newData;
}
