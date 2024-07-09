import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { SnackBarCtxProvider } from "./context/SnackBarContext.jsx";
import { TaskEditContextProvider } from "./context/TaskEditContext.jsx";
import { ThemeProvider } from "./components/ui/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SnackBarCtxProvider>
          <UserContextProvider>
            <TaskEditContextProvider>
              <App />
            </TaskEditContextProvider>
          </UserContextProvider>
        </SnackBarCtxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
