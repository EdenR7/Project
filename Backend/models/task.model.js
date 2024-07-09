const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    body: { type: String },
    todoList: [todoSchema],
    isPinned: { type: Boolean, default: false },
    bgColor: { type: String, default: "white" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     isComplete: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const taskSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     body: { type: String },
//     todoList: [todoSchema],
//     isPinned: { type: Boolean, default: false },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// const Task = mongoose.model("Task", taskSchema);
// module.exports = Task;
