import { Category, Resource } from "../../api/api";

const MAX_RESULTS_PER_CATEGORY = 3;

export function CategoryResults<C extends Category>({
  title,
  results,
}: {
  title: string;
  results: Resource<C>[];
}) {
  const resultsToShow = results.slice(0, MAX_RESULTS_PER_CATEGORY);
  return (
    <section className="border-solid border-black border bg-white border-r-4">
      <h2>{title}</h2>
      <ul>
        {resultsToShow.slice(0, MAX_RESULTS_PER_CATEGORY).map((result) => (
          <li key={result.url}>{result.name ?? result.title}</li>
        ))}
      </ul>
    </section>
  );
}
