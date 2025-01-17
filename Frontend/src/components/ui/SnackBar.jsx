import React, { useContext, useEffect } from "react";
import { Button } from "./button";
import { SnackBarContext } from "@/context/SnackBarContext";
import { CircleCheckBig, CircleX, X } from "lucide-react";

function SnackBar() {
  const { snackBar, setSnackBar, displaySnackBar, closeSnackBar } =
    useContext(SnackBarContext);
  useEffect(() => {
    setTimeout(() => {
      if (!snackBar.closeManually) {
        closeSnackBar();
      }
    }, 2000);
  }, [snackBar]);

  return (
    <div
      className={`${
        snackBar.display ? "" : "hidden"
      } fixed bottom-2 right-2 z-50 w-1/2 max-w-72 bg-green-300 px-4 py-3 rounded-md ${
        snackBar.type === "danger" && "bg-red-300"
      }`}
    >
      <div className=" flex items-center gap-2 mt-2 mb-1">
        {snackBar.type === "danger" ? (
          <CircleX className=" text-xl w-10 text-red-600" />
        ) : (
          <CircleCheckBig className=" text-xl w-10 text-green-600" />
        )}

        <div className=" flex flex-col">
          <h3 className=" text-sm text-background font-bold">
            {snackBar.label}
          </h3>
          <p className=" text-background text-xs">{snackBar.context}</p>
        </div>
      </div>

      {snackBar.closeManually ? (
        <Button
          className={
            " absolute top-0 right-0  text-background transition-all hover:scale-110 hover:text-gray-600"
          }
          variant="naked"
          onClick={() => {
            closeSnackBar();
          }}
        >
          <X size={14} />
        </Button>
      ) : null}
    </div>
  );
}

export default SnackBar;
