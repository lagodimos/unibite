import mariadb from "mariadb";

export const pool = mariadb.createPool({
    host: "database",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "unibite",
    connectionLimit: 10,
});
