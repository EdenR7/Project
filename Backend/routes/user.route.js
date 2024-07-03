const express = require("express");
// const User = require("../models/user.model");
const {
  getUser,
  getUserTasks,
  getUserTasksNumber,
  createTask,
  deleteTask,
} = require("../controllers/user.controllers");
const router = express.Router();

router.get("/", getUser);
router.get("/tasks", getUserTasks);
router.get("/tasks/count", getUserTasksNumber);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

// router.get("/:id", getUserById);

module.exports = router;
