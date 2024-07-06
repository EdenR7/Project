import { TaskDetailsCard } from "@/components/TaskDetails/TaskDetailsCard";
import { TaskEditFormCard } from "@/components/TaskDetails/TaskEditFormCard";
import Modal from "@/components/ui/Modal";
import SnackBar from "@/components/ui/SnackBar";
import { ToolTipWrapper } from "@/components/ui/ToolTipWrapper";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SnackBarContext } from "@/context/SnackBarContext";
import { TaskEditContext } from "@/context/TaskEditContext";
import api from "@/services/api.service";
import { CircleMinus, Minus, MoveRight, Pin, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// const TASK_BASE_URL = "http://localhost:3000/api/user/tasks/";
// const USER_TASKS_URL = "http://localhost:3000/api/user/tasks/";


function TaskDetails() {
  const { editMode, removeEditMode } = useContext(TaskEditContext);
  const { snackBar, setSnackBar, displaySnackBar, closeSnackBar } =
    useContext(SnackBarContext);
  const [newContentTask, setNewContentTask] = useState(null);
  const [task, setTask] = useState(null);
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTask() {
      try {
        const res = await api.get("/user/tasks/" + taskId);
        const { title, description, body } = res.data;
        setNewContentTask({
          title,
          description,
          body,
        });
        setTask(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getTask();
  }, []);

  function handleTodoChange(ev) {
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
    console.log(1);
    const newTodoList = {
      isPinned: !task.isPinned,
    };
    updateTask(newTodoList);
  }

  async function updateTask(newfields) {
    try {
      const res = await api.patch("/user/tasks/" + task._id, newfields);
      if (editMode) {
        displaySnackBar({
          label: `${task.title} has been edited !`,
        });
        closeModal();
      }
      setTask(res.data);
    } catch (err) {
      displaySnackBar({
        label: "Error in edit task",
        closeManually: true,
        type: "danger",
      });
      console.error(err);
    }
  }

  function closeModal() {
    removeEditMode();
    navigate("/user");
  }

  return (
    <div>
      <Modal className="min-h-80 w-2/3 max-w-md overflow-hidden">
        <Button className="fixed top-1 px-4 right-1" onClick={closeModal}>
          <MoveRight />
        </Button>
        {task &&
          (!editMode ? (
            <>
              <TaskDetailsCard
                task={task}
                handlePinChange={handlePinChange}
                handleTodoChange={handleTodoChange}
              />
            </>
          ) : (
            <TaskEditFormCard
              task={task}
              updateTask={updateTask}
              setTask={setTask}
              closeModal={closeModal}
            />
          ))}
      </Modal>
      {snackBar.display && <SnackBar />}
    </div>
  );
}

export default TaskDetails;
