"use client";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../button/Button";
import { GenericResource } from "../../api/api";

type Data = GenericResource<"people">;
const columnHelper = createColumnHelper<Data>();

export function DataTable({
  data,
  onDelete,
  onEdit,
}: {
  data: Data[];
  onDelete: (url: string) => void;
  onEdit: (value: Data) => void;
}) {
  const columns: ColumnDef<Data>[] = [
    {
      accessorFn: (row) => row.name,
      header: "Name",
    },
    {
      accessorFn: (row) => row.height,
      header: "Height",
    },
    {
      accessorFn: (row) => row.gender,
      header: "Gender",
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <RowActions
          onDelete={() => onDelete(props.row.original.url)}
          onEdit={() => onEdit(props.row.original)}
        />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-black rounded-md border p-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function RowActions({
  onDelete,
  onEdit,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2">
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
