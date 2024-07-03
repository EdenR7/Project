import { userLogged } from "@/App";
import { UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDemo } from "../ui/AvatarDemo";

export default function MainNavBar() {
  return (
    <>
      <nav className=" font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-white">
        <ul className=" flex gap-2 justify-between items-center">
          <li>
            <Link to="/">LOGO</Link>
          </li>
          <li className=" ">
            {userLogged ? (
              <Link to="/user">
                <AvatarDemo />
                {userLogged}
              </Link>
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
