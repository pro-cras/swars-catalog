import { ColumnDef } from "@tanstack/react-table";
import { Resource } from "../../api/api";

export const columns: ColumnDef<Resource<"people">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
];
