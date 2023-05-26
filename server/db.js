const Pool = require("pg").Pool;

const pool = new Pool({
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	port: process.env.PORT,
	database: "shoppinglist_db"
});

module.exports = pool;
