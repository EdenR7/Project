import React from "react";
import { Badge } from "./components/ui/badge";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Badge variant="destructive" className="border-black">My Badge</Badge>
    </>
  );
}

export default App;
