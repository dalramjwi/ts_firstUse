var http = require("http");
var fs = require("fs");
var htmlPath = "public/HTML/";
var cssPath = "public/CSS/";
var server = http
    .createServer(function (req, res) {
    if (req.method === "GET") {
        getMethodHandler(req, res);
    }
    else if (req.method === "POST") {
        postMethodHandler(req, res);
    }
})
    .listen(8080);
var getMethodHandler = function (req, res) {
    var url = req.url;
    var contentType = getContentType(url);
    var fileName;
    switch (true) {
        case url === "/":
            sendFile("./".concat(htmlPath, "vending.html"), contentType, res);
            break;
        case url.includes("/CSS"):
            fileName = url.split("/CSS/")[1];
            sendFile("./".concat(cssPath + fileName), contentType, res);
            break;
        case url.includes("/img/"):
            fileName = url.split("/img/")[1];
            sendFile("./img/".concat(fileName), contentType, res);
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
            break;
    }
};
var postMethodHandler = function (req, res) {
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
var getContentType = function (url) {
    try {
        if (url === "/") {
            return "text/html";
        }
        else if (url.includes("/img")) {
            return "image/png";
        }
        else if (url.includes("/CSS")) {
            return "text/css";
        }
        else {
            return "text/plain";
        }
    }
    catch (_a) {
        console.error(new Error());
        return "text/plain";
    }
};
var postLoginProcessor = function (req, res) {
    var body = "";
    req.on("data", function (data) {
        body += data;
    });
    req.on("end", function () {
        var data = new URLSearchParams(body);
        var id = data.get("id");
        var pw = data.get("password");
        if (id && pw) {
            console.log(decodeURI(id));
            console.log(decodeURI(pw));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Login processed" }));
    });
};
var sendFile = function (fileName, contentType, res) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 ERROR");
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
};
