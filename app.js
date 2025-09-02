// import express from "express";
// import db from "#db/client";

// const app = express();
// app.use(express.json());

/**
 * ROUTES
 */

// Root route
// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to the Fullstack Employees API.");
// });

// // Get all employees
// app.get("/employees", async (req, res) => {
//   const result = await db.query("SELECT * FROM employees");
//   res.status(200).json(result.rows);
// });

// // Get employee by id
// app.get("/employees/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   if (!Number.isInteger(id) || id <= 0) {
//     return res.sendStatus(400);
//   }

//   const result = await db.query("SELECT * FROM employees WHERE id=$1", [id]);
//   if (result.rows.length === 0) {
//     return res.sendStatus(404);
//   }

//   res.status(200).json(result.rows[0]);
// });

// // Create employee
// app.post("/employees", async (req, res) => {
//   const { name, birthday, salary } = req.body;
//   if (!name || !birthday || !salary) {
//     return res.sendStatus(400);
//   }

//   const result = await db.query(
//     "INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3) RETURNING *",
//     [name, birthday, salary]
//   );

//   res.status(201).json(result.rows[0]);
// });

// // Update employee
// app.put("/employees/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const { name, birthday, salary } = req.body;

//   if (!Number.isInteger(id) || id <= 0) {
//     return res.sendStatus(400);
//   }
//   if (!name || !birthday || !salary) {
//     return res.sendStatus(400);
//   }

//   const result = await db.query(
//     "UPDATE employees SET name=$1, birthday=$2, salary=$3 WHERE id=$4 RETURNING *",
//     [name, birthday, salary, id]
//   );

//   if (result.rows.length === 0) {
//     return res.sendStatus(404);
//   }

//   res.status(200).json(result.rows[0]);
// });

// // Delete employee
// app.delete("/employees/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   if (!Number.isInteger(id) || id <= 0) {
//     return res.sendStatus(400);
//   }

//   const result = await db.query(
//     "DELETE FROM employees WHERE id=$1 RETURNING *",
//     [id]
//   );

//   if (result.rows.length === 0) {
//     return res.sendStatus(404);
//   }

//   res.sendStatus(204);
// });

// export default app;
import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Fullstack Employees API.");
});

// Mount employees API
app.use("/employees", employeesRouter);

export default app;
