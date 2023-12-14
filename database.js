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

/*const myDB = mysql2.createConnection({
  connectionLimit: 10,
  user: "root",
  host: "localhost",
  database: "trustwell",
  password: "password",
});*/

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
    account_no,
    profile_url,
  } = details;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let exist = `SELECT * FROM users WHERE full_name = ? OR id_no = ?`;
  let query = `INSERT INTO users(id, full_name, email, gov_id, user_password, id_no, card, account_no, address, profile_url) VALUES('${id}', '${fullName}', '${email}',  ${gov_id}, '${hashedPassword}', ${id_no}, '${card}', ${account_no}, '${address}', '${profile_url}')`;
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
async function createSpecial(details) {
  const {
    id,
    fullName,
    email,
    address,
    password,
    card,
    id_no,
    account_no,
    profile_url,
  } = details;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let exist = `SELECT * FROM special_accounts WHERE full_name = ? OR id_no = ?`;
  let query = `INSERT INTO special_accounts(id, full_name, email, user_password, id_no, card, account_no, address, profile_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return new Promise(async (reject, resolve) => {
    try {
      myDB.query(exist, [fullName, id_no], function (err, result, fields) {
        if (err) {
          reject({
            message: "Error occured while searching for user",
            stat: false,
          });
        }
        console.log(result);
        if (result.length > 0) {
          reject({
            message: "A user already exist with this ID or name",
            stat: false,
          });
        } else {
          try {
            myDB.query(
              query,
              [
                id,
                fullName,
                email,
                hashedPassword,
                card,
                id_no,
                account_no,
                address,
                profile_url,
              ],
              function (err, result, fields) {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve({
                    message: "Registration successful!",
                    stat: true,
                  });
                }
              }
            );
          } catch (err) {
            throw err;
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
    let query = `INSERT INTO transactions (
    transaction_id,
    sender_id,
    receiver_id,
    transaction_type,
    amount,
    trans_description,
    reference_id,
    trans_status,
    created_at,
    updated_at
) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    myDB.query(
      query,
      [
        payment.id,
        payment.sender,
        payment.receiver,
        payment.type,
        payment.amount,
        payment.desc,
        null,
        payment.stat,
        NOW(),
        NOW(),
      ],
      function (err, results, fields) {
        if (err) {
          throw err;
        } else {
          resolve({
            message: "Payment is placed successfully",
            stat: true,
          });
        }
      }
    );
  });
}
function depositSpecial(payment) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO special_transactions (
    sender_id,
    receiver_id,
    transaction_type,
    amount,
    trans_description,
    trans_status,
    created_at,
    updated_at
) VALUES( ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    myDB.query(
      query,
      [
        payment.sender,
        payment.receiver,
        payment.type,
        payment.amount,
        payment.desc,
        payment.stat,
      ],
      function (err, results, fields) {
        if (err) {
          reject({
            stat: false,
            message: "Oh sorry!\nPayment could not be completed",
            error: err,
          });
        } else {
          resolve({
            message: "Payment is placed successfully",
            stat: true,
          });
        }
      }
    );
  });
}
function depositUser(payment) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO transactions (
    sender_id,
    receiver_id,
    transaction_type,
    amount,
    trans_description,
    trans_status,
    created_at,
    updated_at
) VALUES( ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    myDB.query(
      query,
      [
        payment.sender,
        payment.receiver,
        payment.type,
        payment.amount,
        payment.desc,
        payment.stat,
      ],
      function (err, results, fields) {
        if (err) {
          reject({
            stat: false,
            message: "Oh sorry!\nPayment could not be completed",
            error: err,
          });
        } else {
          resolve({
            message: "Payment is placed successfully",
            stat: true,
          });
        }
      }
    );
  });
}

async function getAll() {
  const queries = [`SELECT * FROM users`, `SELECT * FROM special_transactions`];
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
      transactions: result[1],
    };
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getSpecials() {
  return new Promise((resolve, reject) => {
    try {
      let usersQuery = `SELECT * FROM special_accounts`;
      myDB.query(usersQuery, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
async function getUserBalance(account_no) {
  return new Promise((resolve, reject) => {
    try {
      let usersQuery = `SELECT balance FROM users WHERE account_no = ?`;
      myDB.query(usersQuery, [account_no], function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
async function getSpecialBalance(account_no) {
  return new Promise((resolve, reject) => {
    try {
      let usersQuery = `SELECT balance FROM special_aacounts WHERE account_no = ?`;
      myDB.query(usersQuery, [account_no], function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
async function getTransaction(id) {
  try {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ?`;
      myDB.query(query, [id, id], function (err, results, fields) {
        if (err) throw err;
        resolve(results);
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}
async function updateUserBalance(details) {
  return new Promise((resolve, reject) => {
    let update = `UPDATE users SET balance = balance ${
      details.type == "credit" ? "+" : "-"
    } ? WHERE account_no = ?`;
    myDB.query(
      update,
      [details.amount, details.account_no],
      function (err, results, fields) {
        if (err) {
          throw err;
        } else {
          resolve({ stat: true, message: "Account updated successfully!" });
        }
      }
    );
  });
}
async function updateSpecialBalance(details) {
  return new Promise((resolve, reject) => {
    let update = `UPDATE special_accounts SET balance = balance ${
      details.type == "credit" ? "+" : "-"
    } ? WHERE account_no = ?`;
    myDB.query(
      update,
      [details.amount, details.account_no],
      function (err, results, fields) {
        if (err) {
          throw err;
        } else {
          resolve({ stat: true, message: "Account updated successfully!" });
        }
      }
    );
  });
}
async function getAdmin(id) {
  return new Promise((resolve, reject) => {
    let walletsQuery = `SELECT * FROM admins WHERE id=?`;
    myDB.query(walletsQuery, [id], function (err, results, fields) {
      if (err) {
        throw err;
      } else {
        resolve(results);
        console.log(results);
      }
    });
  });
}
async function authorizeAdmin(admin) {
  return new Promise((resolve, reject) => {
    let walletsQuery = `SELECT * FROM admins WHERE email=?`;
    myDB.query(
      walletsQuery,
      [admin.email],
      async function (err, results, fields) {
        if (err) {
          throw err;
        } else if (results.length > 0) {
          const isCorrectPassword = await bcrypt.compare(
            admin.password,
            results[0].admin_password
          );
          if (isCorrectPassword) {
            resolve({
              stat: true,
              message: "Login successful!",
              id: results[0].id,
            });
          } else {
            resolve({
              stat: false,
              message:
                "Incorrect password!\nPlease calm down and remember your password.Thank you.",
            });
          }
          console.log(results);
        }
      }
    );
  });
}

async function getUserID(account_no) {
  return new Promise((resolve, reject) => {
    try {
      let search = `SELECT id FROM users WHERE account_no = ?`;
      myDB.query(search, [account_no], function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve({ receiverID: result[0] });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
async function getUserAccountNo(id) {
  return new Promise((resolve, reject) => {
    try {
      let search = `SELECT account_no FROM users WHERE id = ?`;
      myDB.query(search, [id], function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function getSpecialUserID(account_no) {
  return new Promise((resolve, reject) => {
    try {
      let search = `SELECT id FROM special_accounts WHERE account_no = ?`;
      myDB.query(search, [account_no], function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve({ senderID: result[0] });
        }
      });
    } catch (err) {
      reject(err);
    }
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

async function createAdmin(admin) {
  return new Promise(async (resolve, reject) => {
    try {
      const insert =
        "INSERT INTO admins(id, full_name, email, admin_password) VALUES(?, ?, ?, ?)";
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(admin.password, salt);
      myDB.query(
        insert,
        [admin.id, admin.fullName, admin.email, hashed],
        function (err, result, field) {
          if (err) {
            reject({
              stat: false,
              message: "There's a problem creating admin",
            });
          } else {
            resolve({
              stat: true,
              message: "Account creation successful!",
            });
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createUser,
  fetchUser,
  getTransaction,
  createAdmin,
  getAll,
  getAdmin,
  authorizeAdmin,
  deposit,
  createSpecial,
  getSpecials,
  depositSpecial,
  getUserID,
  getSpecialUserID,
  updateUserBalance,
  updateSpecialBalance,
  depositUser,
  getUserBalance,
  getSpecialBalance,
  getUserAccountNo,
};
