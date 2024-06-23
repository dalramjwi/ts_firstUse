const http = require("http");
const fs = require("fs");
const htmlPath = "public/HTML/";
const cssPath = "public/CSS/";
const server = http
  .createServer((req, res) => {
    if (req.method === "GET") {
      getMethodHandler(req, res);
    } else if (req.method === "POST") {
      postMethodHandler(req, res);
    }
  })
  .listen(8080);
const getMethodHandler = (req, res) => {
  const url = req.url;
  const contentType = getContentType(url);
  let fileName: string;
  switch (true) {
    case url === "/":
      sendFile(`./${htmlPath}vending.html`, contentType, res);
      break;

    case url.includes("/CSS"):
      fileName = url.split("/CSS/")[1];
      sendFile(`./${cssPath + fileName}`, contentType, res);
      break;

    case url.includes("/img/"):
      fileName = url.split("/img/")[1];
      sendFile(`./img/${fileName}`, contentType, res);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      break;
  }
};
const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/signup":
      postLoginProcessor(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      break;
  }
};
const getContentType = (url: string): string => {
  try {
    if (url === "/") {
      return "text/html";
    } else if (url.includes("/img")) {
      return "image/png";
    } else if (url.includes("/CSS")) {
      return "text/css";
    } else {
      return "text/plain";
    }
  } catch {
    console.error(new Error());
    return "text/plain";
  }
};
const postLoginProcessor = (req, res): void => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const data = new URLSearchParams(body);
    const id = data.get("id");
    const pw = data.get("password");

    if (id && pw) {
      console.log(decodeURI(id));
      console.log(decodeURI(pw));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Login processed" }));
  });
};
const sendFile = (fileName: string, contentType: string, res): void => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 ERROR");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
};
