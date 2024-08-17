import { useSearchParams } from "react-router-dom";
import { Button } from "../button/Button";
import { useSearchCategory } from "../../api/search-category";
import { DataTable } from "./data-table";
import { Resource } from "../../api/api";
import { useCallback, useMemo, useState } from "react";
import { PeopleDialog } from "../PeopleDialog/PeopleDialog";

export function ResourceTable() {
  const [searchParams] = useSearchParams();
  const query = useSearchCategory({
    query: searchParams.get("search") ?? "",
    category: "people",
  });
  type Data = Resource<"people">;
  const [selectedResource, selectResource] = useState<"new" | Data | null>(
    null,
  );
  const [resourceChanges, setResourceChanges] = useState<
    Map<string, Data | null>
  >(new Map());
  const [customId, setCustomId] = useState<number>(0);
  const saveResource = useCallback(
    (url: string | null, value: Data | null) => {
      setResourceChanges((prev) => {
        const next = new Map(prev);
        let id: string | null = null;
        if (url === null) {
          id = customId.toString();
          setCustomId((id) => id + 1);
        } else {
          id = url;
        }
        next.set(id, value);
        return next;
      });
    },
    [customId],
  );

  const editResource = useCallback((resource: Data) => {
    selectResource(resource);
  }, []);
  const createNewResource = useCallback(() => {
    selectResource("new");
  }, []);
  const localData = useMemo(() => {
    return (query.data?.results ?? [])
      .map((resource) => {
        const savedResource = resourceChanges.get(resource.url);
        return savedResource !== undefined ? savedResource : resource;
      })
      .filter((resource) => !!resource);
  }, [resourceChanges, query.data?.results]);

  function renderContent() {
    if (query.status === "pending") {
      return <p>Loading...</p>;
    }
    if (query.status === "error") {
      return <p>Error: {query.error.message}</p>;
    }
    if (localData.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row-reverse">
          <Button onClick={createNewResource}>Create</Button>
        </div>
        <DataTable
          data={localData}
          onDelete={(url) => saveResource(url, null)}
          onEdit={editResource}
        />
        <PeopleDialog
          onClose={() => selectResource(null)}
          onSubmit={(updatedResource: Data) => {
            saveResource(updatedResource.url, updatedResource);
          }}
          person={selectedResource}
        />
      </div>
    );
  }
  return renderContent();
}
