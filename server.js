const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 4300;
const path = require("path");
const url = require("url");
const contentType = require("./contentType.js");
const users = require("./users.js");

const server = http.createServer((req, res) => {
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
    req.on("end", () => {
      const { email, password } = JSON.parse(body);
      let existuser = users.users.find((user) => {
        return user.email == email;
      });
      console.log(existuser);
      if (existuser) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            stat: true,
            data: existuser,
          })
        );
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            stat: false,
            message: `No record found with the ID: ${email}`,
          })
        );
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
        const replaced = data.replace("{{name}}", users.users[0].userName);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(replaced);
      }
    });
  }
  if (pathname == "/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users.users[0]));
  }

  if (pathname == "/newtransaction") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", () => {
      const transaction = JSON.parse(body);
      users.users[0].transactions.unshift(transaction);
      users.users[0].balance =
        users.users[0].balance - Number(transaction.amount);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          stat: true,
          data: "Transaction placed succesfully",
        })
      );
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
