import { TaskItem } from "@/components/userTasks/TaskItem";
import TaskList from "@/components/userTasks/TasksList";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const USER_TASKS_URL = "http://localhost:3000/api/user/tasks";

function UserTasksPage() {
  const { user, userToken } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

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
        const res = await axios.get(USER_TASKS_URL, {
          headers: {
            Authorization: userToken,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getAllTasks();
  }, []);

  return (
    <div>
      <h1 className=" text-2xl font-semibold">
        Hello {user.username},
        <span>
          {user.tasks.length > 0
            ? " This is your tasks:"
            : " You dont have any tasks yet!"}
        </span>{" "}
      </h1>
      <div className=" mt-12 space-y-4">
        <h2>Pinned Tasks :</h2>
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
      <div className=" mt-12 space-y-4">
        <h2>UnPinned Tasks :</h2>
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
    </div>
  );
}

export default UserTasksPage;
