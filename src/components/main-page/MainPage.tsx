import { Field, Label, Input } from "@headlessui/react";
import { Header } from "../header/Header";
import { useState } from "react";
import { Shell } from "../shell/Shell";
import { useDebounce } from "../../utils/use-debounce";
import { useSearchAllCategories } from "../../api/api";
import { PageContent } from "../page-content/PageContent";

export function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const query = useSearchAllCategories({
    query: debouncedSearchTerm,
  });
  return (
    <Shell>
      <Header>
        <Field className="flex gap-4">
          <Label className="text-white">Search</Label>
          <Input
            autoFocus
            className="px-2"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </Field>
      </Header>
      <PageContent>
        {query.isLoading ? (
          <p>Loading...</p>
        ) : query.isError ? (
          <p>Error: {query.error.message}</p>
        ) : (
          <ul>
            {query.data.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        )}
      </PageContent>
    </Shell>
  );
}
