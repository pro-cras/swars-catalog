import { Field, Label, Input } from "@headlessui/react";
import { Header } from "../header/Header";
import { useState } from "react";
import { Shell } from "../shell/Shell";

export function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  //   const queryClient = new QueryClient();
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
    </Shell>
  );
}
