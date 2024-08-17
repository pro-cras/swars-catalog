import { Category, useSearchCategory } from "../../api/api";
import { getResourceTitle } from "../../utils/get-resource-title";
import { titleCase } from "../../utils/title-case";
import { Button } from "../button/Button";

const MAX_RESULTS_PER_CATEGORY = 3;

export function CategoryResults<C extends Category>({
  category,
  searchTerm,
}: {
  category: C;
  searchTerm: string;
}) {
  const query = useSearchCategory({ query: searchTerm, category });
  function renderContent() {
    if (query.status === "pending") {
      return <p>Loading...</p>;
    }
    if (query.status === "error") {
      return <p>Error: {query.error.message}</p>;
    }
    if (query.data.results.length === 0) {
      return <p>No results found</p>;
    }
    return (
      <ul className="flex flex-col gap-2">
        {query.data.results.slice(0, MAX_RESULTS_PER_CATEGORY).map((result) => (
          <li key={result.url}>{getResourceTitle(result)}</li>
        ))}
      </ul>
    );
  }

  return (
    <section className="border-solid border-black border bg-white rounded-md p-4 relative">
      <h2 className="absolute top-0 left-4 -translate-y-1/2 bg-[white] pl-[5px] pr-[5px]">
        {titleCase(category)}
      </h2>
      {renderContent()}
      {(query.data?.results ?? []).length > 0 && (
        <Button className="absolute right-2 bottom-0 foo -translate-x-1 translate-y-1/2">
          View All
        </Button>
      )}
    </section>
  );
}
