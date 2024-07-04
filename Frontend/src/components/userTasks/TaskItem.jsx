import { Pin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";
const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";

export function TaskItem(props) {
  const { userToken } = useContext(UserContext);
  const { task, setTasks, tasks } = props;
  const [curTask, setCurTask] = useState(task);

  function handleTodoChange(ev) {
    ev.stopPropagation();
    const targetTodo = curTask.todoList.find(
      (todo) => todo._id === ev.target.id
    );
    targetTodo.isComplete = !targetTodo.isComplete;

    const newTodos = curTask.todoList.map((todo) => {
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
      isPinned: !curTask.isPinned,
    };
    updateTask(newTodoList);
  }

  async function updateTask(newfields) {
    try {
      const res = await axios.patch(USER_TASKS_URL + curTask._id, newfields, {
        headers: {
          Authorization: userToken,
        },
      });
      console.log(res.data._id);
      const updatedTasks = tasks.map((task) =>
        task._id === res.data._id ? res.data : task
      );
      // setCurTask(res.data);
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <li key={curTask._id}>
      <Card
        className=" relative p-6 max-w-md flex flex-col gap-4 shadow-md transition-all hover:-translate-y-1"
        onClick={() => {
          console.log("Hi");
        }}
      >
        <CardHeader className="p-0 ">
          <div className=" flex justify-between">
            <CardTitle className=" w-[90%]">{curTask.title}</CardTitle>
            <Pin
              onClick={handlePinChange}
              color={curTask.isPinned ? "#000000" : "#d4d4d4"}
              strokeWidth={0.75}
              className="cursor-pointer min-w-5 min-h-5"
            />
          </div>
          <CardDescription className=" px-1">
            {curTask.description}
          </CardDescription>
        </CardHeader>
        <CardContent className=" p-1 space-y-2">
          <p>{curTask.body}</p>
          <ul className=" flex flex-col gap-2 text-sm mx-2 p-1">
            {curTask.todoList.map((todo) => {
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
