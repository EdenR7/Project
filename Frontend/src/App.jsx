import React from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSetupPage from "./pages/UserSetupPage";
import UserTasksPage from "./pages/UserTasksPage";
import DefaultLayout from "./components/general/DefaultLayout";

export const userLogged = null;

function ProtectedRoute({ children }) {
  if (userLogged === null) {
    return <Navigate to="/auth/userSetup" />;
  }

  return children;
}
function ProtectedLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <div className=" h-full">
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <ProtectedLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserTasksPage />} />
            </Route>
          </Route>

          <Route path="/auth/userSetup" element={<UserSetupPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
