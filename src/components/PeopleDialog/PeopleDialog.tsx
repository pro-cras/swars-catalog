import { ComponentProps, useMemo } from "react";
import AppDialog from "../dialog/Dialog";
import { Fieldset, Field, Label, Input } from "@headlessui/react";
import { Resource } from "../../api/api";
import clsx from "clsx";
import { Button } from "../button/Button";

export function PeopleDialog({
  person,
  onSubmit,
  ...props
}: Omit<ComponentProps<typeof AppDialog>, "title" | "children"> & {
  person: "new" | Resource<"people"> | null;
  onSubmit: (person: Resource<"people">) => void;
}) {
  const title = useMemo(() => {
    if (!person) {
      return "";
    }
    if (person === "new") {
      return "Create person";
    }
    return `Edit person: ${person.name}`;
  }, [person]);

  return (
    <AppDialog {...props} open={!!person} title={title}>
      <Fieldset
        as="form"
        className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.currentTarget);
          props.onClose(false);
        }}
      >
        <Field>
          <DialogLabel> Name</DialogLabel>
          <DialogInput name="name" autoFocus />
        </Field>
        <Field>
          <DialogLabel> Height </DialogLabel>
          <DialogInput name="height" type="number" />
        </Field>
        <Field>
          <DialogLabel> Gender </DialogLabel>
          <DialogInput name="gender" type="text" />
        </Field>

        <div className="flex justify-between">
          <Button onClick={() => props.onClose(true)}>Cancel</Button>
          <Button type="submit">Order now</Button>
        </div>
      </Fieldset>
    </AppDialog>
  );
}

function DialogLabel(props: { children: React.ReactNode }) {
  return (
    <Label className="text-sm/6 font-medium text-white">{props.children}</Label>
  );
}

function DialogInput({
  className,
  ...props
}: ComponentProps<typeof Input> & JSX.IntrinsicElements["input"]) {
  return (
    <Input
      {...props}
      className={clsx(
        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
        className,
      )}
    />
  );
}
