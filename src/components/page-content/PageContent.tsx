import clsx from "clsx";

export function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={clsx("bg-white p-10 flex gap-8", className)}>
      {children}
    </main>
  );
}
