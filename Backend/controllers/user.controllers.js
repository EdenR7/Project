const express = require("express");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");
const Task = require("../models/task.model");
const router = express.Router();

async function getUser(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User didnt found" });
    const { password, ...userResponse } = user._doc;
    res.status(200).json(userResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getUserTasks(req, res) {
  const { userId } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(userId);
    const tasks = await Task.find({ user: adjustedUserId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getUserTasksNumber(req, res) {
  const { userId } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(userId);
    const tasksCounter = await Task.countDocuments({ user: adjustedUserId });
    res.status(200).json(tasksCounter);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function createTask(req, res) {
  const { body: task } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(req.userId);
    task.user = adjustedUserId;
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(`user.controller, createTask. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`user.controller, createTask. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const targetTask = await Task.findById(id);
    if (!targetTask) {
      console.log(`user.controller, deleteTask, Task not found with id: ${id}`);
      return res.status(404).json({ message: "Task didnt found" });
    }

    if (targetTask.user.toString() !== userId.toString()) {
      return res.status(400).json({ message: "The user IDs not match !" });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(202).json({ message: "Task Deleted" });
  } catch (err) {
    console.log(`user.controller, deleteTask. ${err.name}`);
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Task didnt found" });
    }
    res.status(500).json({ message: "Server error while deleting Task" });
  }
}

// async function getUserTasks(req, res) {
//   const { userId } = req;
//   try {
//     const adjustedUserId = new mongoose.Types.ObjectId(userId);
//     const Tasks = await Task.find({ user: adjustedUserId });
//     res.status(200).json(Tasks);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// }

// async function deleteTask(req, res) {
//   const { id } = req.params;
//   const { userId } = req;
//   console.log(req);

//   try {
//     const Task = await Task.findById(id);
//     if (!Task) {
//       console.log(
//         `user.controller, deleteTask, Task not found with id: ${id}`
//       );
//       return res.status(404).json({ message: "Task didnt found" });
//     }

//     if (Task.user.toString() !== userId.toString()) {
//       return res.status(400).json({ message: "The user IDs not match !" });
//     }
//     const deletedTask = await Task.findByIdAndDelete(id);
//     res.status(202).json({ message: "Task Deleted" });
//   } catch (err) {
//     console.log(`user.controller, deleteTask. ${err}`);
//     res.status(500).json({ message: "Server error while creating Task" });
//   }
// }

module.exports = {
  getUser,
  getUserTasks,
  getUserTasksNumber,
  createTask,
  deleteTask,
};
