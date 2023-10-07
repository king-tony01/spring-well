const path = require("path");
const fs = require("fs");

function serveType(link, res) {
  const extension = path.extname(link);
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      const filePath = path.join(__dirname, "", link);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal server error!" }));
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".jpg":
      contentType = "image/jpg";
      const filePath2 = path.join(__dirname, "", link);
      fs.readFile(filePath2, "", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal server error!" }));
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
  }
}

module.exports = {
  serveType,
};
