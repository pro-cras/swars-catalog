import { ComponentProps, forwardRef, useCallback, useMemo } from "react";
import AppDialog from "../dialog/Dialog";
import { Fieldset, Field, Label } from "@headlessui/react";
import { Resource } from "../../api/api";
import clsx from "clsx";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";

type FormData = Resource<"people">;

export function PeopleDialog({
  person,
  onSubmit: _onSubmit,
  onClose,
  ...props
}: Omit<ComponentProps<typeof AppDialog>, "title" | "children"> & {
  person: "new" | FormData | null;
  onSubmit: (person: FormData) => void;
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    ...(person === "new" || person === null
      ? {}
      : { defaultValues: { name: "Joe" } }),
  });
  const onSubmit = useCallback(
    (data: FormData) => {
      _onSubmit(data);
      onClose(false);
    },
    [_onSubmit, onClose],
  );

  return (
    <AppDialog {...props} onClose={onClose} open={!!person} title={title}>
      <Fieldset
        as="form"
        className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <DialogLabel> Name</DialogLabel>
          <DialogInput {...register("name")} autoFocus />
        </Field>
        <Field>
          <DialogLabel> Height </DialogLabel>
          <DialogInput type="number" {...register("height")} />
        </Field>
        <Field>
          <DialogLabel> Gender </DialogLabel>
          <DialogInput {...register("gender")} />
        </Field>

        {errors && JSON.stringify(errors, null, 2)}

        <div className="flex justify-between">
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
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

const DialogInput = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
        className,
      )}
    />
  );
});
