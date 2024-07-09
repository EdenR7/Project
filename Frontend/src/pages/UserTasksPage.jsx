import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import api from "@/services/api.service";
import CreateForm from "@/components/userTasks/CreateForm";
import SnackBar from "@/components/ui/SnackBar";
import { SnackBarContext } from "@/context/SnackBarContext";
import { Button } from "@/components/ui/button";
import { List, TableProperties } from "lucide-react";
import TaskListMode from "@/components/userTasks/TaskListMode";
import { TaskTableMode } from "@/components/userTasks/TaskTableMode";
import { ToolTipWrapper } from "@/components/ui/ToolTipWrapper";
import { Loader } from "@/components/ui/Loader";

const USER_TASKS_URL = "http://localhost:3000/api/user/tasks";

function UserTasksPage() {
  // HOOKS
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tableMode, setTableMode] = useState(false);
  const location = useLocation();
  const { snackBar } = useContext(SnackBarContext);

  const abortControllerRef = useRef(null);

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
    abortControllerRef.current = new AbortController();
    async function getAllTasks() {
      try {
        const res = await api.get("/user/tasks", {
          signal: abortControllerRef.current.signal,
        });
        setTasks(res.data);
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Aborted req");
          return;
        }
        console.error(err);
      } finally {
        setLoader(false);
      }
    }
    setLoader(true);
    getAllTasks();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.pathname]);

  return (
    <>
      <div>
        {tableMode && !loader ? (
          <>
            <div className=" flex justify-center gap-4">
              <CreateForm setTasks={setTasks} />
              {tasks.length && (
                <ToolTipWrapper tooltipContent="List display (default) mode">
                  <Button
                    className=" mt-6"
                    onClick={() => {
                      setTableMode(false);
                    }}
                  >
                    <List />
                  </Button>
                </ToolTipWrapper>
              )}
            </div>
            <TaskTableMode loader={loader} tasks={tasks} />
          </>
        ) : (
          <>
            <div className=" flex justify-center gap-4">
              <CreateForm setTasks={setTasks} />
              {tasks.length > 0 && (
                <ToolTipWrapper tooltipContent="Table display mode">
                  <Button
                    className=" mt-6"
                    onClick={() => {
                      setTableMode(true);
                    }}
                  >
                    <TableProperties />
                  </Button>
                </ToolTipWrapper>
              )}
            </div>
            <TaskListMode
              loader={loader}
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
