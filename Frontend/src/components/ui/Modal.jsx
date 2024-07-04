import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./button";

function Modal({ children, className }) {
  return (
    <>
      <div className=" fixed bg-zinc-800 top-0 left-0 bottom-0 right-0 opacity-50"></div>
      <div
        className={cn(
          "fixed top-1/4 left-1/2 bg-slate-50 min-w-80 w-2/3 z-50 translate-x-[-50%] font-montserrat min-h-400 h-fit rounded-md",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export default Modal;