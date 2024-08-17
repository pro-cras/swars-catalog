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
