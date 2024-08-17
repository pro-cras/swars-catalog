import { useQuery } from "@tanstack/react-query";

const categories = [
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

async function searchResource<C extends Category>(category: C, query: string) {
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

export function useSearchAllCategories({ query }: { query: string }) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      type Tuple<C extends Category> = [C, Promise<{ results: Resource<C>[] }>];
      const searches = new Map(
        categories.map(
          (category) =>
            [category, searchResource(category, query)] satisfies Tuple<
              typeof category
            >,
        ),
      );
      await Promise.all(searches.values());
      return Object.fromEntries(searches);
    },
  });
}
