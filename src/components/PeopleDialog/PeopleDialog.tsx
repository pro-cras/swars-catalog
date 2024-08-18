import React, {
  ComponentProps,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import AppDialog from "../dialog/Dialog";
import { Fieldset, Field, Label } from "@headlessui/react";
import { GenericResource } from "../../api/api";
import clsx from "clsx";
import { Button } from "../button/Button";
import { FieldError, useForm } from "react-hook-form";

export type PeopleFormData = Pick<
  GenericResource<"people">,
  "name" | "height" | "gender"
>;

export function PeopleDialog({
  person,
  onSubmit: _onSubmit,
  onClose,
  ...props
}: Omit<ComponentProps<typeof AppDialog>, "title" | "children" | "onSubmit"> & {
  person: "new" | PeopleFormData | null;
  onSubmit: (person: PeopleFormData) => void;
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

  const defaultValues = useMemo(
    () => (person === "new" || person === null ? {} : person),
    [person],
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PeopleFormData>({
    defaultValues:
      person === "new" || person === null ? undefined : { name: "joe" },
  });
  const onSubmit = useCallback(
    (data: PeopleFormData) => {
      _onSubmit(data);
      onClose(false);
    },
    [_onSubmit, onClose],
  );
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <AppDialog {...props} onClose={onClose} open={!!person} title={title}>
      <Fieldset
        as="form"
        className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <InputLabel label="Name" error={errors.name} />
          <DialogInput
            {...register("name", { required: "This is required" })}
            placeholder="Jabba the Hutt"
            data-autofocus
          />
        </Field>
        <Field>
          <InputLabel label="Height" error={errors.height} />
          <DialogInput
            type="number"
            {...register("height", {
              required: "This is required",
              min: {
                value: 0.000001,
                message: "Must be a positive number",
              },
            })}
            placeholder="198"
          />
        </Field>
        <Field>
          <InputLabel label="Gender" error={errors.gender} />
          <DialogInput
            {...register("gender", {
              required: "This is required",
            })}
            placeholder="male"
          />
        </Field>

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
  JSX.IntrinsicElements["input"] & { error?: FieldError | undefined }
>(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      title={error?.message ?? undefined}
      className={clsx(
        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white placeholder-white/50 placeholder:italic",
        "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
        {
          "outline-red-500 outline-2 data-[focus]:outline-red-500/25": error,
        },
        className,
      )}
    />
  );
});

function InputLabel({ label, error }: { label: string; error?: FieldError }) {
  return (
    <div className="flex flex-row gap-4">
      <DialogLabel>{label}</DialogLabel>
      {error && (
        <span className="text-black underline decoration-red-400">
          {error.message}
        </span>
      )}
    </div>
  );
}
