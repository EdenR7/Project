import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { SnackBarCtxProvider } from "./context/SnackBarContext.jsx";
import { TaskEditContextProvider } from "./context/TaskEditContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <SnackBarCtxProvider>
          <TaskEditContextProvider>
            <App />
          </TaskEditContextProvider>
        </SnackBarCtxProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
