import clsx from "clsx";
import styles from "./Shell.module.css";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(`grid h-screen max-w-full`, styles.shell)}>
      {children}
    </div>
  );
}
