import { useQuery, skipToken } from "@tanstack/react-query";
import { Category, Resource } from "./api";

async function searchCategory<C extends Category>(category: C, query: string) {
  const response = await fetch(
    `https://swapi.dev/api/${category}/?search=${query}`,
  );
  const rawData: { results: Omit<Resource<C>, "category">[] } =
    await response.json();
  const data = {
    ...rawData,
    results: rawData.results.map((item) => ({
      ...item,
      category,
    })) as Resource<C>[],
  };

  return data;
}

export function useSearchCategory<C extends Category>({
  query,
  category,
}: {
  query: string;
  category: C;
}) {
  return useQuery({
    queryKey: ["category", category, query],
    queryFn: query
      ? () => {
          return searchCategory(category, query);
        }
      : skipToken,
  });
}
