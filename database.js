const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { deliverMail } = require("./mailer.js");
const myDB = mysql2.createConnection({
  connectionLimit: 10,
  user: "avnadmin",
  host: "springwell-springwell.a.aivencloud.com",
  database: "defaultdb",
  password: "AVNS_0wvmRQPhe5z62VjacCW",
  port: 19655,
  ssl: {
    ca: fs.readFileSync("./ca.pem"), // Specify the path to your CA certificate
  },
  connectTimeout: 60000,
});

myDB.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err}`);
  } else {
    console.log("Connection Successful");
  }
});

async function createUser(details) {
  const {
    id,
    fullName,
    email,
    gov_id,
    address,
    password,
    id_no,
    card,
    profile_url,
  } = details;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let exist = `SELECT * FROM users WHERE full_name = ? OR id_no = ?`;
  let query = `INSERT INTO users(id, full_name, email, gov_id, user_password, id_no, card, address, profile_url) VALUES('${id}', '${fullName}', '${email}',  ${gov_id}, '${hashedPassword}', ${id_no}, '${card}', '${address}', '${profile_url}')`;
  return new Promise(async (reject, resolve) => {
    try {
      myDB.query(exist, [fullName, id_no], function (err, result, fields) {
        if (err) {
          console.log(err);
          reject({
            message: "Error occured while searching for user",
            stat: false,
          });
        }
        if (result.length > 0) {
          reject({
            message: "A user already exist with this ID or name",
            stat: false,
          });
        } else {
          try {
            myDB.query(query, function (err, result, fields) {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                myDB.query(
                  `SELECT * FROM users WHERE full_name='${fullName}'`,
                  async function (err, result, fields) {
                    if (err) {
                      reject(err);
                    } else {
                      await deliverMail(details);
                      resolve({
                        message: "Registration successful!",
                        stat: true,
                      });
                    }
                  }
                );
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function fetchUser(user, id) {
  try {
    if (!user && !id) return;
    if (user && id == null) {
      const query = `SELECT * FROM users WHERE id_no = '${user.id_no}';`;
      return new Promise((resolve, reject) => {
        myDB.query(query, async function (err, results, fields) {
          if (err) {
            reject(err);
          }
          if (results.length > 0) {
            const correctPassword = await bcrypt.compare(
              user.password,
              results[0].user_password
            );
            if (correctPassword) {
              resolve({
                data: results[0],
                stat: true,
              });
            } else {
              reject({
                message:
                  "Incorrect password, please calm down and remember your password before retrying again. Thank you.",
                stat: false,
              });
            }
          } else {
            reject({
              message: "No user found in our records",
              stat: false,
            });
          }
        });
      });
    } else if (id && user == null) {
      const query = `SELECT * FROM users WHERE id = '${id}';`;
      return new Promise((resolve, reject) => {
        myDB.query(query, async function (err, results, fields) {
          if (err) {
            reject(err);
          }
          if (results.length == 0) {
            reject({
              message: "No user found in our records",
              stat: false,
            });
          } else {
            resolve({
              data: {
                fullName: results[0].full_name,
                email: results[0].email,
                profile: results[0].profile_url,
                balance: results[0].balance,
                card: results[0].card,
              },
              stat: true,
            });
          }
        });
      });
    }
  } catch (err) {
    throw err;
  }
}

function deposit(payment) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO deposits(id, amount, plan, pay_option, date_created, payer, confirmed) VALUES("${payment.id}", ${payment.amount}, "${payment.plan}", "${payment.coin}", NOW(), "${payment.payer}", 0)`;
    myDB.query(query, function (err, results, fields) {
      if (err) {
        throw err;
      } else {
        resolve({
          message: "Payment is placed successfully",
          stat: true,
        });
      }
    });
  });
}

async function getAll() {
  const queries = [
    `SELECT * FROM users`,
    `SELECT * FROM deposits`,
    `SELECT * FROM activeInvestments`,
    `SELECT * FROM deposits WHERE confirmed = 0`,
  ];
  const queryPromises = queries.map((query) => {
    return new Promise((resolve, reject) => {
      myDB.query(query, function (err, results, fields) {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve(results);
        }
      });
    });
  });
  try {
    const result = await Promise.all(queryPromises);
    const data = {
      users: result[0],
      revenue: result[1],
      activeInvest: result[2],
      pendingPay: result[3],
    };
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

async function users() {
  return new Promise((resolve, reject) => {
    let usersQuery = `SELECT * FROM users`;
    myDB.query(usersQuery, function (err, results, fields) {
      if (err) {
        throw err;
      } else {
        resolve(results);
      }
    });
  });
}
async function getTransaction() {
  try {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM transactions`;
      myDB.query(query, function (err, results, fields) {
        if (err) throw err;
        resolve(results);
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}
async function wallets() {
  return new Promise((resolve, reject) => {
    let walletsQuery = `SELECT * FROM wallets`;
    myDB.query(walletsQuery, function (err, results, fields) {
      if (err) {
        throw err;
      } else {
        resolve(results);
        console.log(results);
      }
    });
  });
}

async function addWallet(data) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO wallets(id, wallet_name, address, date_created) VALUES("${data.id}", "${data.walletName}", "${data.address}", "${data.dateCreated}")`;
    myDB.query(query, function (err, results, fields) {
      if (err) {
        reject({
          stat: false,
          message: err,
        });
      } else {
        resolve({
          stat: true,
          message: "Address added successfully",
        });
      }
    });
  });
}

module.exports = {
  createUser,
  fetchUser,
  getTransaction,
};
