import React from "react";
import { Badge } from "./components/ui/badge";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSetupPage from "./pages/UserSetupPage";

export function MainNavBar() {
  return (
    <>
      <nav className=" font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-white">
        <ul className=" flex gap-2 justify-between items-center">
          <li>
            <Link to="/">LOGO</Link>
          </li>
          <li className=" flex gap-2">
            <Link to="/blah">BLAH</Link>
            <Link>BLAH2</Link>
            <Link to="/userSetup">Sign In</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export function MainLayout() {
  return (
    <>
      <MainNavBar />
      <div className=" font-montserrat px-6 ">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div className=" h-full">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blah" element={<div>cla</div>} />
          </Route>

          <Route path="/userSetup" element={<UserSetupPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
