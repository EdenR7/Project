import { EllipsisVertical, Palette, Pencil, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import SnackBar from "../ui/SnackBar";
import { useContext, useState } from "react";
import { SnackBarContext } from "@/context/SnackBarContext";
import { TaskEditContext } from "@/context/TaskEditContext";
import { TaskCard } from "./TaskCard";
import { MyProgressBar } from "../ui/ProgressBar";
import { useTheme } from "../ui/ThemeProvider";
import ColorDropDown from "./ColorDropDown";

export function TaskItem(props) {
  const { task, setTasks, tasks } = props;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const { editMode, moveToEditMode } = useContext(TaskEditContext);

  const completedTodos = task.todoList.reduce(
    (acc, todo) => (todo.isComplete ? acc + 1 : acc),
    0
  );

  let taskBg = "bg-background";
  if (task.bgColor !== "white") {
    if (theme === "dark") {
      taskBg = `bg-${task.bgColor}-800`;
    } else {
      taskBg = `bg-${task.bgColor}-200`;
    }
  }

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
      await api.delete("/user/tasks/" + taskId);
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
      <Card
        className={` min-w-72 relative p-6 shadow-md transition-all hover:-translate-y-1 ${taskBg}`}
      >
        <div className="flex justify-between mb-4">
          <MyProgressBar
            completedTodos={completedTodos}
            totalTodos={task.todoList.length}
          />
          <MyDropDownMenu
            triggerElement={
              <EllipsisVertical size={14} className=" cursor-pointer" />
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
              <ColorDropDown updateTask={updateTask} />,
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
        </div>
        <TaskCard // the content of each task
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
