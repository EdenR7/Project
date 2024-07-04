import { UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDemo } from "../ui/AvatarDemo";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { DropdownMenuCheckboxes } from "../ui/myDropDownMenu";
import { Button } from "../ui/button";

export default function MainNavBar() {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <>
      <DropdownMenuCheckboxes />
      <nav className=" z-40 font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-white">
        <ul className=" flex gap-2 justify-between items-center">
          <li>
            <Link to="/">LOGO</Link>
          </li>
          <li className=" flex items-center gap-2">
            {user ? (
              <DropdownMenuCheckboxes
                className=" font-montserrat"
                triggerElement={
                  <Link>
                    <AvatarDemo />
                  </Link>
                }
                dropDownItems={[
                  <DropdownMenuCheckboxItem className="">
                    <Link to="/user">MyTasks</Link>
                  </DropdownMenuCheckboxItem>,
                  <DropdownMenuCheckboxItem className=" text-red-500 font-semibold hover:text-red-600 cursor-pointer hover:bg-slate-50">
                    <button onClick={logoutUser}>Logout</button>
                  </DropdownMenuCheckboxItem>,
                ]}
                label={user.username}
              />
            ) : (
              <Link to="/auth/userSetup" className="flex gap-2 items-center">
                <span>Sign In</span>{" "}
                <span className=" bg-gray-300 p-1 rounded-full">
                  <UserRoundCog
                    size={16}
                    strokeWidth={1.25}
                    absoluteStrokeWidth
                  />{" "}
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
