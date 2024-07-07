import React from "react";
import TaskList from "./TasksList";
import { TaskItem } from "./TaskItem";
import { Separator } from "../ui/separator";

function TaskListMode(props) {
  const { tasks, setTasks, pinnedTasks, unPinnedTasks } = props;
  return (
    <>
      {pinnedTasks.length > 0 && (
        <>
          <div className=" my-14 space-y-4">
            <h2 className=" text-xl font-semibold underline">Pinned Tasks :</h2>
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
        </>
      )}
      {unPinnedTasks.length > 0 && pinnedTasks.length > 0 && <Separator />}
      {unPinnedTasks.length > 0 && (
        <div className=" my-12 space-y-4">
          <h2 className=" text-xl font-semibold underline">UnPinned Tasks :</h2>
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
    </>
  );
}

export default TaskListMode;
