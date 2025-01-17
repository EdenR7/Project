import React from "react";
import TaskList from "./TasksList";
import { TaskItem } from "./TaskItem";
import { Separator } from "../ui/separator";
import { Loader } from "../ui/Loader";
import { Skeleton } from "../ui/skeleton";

function TaskListMode(props) {
  const { tasks, setTasks, pinnedTasks, unPinnedTasks, loader } = props;

  return (
    <>
      {pinnedTasks.length > 0 && (
        <>
          <div className=" my-14 space-y-4 ">
            <h2 className=" text-xl font-semibold underline">Pinned Tasks :</h2>
            {loader ? (
              <Loader amount={pinnedTasks.length ? pinnedTasks.length : 1} />
            ) : (
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
            )}
          </div>
        </>
      )}
      {unPinnedTasks.length > 0 && pinnedTasks.length > 0 && <Separator />}
      {unPinnedTasks.length > 0 && (
        <div className=" my-12 space-y-4">
          <h2 className=" text-xl font-semibold underline">UnPinned Tasks :</h2>
          {loader ? (
            <>
              <Loader
                amount={unPinnedTasks.length ? unPinnedTasks.length : 1}
              />
            </>
          ) : (
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
          )}
        </div>
      )}
    </>
  );
}

export default TaskListMode;
