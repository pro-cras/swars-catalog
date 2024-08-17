import { useSearchParams } from "react-router-dom";
import { Button } from "../button/Button";
import { useSearchCategory } from "../../api/search-category";
import { DataTable } from "./data-table";
import { Resource } from "../../api/api";
import { useCallback, useMemo, useState } from "react";
import { PeopleDialog } from "../PeopleDialog/PeopleDialog";

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
  const [selectedResource, selectResource] = useState<
    "new" | Resource<C> | null
  >(null);
  const [editedResources, setEditedResources] = useState<
    Map<string, Resource<C> | null>
  >(new Map());
  const saveResource = useCallback((url: string, value: Resource<C> | null) => {
    setEditedResources((prev) => {
      const next = new Map(prev);
      next.set(url, value);
      return next;
    });
  }, []);

  const editResource = useCallback((resource: Resource<C>) => {
    selectResource(resource);
  }, []);
  const createNewResource = useCallback(() => {
    selectResource("new");
  }, []);
  const localData = useMemo(() => {
    return (query.data?.results ?? []).map(
      (resource) => editedResources.get(resource.url) ?? resource,
    );
  }, [editedResources, query.data?.results]);

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
          <Button>Create</Button>
        </div>
        <DataTable
          data={localData}
          onDelete={(url) => saveResource(url, null)}
          onEdit={(url, value) => saveResource(url, value)}
        />
        <PeopleDialog
          onClose={() => selectResource(null)}
          onSubmit={() => {}}
          person={selectedResource}
        />
      </div>
    );
  }
  return renderContent();
}
