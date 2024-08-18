import { Button } from "../button/Button";
import { useSearchCategory } from "../../api/search-category";
import { DataTable } from "./data-table";
import { Resource } from "../../api/api";
import { useCallback, useMemo, useState } from "react";
import { PeopleDialog } from "../PeopleDialog/PeopleDialog";
import { useSearchTermParam } from "../../utils/use-search-term-param";

const CUSTOM_ID_PREFIX = "custom/";
function isCustomId(id: string): boolean {
  return id.startsWith(CUSTOM_ID_PREFIX);
}
export function ResourceTable() {
  const searchTerm = useSearchTermParam();
  const query = useSearchCategory({
    query: searchTerm ?? "",
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
    (
      args:
        | { url: null; data: Omit<Data, "url" | "category"> } // create
        | { url: string; data: Partial<Data> } // update
        | { url: string; data: null }, // delete
    ) => {
      setResourceChanges((prev) => {
        const next = new Map(prev);
        if (args.url === null) {
          // create
          const id = customId.toString();
          setCustomId((id) => id + 1);
          next.set(id, {
            ...args.data,
            url: CUSTOM_ID_PREFIX + id,
            category: "people",
          });
        } else if (args.data === null) {
          // delete
          next.set(args.url, null);
        } else {
          // update
          next.set(args.url, { ...prev.get(args.url)!, ...args.data });
        }
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
    return [
      ...(query.data?.results ?? []),
      ...[...resourceChanges.values()]
        .filter((item) => !!item)
        .filter((item) => isCustomId(item.url)),
    ]
      .map((resource) => {
        const savedResourceChanges = resourceChanges.get(resource.url);
        function resolveResourceChanges() {
          switch (savedResourceChanges) {
            case undefined: // no changes
              return resource;
            case null: // deleted
              return null;
            default: // updated
              return { ...resource, ...savedResourceChanges };
          }
        }
        const newValue = resolveResourceChanges();
        return newValue;
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
          onDelete={(url) => saveResource({ url, data: null })}
          onEdit={editResource}
        />
        <PeopleDialog
          onClose={() => selectResource(null)}
          onSubmit={(formData: Data) => {
            if (selectedResource === "new") {
              saveResource({ url: null, data: formData });
            } else if (selectedResource !== null) {
              saveResource({ url: selectedResource.url, data: formData });
            }
          }}
          person={selectedResource}
        />
      </div>
    );
  }
  return renderContent();
}
