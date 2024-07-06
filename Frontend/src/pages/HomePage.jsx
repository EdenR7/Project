import SnackBar from "@/components/ui/SnackBar";
import { SnackBarContext } from "@/context/SnackBarContext";
import React, { useContext } from "react";

function HomePage() {
  const { snackBar } = useContext(SnackBarContext);
  return (
    <div className="">
      HomePage
      {snackBar.display && <SnackBar />}
    </div>
  );
}

export default HomePage;
