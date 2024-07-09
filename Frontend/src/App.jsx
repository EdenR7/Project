import React, { useContext } from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserTasksPage from "./pages/UserTasksPage";
import DefaultLayout from "./components/general/DefaultLayout";
import { UserContext } from "./context/UserContext";
import TaskDetails from "./pages/TaskDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./components/general/AuthLayout";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";

function AuthorizedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return <Navigate to="/auth" replace />;
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
function ProtectedLayout() { // wrap all this routes with the protected layout
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="/user"
              element={
                <AuthorizedRoute>
                  <ProtectedLayout />
                </AuthorizedRoute>
              }
            >
              <Route index element={<UserTasksPage />} />
              <Route path="task/:id" element={<UserTasksPage />}>
                <Route index element={<TaskDetails />} />
              </Route>
            </Route>
          </Route>
          <Route
            path="/auth"
            element={
              <UnAuthorizedRoute>
                <AuthLayout />
              </UnAuthorizedRoute>
            }
          >
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

// footer
// contact about and terms page
// Home page
// orginze code

export default App;
