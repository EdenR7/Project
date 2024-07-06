import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";

export default function DefaultLayout() {
  return (
    <>
      <MainNavBar />
      <div className=" font-montserrat px-6 break-950px:px-16">
        <Outlet />
      </div>
    </>
  );
}
