import { Pin } from "lucide-react";
import { ToolTipWrapper } from "../ui/ToolTipWrapper";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export function TaskDetailsCard(props) {
  const { task, handlePinChange, handleTodoChange } = props;

  return (
    <div className=" min-h-80 h-full flex flex-col p-4 px-6 py-14 gap-4">
      <CardHeader className="p-0 ">
        <div className=" flex justify-center gap-4">
          <CardTitle className=" ">{task.title}</CardTitle>
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
        <CardDescription className=" px-1 pt-2 text-center">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex p-1 space-y-2 text-center flex-col items-center">
        <p className=" font-semibold">{task.body}</p>
        <ul className=" flex flex-col gap-2 text-sm">
          {task?.todoList.map((todo) => {
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
