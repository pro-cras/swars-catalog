import { useSearchParams } from "react-router-dom";
import { Button } from "../button/Button";
import { useSearchCategory } from "../../api/search-category";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function ResourceTable<C extends "people">({
  category,
}: {
  category: C;
}) {
  const [searchParams] = useSearchParams();
  const query = useSearchCategory({
    query: searchParams.get("search") ?? "",
    category,
  });

  function renderContent() {
    if (query.status === "pending") {
      return <p>Loading...</p>;
    }
    if (query.status === "error") {
      return <p>Error: {query.error.message}</p>;
    }
    if (query.data.results.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row-reverse">
          <Button>Create</Button>
        </div>
        <DataTable columns={columns} data={query.data.results} />
      </div>
    );
  }
  return renderContent();
}
