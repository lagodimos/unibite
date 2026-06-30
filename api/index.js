const express = require("express");
const mariadb = require("mariadb");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("API request recieved.");
  res.send({ message: "OK!" });
});

app.get("/db-status", async (req, res) => {
  console.log("API request for DB status recieved.");

  let conn;
  try {
    conn = await mariadb.createConnection({
      host: "database",
      port: 3306,
      user: "nodejs",
      password: "nodejs",
      database: "unibite",
    });

    res.send({ message: "OK!" });
  } catch (err) {
    res.send({ message: `FAILED: ${err}` });
  } finally {
    if (conn) {
      await conn.end();
    }
  }
});

app.listen(port, () => {
  console.log(`UniBite erver listening on port ${port}`);
});
