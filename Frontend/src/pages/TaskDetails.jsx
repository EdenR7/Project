import Modal from "@/components/ui/Modal";
import { ToolTipWrapper } from "@/components/ui/ToolTipWrapper";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/services/api.service";
import axios from "axios";
import { MoveRight, Pin } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const TASK_BASE_URL = "http://localhost:3000/api/user/tasks/";
const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";

function TaskDetails() {
  const [task, setTask] = useState(null);
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTask() {
      try {
        const res = await api.get("/user/tasks/" + taskId);

        setTask(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getTask();
  }, []);

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

      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function closeModal() {
    navigate("/user");
  }

  return (
    <div>
      <Modal className="min-h-80 w-fit overflow-hidden">
        <Button className="fixed top-0 px-4 right-0" onClick={closeModal}>
          <MoveRight />
        </Button>
        {task && (
          <>
            <div className=" flex flex-col p-4 py-12 justify-center">
              <CardHeader className="p-0 ">
                <div className=" flex justify-center gap-4">
                  <CardTitle className=" ">{task.title}</CardTitle>
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
                <CardDescription className=" px-1 text-center">
                  {task.description}
                </CardDescription>
              </CardHeader>
              <CardContent className=" flex p-1 space-y-2 text-center flex-col items-center">
                <p>{task.body}</p>
                <ul className=" flex flex-col gap-2 text-sm">
                  {task?.todoList.map((todo) => {
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
          </>
        )}
      </Modal>
    </div>
  );
}

export default TaskDetails;
