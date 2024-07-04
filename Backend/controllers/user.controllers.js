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
  console.log("m");

  const { userId } = req;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getTaskById(req, res) {
  const { id: taskId } = req.params;
  const { userId } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(userId);
    const task = await Task.findOne({
      user: adjustedUserId,
      _id: taskId,
    });
    if (!task) {
      console.log(
        `user.controller, getTaskById, Task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Error in find specific task" });
    }
    res.status(200).json(task);
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
    const adjustedUserId = new mongoose.Types.ObjectId(userId);

    const targetTask = await Task.findOneAndDelete({
      user: adjustedUserId,
      _id: id,
    });
    if (!targetTask) {
      console.log(`user.controller, deleteTask, Task not found with id: ${id}`);
      return res.status(404).json({ message: "Error in find specific task" });
    }
    res.status(202).json({ message: "Task Deleted" });

    // const targetTask = await Task.findById(id);
    // if (!targetTask) {
    //   console.log(`user.controller, deleteTask, Task not found with id: ${id}`);
    //   return res.status(404).json({ message: "Task didnt found" });
    // }

    // if (targetTask.user.toString() !== userId.toString()) {
    //   return res.status(400).json({ message: "The user IDs not match !" });
    // }
    // const deletedTask = await Task.findByIdAndDelete(id);
  } catch (err) {
    console.log(`user.controller, deleteTask. ${err.name}`);
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Task didnt found" });
    }
    res.status(500).json({ message: "Server error while deleting Task" });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;
  const newTaskFields = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, newTaskFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      console.log(`user.controller, updateTask. task not found with id: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    if (err.name === "CastError") {
      `task.controller, CastError updateTask something went wrong with user id:${id}`;
      return res.status(404).json({ message: "Task didnt found" });
    }
    if (err.name === "ValidationError") {
      console.log(`user.controller, updateTask. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`user.controller, updateTask. ${err.message}`);
      res.status(500).json({ message: "Server error while updating user" });
    }
  }
}

module.exports = {
  getUser,
  getUserTasks,
  getUserTasksNumber,
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
};
