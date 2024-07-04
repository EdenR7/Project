import { Pin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { ToolTipWrapper } from "../ui/ToolTipWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/services/api.service";
const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";

export function TaskItem(props) {
  const { userToken } = useContext(UserContext);
  const { task, setTasks, tasks } = props;
  const navigate = useNavigate();

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

  function moveToTaskPage(ev) {
    navigate(`task/${task._id}`);
  }

  return (
    <li key={task._id}>
      <Card
        className=" relative p-6 max-w-md flex flex-col gap-4 shadow-md transition-all hover:-translate-y-1"
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
          <CardDescription className=" px-1">
            {task.description}
          </CardDescription>
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
      </Card>
    </li>
  );
}
