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

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
          </>
        )}
        {unPinnedTasks.length > 0 && pinnedTasks.length > 0 && <Separator />}
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
      </DragDropContext>
    </>
  );
}

export default TaskListMode;
