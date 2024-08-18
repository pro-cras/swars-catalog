import { Button } from "../button/Button";
import { DataTable } from "./data-table";
import { Resource } from "../../api/api";
import { useCallback, useState } from "react";
import { PeopleDialog } from "../PeopleDialog/PeopleDialog";
import { useSearchWithLocalChanges } from "../../utils/use-search-with-local-changes";

type Data = Resource<"people">;

export function ResourceTable() {
  const [selectedResource, selectResource] = useState<"new" | Data | null>(
    null,
  );
  const closeDialog = useCallback(() => {
    selectResource(null);
  }, []);
  const editResource = useCallback((resource: Data) => {
    selectResource(resource);
  }, []);
  const createNewResource = useCallback(() => {
    selectResource("new");
  }, []);

  const { query, save } = useSearchWithLocalChanges("people");

  function renderContent() {
    if (query.status === "pending") {
      return <p>Loading...</p>;
    }
    if (query.status === "error") {
      return <p>Error: {query.error?.message}</p>;
    }
    if (query.data.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row-reverse">
          <Button onClick={createNewResource}>Create</Button>
        </div>
        <DataTable
          data={query.data}
          onDelete={(url) => save({ url, data: null })}
          onEdit={editResource}
        />
        <PeopleDialog
          onClose={closeDialog}
          onSubmit={(formData: Data) => {
            if (selectedResource === "new") {
              save({ url: null, data: formData });
            } else if (selectedResource !== null) {
              save({ url: selectedResource.url, data: formData });
            }
          }}
          person={selectedResource}
        />
      </div>
    );
  }
  return renderContent();
}
