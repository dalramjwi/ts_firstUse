const database = require("sqlite3").verbose();
const path = require("path");
const db = new database.Database(path.join(__dirname, "test.db"))
const selectDb = (wantSelect, tableName, ifSelectName,value) =>{
  db.all(`SELECT ${wantSelect} FROM ${tableName} WHERE ${ifSelectName} = ?`,[value], (err,rows)=>{
    if(err){
      console.error("error")
    }
    else{
      rows.forEach((row)=>{
        //일단 콘솔에 작성
        console.log(`product : ${row.product} price : ${row.price},position : ${row.position}`);
      });
    }
  });
}
selectDb('*','test','product',"지정한 타인의 1년치 과거")