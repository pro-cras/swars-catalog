import { Category, Resource } from "../api/api";

export function getResourceTitle(resource: Resource<Category>): string {
  if (resource.category === "films") {
    return resource.title;
  }
  return resource.name;
}
