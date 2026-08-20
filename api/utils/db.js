const mariadb = require("mariadb");

async function getDbConnection() {
  return await mariadb.createConnection({
    host: "database",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "unibite",
  });
}

module.exports = { getDbConnection };
