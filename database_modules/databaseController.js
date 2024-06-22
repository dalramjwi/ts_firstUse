const sqlite3 = require('sqlite3');
const table = require('./tableScheme.js');

const databaseManager = (tableName, columns) => {
  const db = new sqlite3.Database('./product.db');

  return {
    tableName,
    columns,

    createTable() {
      const queryString = this.columns.map(column => {
        if (column.type) {
          return `${column.name} ${column.type}`;
        } else if (column.foreign) {
          return column.foreign;
        }
      }).join(',');

      const query = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${queryString})`;
      db.run(query, (err) => {
        if (err) {
          console.error(`Error creating table ${this.tableName}:`, err.message);
        } else {
          console.log(`Table ${this.tableName} created successfully.`);
        }
      });
    },
  };
};

// Object.keys(table).forEach((ele) => {
//   const dbManager = databaseManager(ele, table[ele]);
//   dbManager.createTable();
// });

// ----------------------------------------------------------------------------------------------------
// 
/**
 * ? 위 작성한 함수를 class 형태로 변환하기.
 */
class DatabaseManager {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
    this.db = new sqlite3.Database('./product.db');
  }

  createTable() {
    // map 메서드 -> 원본 배열을 해치지않고 인덱스를 순회하며 로직을 수행한 뒤 값을 반환하다.

    const columnString = this.columns.map(ele => {
      if (ele.type) {
        return `${ele.name} ${ele.type}`;
      } else if (ele.foreign) {
        return ele.foreign;
      }
    }).join(',');

    const queryString = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columnString})`;
    
    this.db.run(queryString, (err)=>{
      if(err){
        console.error(`Error creating table ${this.tableName}:`, err.message);
      }else{
        console.log(`Table ${this.tableName} created successfully.`);
      }
    })
    
  }
}

Object.keys(table).forEach((ele) => {
  const dbManager = new DatabaseManager(ele, table[ele]);
  dbManager.createTable();
});
