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

export type GenericResource<C extends Category> = {
  url: string;
  category: C;
} & ResourceMap[C];

export type Resource =
  | GenericResource<"people">
  | GenericResource<"starships">
  | GenericResource<"vehicles">
  | GenericResource<"planets">
  | GenericResource<"species">
  | GenericResource<"films">;

interface PeopleBasicProperties {
  name: string;
  height: string;
  // mass: string;
  // hair_color: string;
  // skin_color: string;
  // eye_color: string;
  // birth_year: string;
  gender: string;
  // created: string;
  // edited: string;
}
