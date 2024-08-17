export const categories = [
  "people",
  "starships",
  "vehicles",
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

interface ResourceMap {
  people: PeopleBasicProperties;
}

export type Resource<C extends Category> = {
  [key in (typeof resourceLabelMap)[C]]: string;
} & { url: string; category: C } & (C extends keyof ResourceMap
    ? ResourceMap[C]
    : never);

interface PeopleBasicProperties {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
}
