import { useCallback, useMemo, useState } from "react";
import { Category, Resource } from "../api/api";
import { useSearchCategory } from "../api/search-category";

export function useSearchWithLocalChanges<C extends Category>(
  category: C,
  searchTerm: string,
) {
  const query = useSearchCategory({
    query: searchTerm ?? "",
    category: "people",
  });

  const [resourceChanges, setResourceChanges] = useState<
    Map<string, Resource<C> | null>
  >(new Map());

  const [customId, setCustomId] = useState<number>(0);

  const updateResource = useCallback((resource: Resource<C>) => {
    selectResource(resource);
  }, []);
  const createResource = useCallback(() => {
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
}
