import { useCallback, useMemo, useState } from "react";
import { Category, GenericResource } from "../api/api";
import { useSearchCategory } from "../api/search-category";
import { useSearchTermParam } from "./use-search-term-param";
import { PeopleFormData } from "../components/PeopleDialog/PeopleDialog";

const CUSTOM_ID_PREFIX = "custom/";
function isCustomId(id: string): boolean {
  return id.startsWith(CUSTOM_ID_PREFIX);
}

export function useSearchWithLocalChanges<C extends Category>(category: C) {
  const searchTerm = useSearchTermParam();
  const query = useSearchCategory({
    query: searchTerm ?? "",
    category,
  });

  type Data = GenericResource<"people">;

  const [resourceChanges, setResourceChanges] = useState<
    Map<string, Data | null>
  >(new Map());
  const [customId, setCustomId] = useState<number>(0);
  const saveResource = useCallback(
    (
      args:
        | { url: null; data: Omit<PeopleFormData, "url" | "category"> } // create
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

  const newQuery = useMemo(() => {
    return {
      status: query.status,
      data: localData,
      error: query.error,
    };
  }, [localData, query.error, query.status]);

  return {
    query: newQuery,
    save: saveResource,
  };
}
