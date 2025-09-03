import express from "express";
const router = express.Router();

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../db/queries/employees.js";

// Helper: validate ID (must be integer > 0)
function validateId(id) {
  if (!/^\d+$/.test(id)) return null;
  return Number(id);
}

// Routes for "/employees"
router
  .route("/")
  .get(async (req, res) => {
    try {
      const employees = await getEmployees();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    const { name, birthday, salary } = req.body || {};
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

// Routes for "/employees/:id"
router
  .route("/:id")
  .get(async (req, res) => {
    const id = validateId(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID must be a positive integer" });

    try {
      const employee = await getEmployee(id);
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });
      res.json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put(async (req, res) => {
    const id = validateId(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID must be a positive integer" });

    const { name, birthday, salary } = req.body || {};
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }

    try {
      const updated = await updateEmployee({ id, name, birthday, salary });
      if (!updated)
        return res.status(404).json({ error: "Employee not found" });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    const id = validateId(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID must be a positive integer" });

    try {
      const deleted = await deleteEmployee(id);
      if (!deleted)
        return res.status(404).json({ error: "Employee not found" });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
