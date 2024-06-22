//#region
const http = require('http');
const fs = require('fs');
const htmlPath = "public/HTML/";
const cssPath = "public/CSS/";
//#endregion

/**
 *  * 2024_06_21 배성빈 : server 
 *  기본적인 request에 맞는 response를 반환할 수 있도록 연결장치, 중간다리 역할을 수행한다. 
 *  
 *  !현재까지 진행해둔 작업 
 *  GET 요청 처리 : index.html 전송
 *  
 */
const server = http.createServer((req, res) => {

  if (req.method === "GET") {
    getMethodHandler(req, res);
  }
  else if (req.method === "POST") {
    postMethodHandler(req, res);
  };

}).listen(3000, () => { console.log('SERVER START : PORT 3000') });;



/**
 * ? getMethodHandler : get 요청을 처리하는 모듈
 * @param {*} req : 사용자 요청
 * @param {*} res : 응답객체
 * 
 * ! 현재 진행한 작업 
 * switch case "/" 처리
 * 
 * ! 진행해야하는 작업
 * "login", "~~"과 같은 작업들을 수행해야할 필요가 있다. -> switch 구문에 모듈을 추가하는 방식으로 진행
 */

const getMethodHandler = (req, res) => {

  const url = req.url;
  const contentType = getContentType(url);
  let fileName;

  switch (true) {
    case url === "/":
      sendFile(`./${htmlPath}vending.html`, contentType, res);
      break;

    case url.includes("/CSS"):
      fileName = url.split("/CSS/")[1];
      sendFile(`./${cssPath+fileName}`, contentType, res);
      break;

    case url.includes("/img/"):
      fileName = url.split('/img/')[1];
      sendFile(`./img/${fileName}`, contentType, res);
      break

    default:
      break;
  }
};

const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/signup":
      postLoginProcessor(req, res);
      break;
  }

}


/**
 * ? postLoginProcessor : req객체에 포함되어있는 id,pw값을 추출하여 db에서 확인하는 모듈
 * @param {*} req : 요청객체
 * @param {*} res : 응답객체
 * 
 * ! 현재 진행한 작업 
 * id, pw값 추출 
 * 
 * ! 진행해야하는 작업
 * Database 모듈 접근, response 반환
 */

const postLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const data = JSON.stringify(body);
    const id = data.split("&")[0].split("id=")[1];
    const pw = data.split("&")[1].split("password=")[1];
    // console.log(decodeURI(id));
    // console.log(decodeURI(pw));
  })

};



/**
 * ? sendFile: 핸들러에서 받아온 fileName과 contentType을 기반으로 response 객체 전송
 * @param {*} fileName 
 * @param {*} contentType 
 * @param {*} res 
 */
const sendFile = (fileName, contentType, res) => {

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 ERROR");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  })

};



/**
 * ? getContentType : 을 통해 Content-Type 값을 지정해준다.
 * @param {*} url : req.url
 * @returns : content type
 * 
 * ! 현재 진행한 작업
 * "/" 분기, html 지정
 * 
 * ! 진행해야하는 작업
 * 다른 분기 설정
 */
const getContentType = (url) => {
  try {
    if (url === "/") {
      return "text/html";
    }
    else if (url.includes("/img")) {
      return "image/png";
    }
    else if (url.includes("/CSS")){
      return "text/css";
    }
  } catch {
    console.log(new Error());
  }
}


