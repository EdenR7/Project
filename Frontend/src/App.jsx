import React, { useContext } from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSetupPage from "./pages/UserSetupPage";
import UserTasksPage from "./pages/UserTasksPage";
import DefaultLayout from "./components/general/DefaultLayout";
import { UserContext } from "./context/userContext";

function AuthorizedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return <Navigate to="/auth/userSetup" replace />;
  }
  return children;
}
function UnAuthorizedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/user" />;
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
                <AuthorizedRoute>
                  <ProtectedLayout />
                </AuthorizedRoute>
              }
            >
              <Route index element={<UserTasksPage />} />
            </Route>
          </Route>
          <Route
            path="/auth/userSetup"
            element={
              <UnAuthorizedRoute>
                <UserSetupPage />
              </UnAuthorizedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
