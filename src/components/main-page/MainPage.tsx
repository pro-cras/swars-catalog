import { Field, Label, Input } from "@headlessui/react";
import { Header } from "../header/Header";
import { useState } from "react";
import { useDebounce } from "../../utils/use-debounce";
import { PageContent } from "../page-content/PageContent";
import { AllCategories } from "../all-categories/AllCategories";

export function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <>
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
        {debouncedSearchTerm && (
          <AllCategories searchTerm={debouncedSearchTerm} />
        )}
      </PageContent>
    </>
  );
}
