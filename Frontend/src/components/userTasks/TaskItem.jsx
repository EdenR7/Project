import { EllipsisVertical, Pencil, Pin, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ToolTipWrapper } from "../ui/ToolTipWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import SnackBar from "../ui/SnackBar";
import { useContext, useState } from "react";
import { SnackBarContext } from "@/context/SnackBarContext";
import { useToggle } from "@uidotdev/usehooks";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { TaskEditContext } from "@/context/TaskEditContext";
const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";

export function TaskCard(props) {
  const { task, moveToTaskPage, handlePinChange, handleTodoChange } = props;
  return (
    <div
      className=" flex flex-col gap-4 cursor-pointer"
      onClick={moveToTaskPage}
    >
      <CardHeader className="p-0 ">
        <div className=" flex justify-between">
          <CardTitle className=" w-[90%]">{task.title}</CardTitle>
          <ToolTipWrapper
            tooltipContent={`${
              task.isPinned ? "Remove from pin tasks" : "Pin this task"
            }`}
          >
            <Pin
              onClick={handlePinChange}
              color={task.isPinned ? "#2563EB" : "#d4d4d4"}
              strokeWidth={task.isPinned ? "1.75" : "0.75"}
              className="cursor-pointer min-w-5 min-h-5"
            />
          </ToolTipWrapper>
        </div>
        <CardDescription className=" px-1">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className=" p-1 space-y-2">
        <p>{task.body}</p>
        <ul className=" flex flex-col gap-2 text-sm mx-2 p-1">
          {task.todoList.map((todo) => {
            return (
              <li className=" flex items-center gap-2" key={todo._id}>
                <Checkbox
                  id={todo._id}
                  checked={todo.isComplete}
                  onClick={handleTodoChange}
                />
                <label
                  htmlFor={todo._id}
                  className={`${
                    todo.isComplete && " line-through text-gray-300"
                  } cursor-pointer`}
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                >
                  {todo.title}
                </label>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </div>
  );
}

export function TaskItem(props) {
  const { task, setTasks, tasks } = props;
  const navigate = useNavigate();
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const { editMode, moveToEditMode } = useContext(TaskEditContext);

  function handleTodoChange(ev) {
    ev.stopPropagation();
    const targetTodo = task.todoList.find((todo) => todo._id === ev.target.id);
    targetTodo.isComplete = !targetTodo.isComplete;

    const newTodos = task.todoList.map((todo) => {
      if (todo._id === ev.target.id) return targetTodo;
      return todo;
    });
    const newTodoList = {
      todoList: newTodos,
    };
    updateTask(newTodoList);
  }
  function handlePinChange(ev) {
    ev.stopPropagation();
    const newTodoList = {
      isPinned: !task.isPinned,
    };
    updateTask(newTodoList);
  }

  async function updateTask(newfields) {
    try {
      const res = await api.patch("/user/tasks/" + task._id, newfields);

      const updatedTasks = tasks.map((task) =>
        task._id === res.data._id ? res.data : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  function moveToTaskPage() {
    navigate(`task/${task._id}`);
  }

  async function removeTask(taskId) {
    try {
      console.log(taskId);
      const res = await api.delete("/user/tasks/" + taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      displaySnackBar({
        label: `${task.title} has been removed !`,
      });
    } catch (err) {
      displaySnackBar({
        label: "Error in remove task",
        closeManually: true,
        type: "danger",
      });
      console.error(err);
    }
  }

  return (
    <li key={task._id}>
      <Card className=" relative p-6 max-w-md min-w-80  shadow-md transition-all hover:-translate-y-1">
        <MyDropDownMenu
          triggerElement={
            <EllipsisVertical
              size={14}
              className=" cursor-pointer ml-auto mb-2"
            />
          }
          dropDownItems={[
            <DropdownMenuCheckboxItem className="">
              <p
                className=" flex gap-2 items-center text-sm cursor-pointer"
                onClick={() => {
                  moveToEditMode();
                  moveToTaskPage();
                }}
              >
                Edit <Pencil size={14} />
              </p>
            </DropdownMenuCheckboxItem>,
            <DropdownMenuCheckboxItem className=" text-red-500 font-semibold hover:text-red-600 cursor-pointer hover:bg-slate-50">
              <p
                className=" flex gap-2 items-center text-sm"
                onClick={() => {
                  removeTask(task._id);
                }}
              >
                Delete <Trash2 size={14} />
              </p>
            </DropdownMenuCheckboxItem>,
          ]}
          label="options"
        />
        {/* <form className=" flex flex-col gap-2 animate-pulse">
          <CardHeader className="p-0 ">
            <div className=" flex justify-between">
              <CardTitle className=" w-full">
                <Input
                  className=" h-8"
                  onChange={(ev) => {
                    console.log(ev);
                  }}
                  value={task.title}
                />
              </CardTitle>
            </div>
            <CardDescription className=" px-1">
              <Textarea
                placeholder="Add a task description ..."
                onChange={(ev) => {
                  console.log(ev);
                }}
                value={task.description}
              />
            </CardDescription>
          </CardHeader>
          <CardContent className=" p-1 space-y-1">
            <Textarea
              placeholder="Add the task body content ..."
              onChange={(ev) => {
                console.log(ev);
              }}
              value={task.body}
            />
            <ul className=" flex flex-col gap-2 text-sm mx-2 p-1">
              {task.todoList.map((todo) => {
                return (
                  <li className=" flex items-center gap-2" key={todo._id}>
                    <Input
                      className={`${
                        todo.isComplete && " line-through text-gray-300"
                      } cursor-pointer`}
                      onChange={(ev) => {
                        console.log(ev);
                      }}
                      value={todo.title}
                    />
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <div className=" flex justify-between px-2">
            <Button variant="destructive" type="button">
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </form> */}
        <TaskCard
          task={task}
          moveToTaskPage={moveToTaskPage}
          handlePinChange={handlePinChange}
          handleTodoChange={handleTodoChange}
        />
      </Card>
      {snackBar.display && <SnackBar />}
    </li>
  );
}
