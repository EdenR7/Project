import { TaskDetailsCard } from "@/components/TaskDetails/TaskDetailsCard";
import { TaskEditFormCard } from "@/components/TaskDetails/TaskEditFormCard";
import Modal from "@/components/ui/Modal";
import SnackBar from "@/components/ui/SnackBar";
import { useTheme } from "@/components/ui/ThemeProvider";
import { Button } from "@/components/ui/button";
import { SnackBarContext } from "@/context/SnackBarContext";
import { TaskEditContext } from "@/context/TaskEditContext";
import api from "@/services/api.service";
import { MoveRight } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetails() {
  // HOOKS
  const { editMode, removeEditMode } = useContext(TaskEditContext);
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const [newContentTask, setNewContentTask] = useState(null);
  const [task, setTask] = useState(null);
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  let taskBg = "bg-background";

  if (task?.bgColor !== "white") {
    if (theme === "dark") {
      taskBg = `bg-${task?.bgColor}-800`;
    } else {
      taskBg = `bg-${task?.bgColor}-200`;
    }
  }

  // INITIALIZTION
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

  // un/check todo
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

  // un/pin the task
  function handlePinChange() {
    const newTodoList = {
      isPinned: !task.isPinned,
    };
    updateTask(newTodoList);
  }

  // general update task
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
    // always reset the edit mode context value
    removeEditMode();
    navigate("/user");
  }

  return (
    <div>
      <Modal className={`min-h-80 w-2/3 max-w-md overflow-hidden ${taskBg}`}>
        <Button className="fixed top-1 px-4 right-1" onClick={closeModal}>
          <MoveRight />
        </Button>
        {task &&
          (editMode ? (
            <>
              <TaskEditFormCard
                task={task}
                updateTask={updateTask}
                setTask={setTask}
                closeModal={closeModal}
              />
            </>
          ) : (
            <TaskDetailsCard
              task={task}
              handlePinChange={handlePinChange}
              handleTodoChange={handleTodoChange}
            />
          ))}
      </Modal>
      {snackBar.display && <SnackBar />}
    </div>
  );
}

export default TaskDetails;
