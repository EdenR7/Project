import { createContext, useState } from "react";

export const SnackBarContext = createContext({
  snackBar: {
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    type: "",
  },
  setSnackBar: () => {},
  displaySnackBar: () => {},
  closeSnackBar: () => {},
});

export function SnackBarCtxProvider({ children }) {
  const [snackBar, setSnackBar] = useState({
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    type: "succsess",
  });

  function displaySnackBar(props) {
    const { label, context, closeManually, className, type } = props;
    setSnackBar((prev) => ({
      ...prev,
      display: true,
      label: label || "",
      context: context || "",
      closeManually: closeManually || false,
      className: className || prev.className,
      type: type || "success",
    }));
  }

  function closeSnackBar() {
    setSnackBar((prev) => {
      return { ...prev, display: false, type: "success", closeManually: false };
    });
  }

  return (
    <SnackBarContext.Provider
      value={{ snackBar, setSnackBar, displaySnackBar, closeSnackBar }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}
