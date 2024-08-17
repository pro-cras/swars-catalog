import { useSearchAllCategories } from "../../api/api";
import { CategoryResults } from "../category-results/CategoryResults";

export function AllCategories({
  query,
}: {
  query: ReturnType<typeof useSearchAllCategories>;
}) {
  if (query.status === "pending") {
    return <p>Loading...</p>;
  }

  if (query.status === "error") {
    return <p>Error: {query.error.message}</p>;
  }

  if (query.status === "success") {
    return (
      <ul>
        {Object.entries(query.data).map(([category, data]) => (
          <li key={category}>
            <CategoryResults title="category" />
          </li>
        ))}
      </ul>
    );
  }

  query satisfies never;
  return null;
}
