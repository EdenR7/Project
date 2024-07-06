import { ToolTipWrapper } from "@/components/ui/ToolTipWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SnackBarContext } from "@/context/SnackBarContext";
import { CircleMinus, Minus, MoveRight, Pin, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
// const TASK_BASE_URL = "http://localhost:3000/api/user/tasks/";
// const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";

export function TaskEditFormCard(props) {
  const { task, updateTask, setTask, closeModal } = props;

  function handleSubmit(ev) {
    ev.preventDefault();
    updateTask({
      ...task,
      todoList: task.todoList.filter((todo) => todo.title),
    });
  }
  function editContentField(ev) {
    const key = ev.target.name;
    const newValue = ev.target.value;
    setTask((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  }
  function handleNewTodoField() {
    setTask((prev) => {
      return {
        ...prev,
        todoList: [...prev.todoList, { title: "" }],
      };
    });
  }
  function removeTodoField(todoIndex) {
    setTask((prev) => {
      return {
        ...prev,
        todoList: [
          ...prev.todoList.slice(0, todoIndex),
          ...prev.todoList.slice(todoIndex + 1),
        ],
      };
    });
  }
  function editTodoField(todoIndex, ev) {
    const newValue = ev.target.value;
    const newTodoList = task.todoList.map((todo, index) => {
      if (todoIndex === index) {
        return { ...todo, title: newValue };
      }
      return todo;
    });
    setTask((prev) => {
      return {
        ...prev,
        todoList: newTodoList,
      };
    });
  }

  return (
    <form
      className="mx-auto border flex flex-col gap-2 px-4 pt-12 pb-6"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <Input
          required
          onChange={editContentField}
          value={task.title}
          name="title"
          id="edit-task-title"
          placeholder="Add new task ..."
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col gap-2 max-h-800 opacity-100 scale-y-100 `}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="">
            <Plus />
          </label>
          <Textarea
            onChange={editContentField}
            value={task.description}
            name="description"
            placeholder="Add a task description"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">
            <Plus />
          </label>
          <Textarea
            onChange={editContentField}
            value={task.body}
            name="body"
            placeholder="Add a task body content"
          />
        </div>
        <div className="px-4">
          {task.todoList.map((task, index) => {
            return (
              <div key={index} className="flex items-center gap-2 mb-2">
                <button type="button">
                  <CircleMinus
                    size={18}
                    color="#f60909"
                    onClick={() => {
                      removeTodoField(index);
                    }}
                  />
                </button>
                <Input
                  className=" w-full"
                  value={task.title}
                  onChange={(ev) => {
                    editTodoField(index, ev);
                  }}
                  name={index}
                  id={`todo-${index}`}
                  placeholder="Add new task's todo ..."
                />
              </div>
            );
          })}
          <div className=" flex gap-4">
            <button type="button" onClick={handleNewTodoField}>
              <Plus size={16} color="#000000" />
            </button>
            <p className=" text-sm">Add new task's todo</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={closeModal} variant="destructive">
            Undo
          </Button>
          <Button>Submit</Button>
        </div>
      </div>
        {/* snack bar */}
    </form>
  );
}
