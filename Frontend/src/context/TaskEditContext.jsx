import { createContext, useState } from "react";

export const TaskEditContext = createContext(false);

export function TaskEditContextProvider({ children }) {
  const [editMode, setEditMode] = useState(() => {
    const storedValue = sessionStorage.getItem("editMode");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  function moveToEditMode() {
    setEditMode(true);
    sessionStorage.setItem("editMode", JSON.stringify(true));
  }

  function removeEditMode() {
    setEditMode(false);
    sessionStorage.removeItem("editMode");
  }

  return (
    <TaskEditContext.Provider
      value={{ editMode, moveToEditMode, removeEditMode }}
    >
      {children}
    </TaskEditContext.Provider>
  );
}
