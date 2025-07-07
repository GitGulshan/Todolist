const express = require("express");
const client = require("./dbCLient");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello i came from backend");
});

app.get("/api/todo", async (req, res) => {
  const query = `select * from Todolist`;
  const result = await client.query(query);
  if (!result) return res.status(500).res.send("INTERNAL SERVER ERROR");
  res.send(result.rows);
});

app.post("/api/todo", async (req, res) => {
  const { title, description } = req.body;
  const query = `INSERT INTO Todolist (title, description, completed, createdAt, updatedAt) VALUES ($1,$2, false, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)RETURNING*`;
  const values = [title, description];
  const result = await client.query(query, values);
  if (!result) return res.status(500).send("INTERNAL SERVER ERROR");
  res.send(result.rows);
});

app.put("/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const query = `UPDATE Todolist SET completed = $1 , updatedAt = CURRENT_TIMESTAMP WHERE id=$2 RETURNING *`;
  const values = [completed, id];
  const result = await client.query(query, values);
  if (result.rows.length === 0) {
    return res.status(404).send("Todo is not found");
  }
  res.send(result.rows[0]);
});

app.delete("/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Todolist WHERE id= $1 RETURNING *`;
  const values = [id];
  const result = await client.query(query, values);
  if (result.rows.length === 0) {
    return res.send(404).send("Todo NOt FOUND");
  }

  res.send({
    message: "TODO ITEMS IS SUCESSFULLY DELETED",
    deletedTodo: result.rows,
  });
});

app.listen(3000, () => {
  console.log("CONNECTION SUCCESSFULLY IN THE PORT 3000");
});
