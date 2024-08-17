import { skipToken, useQuery } from "@tanstack/react-query";

export const categories = [
  "starships",
  "vehicles",
  "people",
  "planets",
  "species",
  "films",
] as const;

export type Category = (typeof categories)[number];

const resourceLabelMap = {
  starships: "name",
  vehicles: "name",
  people: "name",
  planets: "name",
  species: "name",
  films: "title",
} as const;

export type Resource<C extends Category> = {
  [key in (typeof resourceLabelMap)[C]]: string;
} & { url: string; category: C };

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

export function useSearchCategory({
  query,
  category,
}: {
  query: string;
  category: Category;
}) {
  return useQuery({
    queryKey: ["category", category, query],
    queryFn: query
      ? () => {
          console.log({ category });
          return searchCategory(category, query);
        }
      : skipToken,
  });
}
