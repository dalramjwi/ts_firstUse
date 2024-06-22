const database = require("sqlite3").verbose();
const path = require("path");
const db= new database.Database(path.join(__dirname, "test.db"))

const insertDb = (tableName,product,price,position) =>{
  const insert = db.prepare(`INSERT INTO ${tableName} (product, price, position) VALUES (?, ?, ?)`);
  insert.run(product,price,position);
}

const productTable = {
  product : ["별의 커비처럼 별 먹기", "블랙홀 나오기", "4차원 들어가보기", "빛과 함께 달리기", "태양에서 수영하기", "사용자의 1년치 미래", "지정한 타인의 1년치 과거", "원하는 기억으로 1년치 덮어 씌우기", "1년동안 잠들기 (원하는 꿈)", "1년치 시간을 타인에게 떠넘기기(원래 겪어야 할 일을)", "방사능 피폭제거제", "생수 1리터", "구급상자", "캠핑세트", "영구 신체 재생 앰플", "몸통+머리", "왼쪽 팔", "오른쪽 팔","왼쪽 다리","오른쪽 다리","햄스터용 컴퓨터", "낙타용 마스카라", "강아지 투스젬", "해달 악세서리", "호랑이 태권도복"],
  price : [1,1,2,1,3,2,1,1,1,3,2,1,1,1,3,3,1,2,1,1,3,1,1,2,1],
  position : [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5]
} 
for(let i=0; i<productTable.product.length; i++){
  insertDb("TEST",productTable.product[i],productTable.price[i],productTable.position[i])
}