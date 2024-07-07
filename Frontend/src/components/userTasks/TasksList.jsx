import React from "react";

function TaskList(props) {
  const { children } = props;
  return (
    <ul className=" justify-items-center grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-6 max-w-full">
      {/* <ul className=" justify-items-center grid grid-cols-2 2col:grid-cols-3 3col:grid-cols-4 gap-x-4 gap-y-6 max-w-full"> */}
      {children}
    </ul>
  );
}

export default TaskList;
