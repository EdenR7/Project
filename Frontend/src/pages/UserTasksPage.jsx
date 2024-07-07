import { TaskItem } from "@/components/userTasks/TaskItem";
import TaskList from "@/components/userTasks/TasksList";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Outlet, useLocation } from "react-router-dom";
import api from "@/services/api.service";
import CreateForm from "@/components/userTasks/CreateForm";
import SnackBar from "@/components/ui/SnackBar";
import { SnackBarContext } from "@/context/SnackBarContext";
import { Button } from "@/components/ui/button";
import { List, TableProperties } from "lucide-react";
import TaskListMode from "@/components/userTasks/TaskListMode";
import { TaskTableMode } from "@/components/userTasks/TaskTableMode";

const USER_TASKS_URL = "http://localhost:3000/api/user/tasks";

function UserTasksPage() {
  // HOOKS
  const [tasks, setTasks] = useState([]);
  const [tableMode, setTableMode] = useState(false);
  const location = useLocation();
  const { snackBar } = useContext(SnackBarContext);

  // DERIVED STATED
  const unPinnedTasks = [];
  const pinnedTasks = tasks.filter((task) => {
    if (task.isPinned) {
      return true;
    }
    unPinnedTasks.push(task);
  });

  // INITIALIZATION
  useEffect(() => {
    async function getAllTasks() {
      try {
        const res = await api.get("/user/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getAllTasks();
  }, [location.pathname]);

  return (
    <>
      <div>
        {tableMode ? (
          <>
            <div className=" flex justify-center gap-4">
              <CreateForm setTasks={setTasks} />
              <Button
                className=" mt-6"
                onClick={() => {
                  setTableMode(false);
                }}
              >
                <List />
              </Button>
            </div>
            <TaskTableMode tasks={tasks} />
          </>
        ) : (
          <>
            <div className=" flex justify-center gap-4">
              <CreateForm setTasks={setTasks} />
              <Button
                className=" mt-6"
                onClick={() => {
                  setTableMode(true);
                }}
              >
                <TableProperties />
              </Button>
            </div>
            <TaskListMode
              tasks={tasks}
              setTasks={setTasks}
              pinnedTasks={pinnedTasks}
              unPinnedTasks={unPinnedTasks}
            />
          </>
        )}
      </div>
      {snackBar.display && <SnackBar />}
      <Outlet />
    </>
  );
}

export default UserTasksPage;
