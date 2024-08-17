import { categories } from "../../api/api";
import { CategoryResults } from "../category-results/CategoryResults";

export function AllCategories({ searchTerm }: { searchTerm: string }) {
  return (
    <ul className="flex flex-col gap-6">
      {categories.map((category) => (
        <li key={category}>
          <CategoryResults category={category} searchTerm={searchTerm} />
        </li>
      ))}
    </ul>
  );
}
