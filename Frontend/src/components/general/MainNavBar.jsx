import { LogIn, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDemo } from "../ui/AvatarDemo";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
// import { DropdownMenuCheckboxes } from "../ui/myDropDownMenu";
import { Button } from "../ui/button";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
import { ModeToggle } from "../ui/ModeToggle";

export default function MainNavBar() {
  const { user, logoutUser } = useContext(UserContext);
  return (
    <>
      <nav className=" z-40 font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-background dark:border-b dark:border-gray-200 break-950px:px-16">
        <ul className=" flex gap-2 justify-between items-center">
          <li>
            <Link to="/">TaskEase</Link>
          </li>
          {user && (
            <li className=" hidden sm:inline">
              {user.tasks.length ? (
                <p>
                  Hello <span className=" font-semibold">{user.username} </span>
                  , you have{" "}
                  <span className=" font-semibold">{user.tasks.length}</span>{" "}
                  tasks to complete!
                </p>
              ) : (
                <p>
                  Hi <span className=" font-semibold">{user.username} </span>{" "}
                  you dont have any task right now!
                </p>
              )}
            </li>
          )}
          <li className=" flex items-center gap-2">
            {user ? (
              <MyDropDownMenu
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
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-1"
                    >
                      <span>Logout</span>
                      <span>
                        <LogIn size={16} />
                      </span>
                    </button>
                  </DropdownMenuCheckboxItem>,
                ]}
                label={`Hello ${user.username}!`}
              />
            ) : (
              <Link to="/auth" className="flex gap-2 items-center">
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
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
