import clsx from "clsx";
import { createElement } from "react";

export function Box({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as: string;
}) {
  return createElement(
    as,
    { className: clsx("bg-black p-10", className) },
    children
  );
}
