const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

////// Routes /////

// ***** List Items *****

// Create List Item
app.post("/list", async (req, res) => {
	try {
		const { description, price, date, user_id } = req.body;
		const newListItem = await pool.query(
			"INSERT INTO items(description, price, date, user_id) VALUES ($1, $2, $3, $4)",
			[description, price, date, user_id]
		);
		res.json(newListItem.rows[0]);
	} catch (error) {
		console.log(error);
	}
});

// Get all List Items
app.get("/list/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const allListItems = await pool.query(
			"SELECT * FROM items WHERE user_id=$1;",
			[id]
		);
		res.json(allListItems.rows);
		console.log(allListItems.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// Update List Item
//app.put();

// Delete List Item
app.delete("/list/:id", async (req, res) => {
	const { id } = req.params;
	const deleteListItem = await pool.query("DELETE FROM items WHERE id=$1", [
		id
	]);
	res.json("List item deleted");
});

// Delete entire list
app.post("/list/all", async (req, res) => {
	const arr = req.body;
	arr.forEach((id) => {
		pool.query("DELETE FROM items WHERE id=$1", [id]);
	});

	res.json("All List items deleted");
});

// ***** Users *****

app.post("/users/login", async (req, res) => {
	try {
		const { email } = req.body;
		const findEmail = await pool.query(
			"SELECT * FROM users Where email=$1",
			[email]
		);
		if (findEmail.rows.length == 0) {
			const newUser = await pool.query(
				"INSERT INTO users(email, budget) VALUES($1, $2)",
				[email, 0.0]
			);
			res.json(newUser.rows[0]);
		} else {
			res.json(findEmail.rows[0]);
		}
	} catch (error) {
		console.log(error.message);
	}
});

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
