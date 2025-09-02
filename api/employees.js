import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees.js";

const router = express.Router();

// GET /employees
router.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /employees
router.post("/", async (req, res) => {
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required field(s)" });
  }

  try {
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /employees/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  try {
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, birthday, salary } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }
  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required field(s)" });
  }

  try {
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  try {
    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
