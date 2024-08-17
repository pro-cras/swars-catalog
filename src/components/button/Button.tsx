import clsx from "clsx";

export function Button({
  href,
  className,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Element = href ? "a" : "button";
  return (
    <Element
      {...rest}
      className={clsx("bg-black rounded-md py-1 px-2 text-white", className)}
    />
  );
}
