import { TaskDetailsCard } from "@/components/TaskDetails/TaskDetailsCard";
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

function TaskEditFormCard(props) {
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
    </form>
  );
}

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
