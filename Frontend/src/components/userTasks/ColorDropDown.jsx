import React from "react";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { Palette } from "lucide-react";

function ColorDropDown({ updateTask }) {
  return (
    <MyDropDownMenu
      triggerElement={
        <DropdownMenuCheckboxItem className="">
          <p className=" flex gap-1 items-center text-sm cursor-pointer">
            Add color <Palette size={14} />
          </p>
        </DropdownMenuCheckboxItem>
      }
      dropDownItems={[
        <DropdownMenuCheckboxItem className="">
          <div
            className=" flex gap-2 items-center text-sm cursor-pointer"
            onClick={() => {
              updateTask({ bgColor: "blue" });
            }}
          >
            Blue <div className="bg-blue-500 h-3 w-3 rounded-full"></div>
          </div>
        </DropdownMenuCheckboxItem>,
        <DropdownMenuCheckboxItem className="">
          <div
            className=" flex gap-2 items-center text-sm cursor-pointer"
            onClick={() => {
              updateTask({ bgColor: "red" });
            }}
          >
            Red <div className="bg-red-500 h-3 w-3 rounded-full"></div>
          </div>
        </DropdownMenuCheckboxItem>,
        <DropdownMenuCheckboxItem className="">
          <div
            className=" flex gap-2 items-center text-sm cursor-pointer"
            onClick={() => {
              updateTask({ bgColor: "green" });
            }}
          >
            Green <div className="bg-green-500 h-3 w-3 rounded-full"></div>
          </div>
        </DropdownMenuCheckboxItem>,
        <DropdownMenuCheckboxItem className="">
          <div
            className=" flex gap-2 items-center text-sm cursor-pointer"
            onClick={() => {
              updateTask({ bgColor: "purple" });
            }}
          >
            Purple <div className="bg-purple-500 h-3 w-3 rounded-full"></div>
          </div>
        </DropdownMenuCheckboxItem>,
        <DropdownMenuCheckboxItem className="">
          <div
            className=" flex gap-2 items-center text-sm cursor-pointer"
            onClick={() => {
              updateTask({ bgColor: "white" });
            }}
          >
            Default <div className="bg-background h-4 w-4 rounded-full border-2"></div>
          </div>
        </DropdownMenuCheckboxItem>,
      ]}
      label="Pick A Color"
    />
  );
}

export default ColorDropDown;
