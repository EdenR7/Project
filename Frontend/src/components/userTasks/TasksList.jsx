import React from "react";

function TaskList(props) {
  const { children } = props;
  return (
    <ul className=" justify-items-center grid grid-cols-1 2col:grid-cols-2 3col:grid-cols-3 gap-x-4 gap-y-6 max-w-full">
      {children}
    </ul>
  );
}

export default TaskList;
