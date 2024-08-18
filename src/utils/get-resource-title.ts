import { Resource } from "../api/api";

export function getResourceTitle(resource: Resource): string {
  if (resource.category === "films") {
    return resource.title;
  }
  return resource.name;
}
