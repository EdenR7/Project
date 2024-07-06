import { createContext, useState } from "react";

export const TaskEditContext = createContext(false);

export function TaskEditContextProvider({ children }) {
  const [editMode, setEditMode] = useState(false);
  function moveToEditMode() {
    setEditMode(true);
  }

  function removeEditMode() {
    setEditMode(false);
  }

  return (
    <TaskEditContext.Provider
      value={{ editMode, moveToEditMode, removeEditMode }}
    >
      {children}
    </TaskEditContext.Provider>
  );
}
