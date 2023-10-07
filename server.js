const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 4300;
const path = require("path");
const url = require("url");
const contentType = require("./private/contentType.js");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(pathname);
  if (pathname !== "/") {
    contentType.serveType(pathname, res);
  }
  if (pathname == "/") {
    fs.readFile("../Spring well/public/index.html", "utf-8", (err, data) => {
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
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
