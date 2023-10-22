const now = new Date();
const users = [
  {
    userName: "Mark Twain",
    email: "mark22@gmail.com",
    password: "markTWAIN222",
    balance: 2000000,
    transactions: [
      {
        amount: 50,
        date: `22/9/2023`,
        desc: "Food order",
        transId: `Transaction ID: 3395958938990`,
      },
      {
        amount: 200,
        date: `4/9/2023`,
        desc: "Chair repair",
        transId: `Transaction ID: 1697979469496`,
      },
      {
        amount: 70,
        date: `3/9/2023`,
        desc: "Donation",
        transId: `Transaction ID: 3395958938994`,
      },
      {
        amount: 200,
        date: `28/8/2023`,
        desc: "Clair's Birthday party",
        transId: `Transaction ID: 5093938408494`,
      },
      {
        amount: 150,
        date: `22/8/2023`,
        desc: "Party",
        transId: `Transaction ID: 509378708494`,
      },
      {
        amount: 40,
        date: `20/8/2023`,
        desc: "Food",
        transId: `Transaction ID: 509777118494`,
      },
    ],
  },
];

module.exports = {
  users,
};
