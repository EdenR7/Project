import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function MyProgressBar({ completedTodos, totalTodos }) {
  // const [progress, setProgress] = React.useState(0);
  const progressValue = (completedTodos / totalTodos) * 100;

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(progressValue), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div className=" w-full relative overflow-hidden h-4">
        <Progress value={progressValue} className="w-[70%] h-full" />
        <div className="absolute -top-1 left-[33%] font-semibold">
          <span className="text-sm">{completedTodos}</span>/
          <span className="text-sm">{totalTodos}</span>
        </div>
      </div>
    </>
  );
}
