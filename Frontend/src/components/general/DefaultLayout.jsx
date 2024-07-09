import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import Footer from "./Footer";

export default function DefaultLayout() {
  return (
    <>
      <div className=" flex flex-col h-screen">
        <MainNavBar />
        <div className=" flex-1 font-montserrat px-6 break-950px:px-16">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
