const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 4300;
const path = require("path");
const url = require("url");
const formidable = require("formidable");
const contentType = require("./contentType.js");
const users = require("./users.js");
const { createUser, fetchUser, getTransaction } = require("./database.js");

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
        console.log(body);
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
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          stat: true,
          data: "Transaction placed succesfully",
        })
      );
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
      fs.rename(oldPath, newPath, async (err) => {
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
            profile_url: newPath,
          };
          console.log(user);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await createUser(user)));
        } catch (err) {
          console.log(err);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(err));
        }
      });
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
