export const categories = [
  "people",
  "starships",
  "vehicles",
  "planets",
  "species",
  "films",
] as const;

export type Category = (typeof categories)[number];

interface BasicResourceWithName {
  name: string;
}

interface ResourceMap {
  people: PeopleBasicProperties;
  starships: BasicResourceWithName;
  vehicles: BasicResourceWithName;
  planets: BasicResourceWithName;
  species: BasicResourceWithName;
  films: { title: string };
}

export type Resource<C extends Category> = {
  url: string;
  category: C;
} & ResourceMap[C];

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

const film: Resource<Category> = {
  // title: "A New Hope",
  name: "A New Hope",
  url: "https://swapi.dev/api/films/1/",
  category: "people",
};
console.log({ film });
