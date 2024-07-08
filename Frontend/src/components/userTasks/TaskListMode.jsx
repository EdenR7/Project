import React from "react";
import TaskList from "./TasksList";
import { TaskItem } from "./TaskItem";
import { Separator } from "../ui/separator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskListMode(props) {
  const { tasks, setTasks, pinnedTasks, unPinnedTasks } = props;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = Array.from(pinnedTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    const updatedTasks = tasks.map((task) => {
      const reorderedTask = reorderedTasks.find((t) => t._id === task._id);
      return reorderedTask ? reorderedTask : task;
    });

    setTasks(updatedTasks);

    // Update task order in the backend (optional)
    // await api.put('/user/tasks/updateOrder', updatedTasks);
  };

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
