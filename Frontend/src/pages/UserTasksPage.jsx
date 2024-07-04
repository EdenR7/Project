import { TaskItem } from "@/components/userTasks/TaskItem";
import TaskList from "@/components/userTasks/TasksList";
import { UserContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Outlet, useLocation } from "react-router-dom";
import api from "@/services/api.service";

const USER_TASKS_URL = "http://localhost:3000/api/user/tasks";

function UserTasksPage() {
  const { user, userToken } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  const unPinnedTasks = [];
  const pinnedTasks = tasks.filter((task) => {
    if (task.isPinned) {
      return true;
    }
    unPinnedTasks.push(task);
  });

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
        <h1 className=" text-2xl font-semibold">
          Hello {user.username},
          <span>
            {user.tasks.length > 0
              ? " This is your tasks:"
              : " You dont have any tasks yet!"}
          </span>{" "}
        </h1>
        {pinnedTasks.length > 0 && (
          <>
            <div className=" my-14 space-y-4">
              <h2 className=" text-xl font-semibold underline">
                Pinned Tasks :
              </h2>
              <TaskList>
                {pinnedTasks.map((task) => {
                  return (
                    <TaskItem
                      tasks={tasks}
                      setTasks={setTasks}
                      key={task._id}
                      task={task}
                    />
                  );
                })}
              </TaskList>
            </div>
            <Separator />
          </>
        )}

        {unPinnedTasks.length > 0 && (
          <div className=" my-12 space-y-4">
            <h2 className=" text-xl font-semibold underline">
              UnPinned Tasks :
            </h2>
            <TaskList>
              {unPinnedTasks.map((task) => {
                return (
                  <TaskItem
                    tasks={tasks}
                    setTasks={setTasks}
                    key={task._id}
                    task={task}
                  />
                );
              })}
            </TaskList>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default UserTasksPage;
