import { Category, Resource } from "../api/api";

export function getResourceTitle<C extends Category>(
  resource: Resource<C>,
): string {
  if (resource.category === "films") {
    return resource.title;
  }
  return resource.name;
}
