const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "test.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database opened successfully");
  }
});

function createTable(db, tableName, columns) {
  const columnsDef = columns.map(column => `${column.name} ${column.type}`).join(', ');
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDef})`;

  db.run(sql, (err) => {
    if (err) {
      console.error(`Could not create table ${tableName}`, err);
    } else {
      console.log(`Table ${tableName} created`);
    }
  });
}

const columns = [
  { name: 'product', type: 'TEXT NOT NULL' },
  { name: 'price', type: 'INTEGER NOT NULL' },
  { name: 'position', type: 'INTEGER NOT NULL' }
];

createTable(db, 'TEST', columns);

module.exports = {
  createTable,
  db
};
