import { Pin } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ToolTipWrapper } from "../ui/ToolTipWrapper";

export function TaskCard(props) {
  const { task, moveToTaskPage, handlePinChange, handleTodoChange } = props;
  return (
    <div
      className=" flex flex-col gap-4 cursor-pointer "
      onClick={moveToTaskPage}
    >
      <CardHeader className="p-0 ">
        <div className=" flex justify-between">
          <CardTitle className=" w-[90%] text-xl">{task.title}</CardTitle>
          <ToolTipWrapper
            tooltipContent={`${
              task.isPinned ? "Remove from pin tasks" : "Pin this task"
            }`}
          >
            <Pin
              onClick={handlePinChange}
              color={task.isPinned ? "#2563EB" : "#d4d4d4"}
              strokeWidth={task.isPinned ? "1.75" : "0.75"}
              className="cursor-pointer min-w-5 min-h-5"
            />
          </ToolTipWrapper>
        </div>
        <CardDescription className=" px-1 text-sm ">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className=" p-1 space-y-2">
        <ul className=" flex flex-col gap-2 text-xs mx-2 p-1">
          {task.todoList.map((todo) => {
            return (
              <li className=" flex items-center gap-2" key={todo._id}>
                <Checkbox
                  id={todo._id}
                  checked={todo.isComplete}
                  onClick={handleTodoChange}
                />
                <label
                  htmlFor={todo._id}
                  className={`${
                    todo.isComplete && " line-through text-gray-500"
                  } cursor-pointer`}
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                >
                  {todo.title}
                </label>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </div>
  );
}
