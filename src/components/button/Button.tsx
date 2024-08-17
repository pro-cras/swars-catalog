import clsx from "clsx";

export function Button({
  className,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Element = props.href ? "a" : "button";
  return (
    <Element
      {...props}
      className={clsx("bg-black rounded-md py-1 px-2 text-white", className)}
    />
  );
}
