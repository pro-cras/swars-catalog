import clsx from "clsx";
import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(`grid h-screen max-w-full`, styles.shell)}>
      {children}
    </div>
  );
}
