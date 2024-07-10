import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pin, PinOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ui/ThemeProvider";

const columns = [
  {
    accessorKey: "Todos Status",
    header: () => "Todos Status",
    cell: ({ row }) => (
      <div className="lowercase px-4">
        {row.original.todoList.length
          ? `${row.original.todoList.reduce((acc, item) => {
              if (item.isComplete) {
                acc += 1;
              }
              return acc;
            }, 0)}` +
            " / " +
            `${row.original.todoList.length}`
          : "---"}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "isPinned",
    header: () => "Pinned",
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("isPinned") ? (
          <Pin color="#2563EB" />
        ) : (
          <PinOff color="#d4d4d4" />
        )}
      </div>
    ),
  },
];

export function TaskTableMode({ tasks: data }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  function moveToTaskPage(_id) {
    navigate(`task/${_id}`);
  }

  return (
    <div className="w-full my-14">
      <div className="rounded-md border">
        <h2 className=" mx-auto w-fit mt-4 font-bold">
          Total: {data.length} Tasks
        </h2>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="font-semibold" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const taskColor = row.original.bgColor;
                console.log(taskColor);

                let taskBg = "bg-background";
                if (taskColor !== "white") {
                  if (theme === "dark") {
                    taskBg = `bg-${taskColor}-800`;
                  } else {
                    taskBg = `bg-${taskColor}-200`;
                  }
                }
                return (
                  <TableRow
                    className={` cursor-pointer ${taskBg}`}
                    onClick={() => {
                      moveToTaskPage(row.original._id);
                    }}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
