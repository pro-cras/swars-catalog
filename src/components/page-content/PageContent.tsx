import clsx from "clsx";

export function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={clsx("bg-white p-10", className)}>{children}</main>;
}
