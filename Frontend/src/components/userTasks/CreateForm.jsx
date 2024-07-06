import React, { useContext, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToggle } from "@uidotdev/usehooks";
import api from "@/services/api.service";
import { SnackBarContext } from "@/context/SnackBarContext";
const USER_TASKS_URL = "/user/tasks";

function CreateForm({ setTasks }) {
  const [openForm, setOpenForm] = useToggle(false);
  const [todos, setTodos] = useState([""]);
  const formRef = useRef(null);
  const { snackBar, setSnackBar, displaySnackBar, closeSnackBar } =
    useContext(SnackBarContext);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      if (value && isNaN(key)) data[key] = value;
    });
    const todoList = todos.filter((element) => element); // make sure that there wont be a todo without data
    const todoListValue = todoList.map((element) => {
      return { title: element };
    });
    data.todoList = todoListValue;
    createTask(data);
  }
  function handleTodoChange(ev, curIndex) {
    setTodos((prev) => {
      return prev.map((e, i) => {
        if (curIndex === i) {
          e = ev.target.value;
        }
        return e;
      });
    });
  }
  function addNewTodoRow(curTodoIndex) {
    if (curTodoIndex === todos.length - 1) {
      setTodos((prev) => {
        return [...prev, ""];
      });
    }
  }

  async function createTask(newTask) {
    try {
      const res = await api.post(USER_TASKS_URL, newTask);
      setTasks((prev) => {
        return [...prev, res.data];
      });
      setOpenForm(false);
      displaySnackBar({
        label: `${newTask.title} has been created !`,
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      displaySnackBar({
        label: "Error in create task",
        closeManually: true,
        type: "danger",
      });
      console.error(err);
    }
  }

  return (
    <form
      ref={formRef}
      className="mx-auto border flex flex-col gap-2 px-4 py-6 rounded-md  max-w-500"
      onSubmit={handleSubmit}
    >
      <div
        className="flex items-center gap-2"
        onClick={() => {
          setOpenForm(true);
        }}
      >
        <Input
          required
          name="title"
          id="new-task-title"
          placeholder="Add new task ..."
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col gap-2 ${
          openForm
            ? "max-h-800 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="">
            <Plus />
          </label>
          <Textarea name="description" placeholder="Add a task description" />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">
            <Plus />
          </label>
          <Textarea name="body" placeholder="Add a task body content" />
        </div>
        <div className="px-9">
          <h4>Add task's todos</h4>
          {todos.map((element, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 mb-2"
                onFocus={() => {
                  addNewTodoRow(index);
                }}
              >
                <label htmlFor={`todo-${index}`}>
                  <Plus />
                </label>
                <Input
                  value={element}
                  onChange={(ev) => {
                    handleTodoChange(ev, index);
                  }}
                  name={index}
                  id={`todo-${index}`}
                  placeholder="Add new task's todo ..."
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => {
              setOpenForm(false);
              setTodos([""]);
              if (formRef.current) {
                formRef.current.reset();
              }
            }}
            variant="destructive"
          >
            Close
          </Button>
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
}

export default CreateForm;
