const http = require("http");
const PORT = process.env.PORT || 4300;
const path = require("path");
const url = require("url");
const formidable = require("formidable");
const contentType = require("./contentType.js");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dmejjae45",
  api_key: "744838253882611",
  api_secret: "DRLqbCN8Es7Ni0XO3j5SmXh0pqU",
});
const {
  createUser,
  fetchUser,
  getTransaction,
  createAdmin,
  getAll,
  getAdmin,
  authorizeAdmin,
  createSpecial,
  getSpecials,
  getUserID,
  depositSpecial,
  getSpecialUserID,
  getSpecialTransactions,
  updateUserBalance,
  updateSpecialBalance,
  depositUser,
  getUserBalance,
  getUserAccountNo,
} = require("./database.js");
const { message } = require("./mailer.js");

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(pathname);
  if (pathname !== "/") {
    contentType.serveType(pathname, res);
  }
  if (pathname == "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  if (pathname == "/login") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      const user = JSON.parse(body);
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await fetchUser(user, null)));
      } catch (err) {
        res.writeHead(402, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
  if (pathname == "/loginform") {
    const filePath = path.join(__dirname, "public", "login.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/signupform") {
    const filePath = path.join(__dirname, "public", "signup.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/homepage") {
    const filePath = path.join(__dirname, "private", "main.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/user") {
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });

    req.on("end", async () => {
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await fetchUser(null, body.id)));
      } catch (err) {
        console.log(err);
        res.writeHead(501, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error!" }));
      }
    });
  }

  if (pathname == "/newtransaction") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        const transaction = JSON.parse(body);
        const { receiverID } = await getUserID(Number(transaction.receiver));
        if (!receiverID) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "The receiver account number does not exist",
              stat: false,
            })
          );
          return;
        }
        const userAccountNo = await getUserAccountNo(transaction.senderId);
        const userBalance = await getUserBalance(userAccountNo.account_no);
        console.log(userBalance[0].balance);
        if (userBalance[0].balance < transaction.amount) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Transaction amount is higher than balance",
              stat: false,
            })
          );
          return;
        }
        const payment = {
          sender: transaction.senderId,
          receiver: receiverID.id,
          type: transaction.type,
          amount: parseFloat(transaction.amount),
          desc: transaction.desc,
          stat: "Pending",
        };
        const senderDetails = {
          amount: parseFloat(payment.amount),
          account_no: Number(userAccountNo.account_no),
          type: "subtract",
        };
        const receiverDetails = {
          amount: parseFloat(payment.amount),
          account_no: Number(transaction.receiver),
          type: "credit",
        };
        await updateUserBalance(senderDetails);
        await updateUserBalance(receiverDetails);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await depositUser(payment)));
      } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }

  if (pathname == "/transactions") {
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });

    req.on("end", async () => {
      const { id } = body;
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await getTransaction(id)));
      } catch (err) {
        res.writeHead(501, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
  if (pathname == "/newuser") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      // Handle file data
      if (err) {
        console.log(err);
      }
      const oldPath = files.imageInput[0].filepath;
      const fileName = files.imageInput[0].originalFilename;
      const newPath = `private/profiles/${fileName}`;

      // Upload the image to Cloudinary
      cloudinary.uploader.upload(oldPath, async (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          try {
            if (err) throw err;
            const user = {
              id: generateCode(50),
              fullName: fields.fullName[0],
              email: fields.email[0],
              gov_id: Number(fields.idNumber[0]),
              address: fields.address[0],
              password: fields.password[0],
              id_no: Number(generateID(10)),
              card: generateCard(),
              account_no: generateAccountNumber(),
              profile_url: result.secure_url,
            };
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(await createUser(user)));
          } catch (err) {
            console.log(err);
            res.writeHead(501, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(err));
          }
        }
      });
    });
  }
  if (pathname == "/new-special") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      // Handle file data
      if (err) {
        console.log(err);
      }
      const oldPath = files.imageInput[0].filepath;
      // Upload the image to Cloudinary
      cloudinary.uploader.upload(oldPath, async (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          try {
            if (err) throw err;
            const user = {
              id: generateCode(50),
              fullName: fields.accountName[0],
              email: fields.email[0],
              address: fields.address[0],
              password: fields.password[0],
              card: generateCard(),
              id_no: Number(generateID(10)),
              account_no: generateAccountNumber(),
              profile_url: result.secure_url,
            };
            await createUser({
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              gov_id: null,
              address: user.address,
              password: user.password,
              id_no: user.id_no,
              card: user.card,
              account_no: user.account_no,
              profile_url: user.profile_url,
            });
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(await createSpecial(user)));
          } catch (err) {
            console.log(err);
            res.writeHead(501, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(err));
          }
        }
      });
    });
  }

  if (pathname == "/message") {
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });

    req.on("end", async () => {
      try {
        console.log(body);
        message(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Message successfully sent!" }));
      } catch (err) {
        res.writeHead(501, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }

  //Handling Admin routing
  if (pathname == "/admin") {
    const filePath = path.join(__dirname, "/admin/public", "login.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/admin/home") {
    const filePath = path.join(__dirname, "/admin/private", "page.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getAll()));
  }
  if (pathname == "/all-special") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getSpecials()));
  }

  if (pathname == "/admin/detail") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        let adminId = JSON.parse(body);
        const { id } = adminId;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await getAdmin(id)));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
  if (pathname == "/admin/auth") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        let admin = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await authorizeAdmin(admin)));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
  if (pathname == "/new-admin") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        let admin = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await createAdmin(admin)));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
  if (pathname == "/new-transaction") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        let transaction = JSON.parse(body);
        if (transaction.type == "Deposit") {
          const { senderID } = await getSpecialUserID(
            Number(transaction.sender)
          );
          const { receiverID } = await getUserID(Number(transaction.receiver));
          const payment = {
            sender: senderID.id,
            receiver: receiverID.id,
            type: transaction.type,
            amount: parseFloat(transaction.amount),
            desc: transaction.desc,
            stat: transaction.stat,
          };
          const details = {
            amount: parseFloat(transaction.amount),
            account_no: Number(transaction.receiver),
            type: "credit",
          };
          const specialDetails = {
            amount: parseFloat(transaction.amount),
            account_no: Number(transaction.sender),
            type: "subtract",
          };
          await updateSpecialBalance(specialDetails);
          await updateUserBalance(details);
          console.log(payment);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await depositSpecial(payment)));
        } else if (transaction.type == "Withdrawal") {
          /*const { senderID } = await getSpecialUserID(
            Number(transaction.sender)
          );
          const { receiverID } = await getUserID(Number(transaction.receiver));
          const payment = {
            sender: senderID.id,
            receiver: receiverID.id,
            type: transaction.type,
            amount: parseFloat(transaction.amount),
            desc: transaction.desc,
            stat: transaction.stat,
          };*/
          const details = {
            amount: parseFloat(transaction.amount),
            account_no: Number(transaction.owner),
            type: "subtract",
          };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await updateUserBalance(details)));
        } else if (transaction.type == "fund-special") {
          const details = {
            amount: parseFloat(transaction.amount),
            account_no: Number(transaction.owner),
            type: "credit",
          };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await updateSpecialBalance(details)));
        }
      } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
      }
    });
  }
});

function generateCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * characters.length);
    code += characters.charAt(index);
  }

  return code;
}
function generateID(length) {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * characters.length);
    code += characters.charAt(index);
  }

  return code;
}
function generateAccountNumber() {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(Math.random() * characters.length);
    code += characters.charAt(index);
  }

  return +code;
}
function generateCard() {
  let length = 16;
  const characters = "0123456789";
  let card = "";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * characters.length);
    card += characters.charAt(index);
  }

  const formattedCardNumber = card.replace(/(.{4})/g, "$1 ");

  return formattedCardNumber;
}

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
