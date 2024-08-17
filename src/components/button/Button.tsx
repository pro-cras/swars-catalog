import clsx from "clsx";
import { Link } from "react-router-dom";

export function Button({
  className,
  href,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const commonProps = {
    className: clsx("bg-black rounded-md py-1 px-2 text-white", className),
    ...props,
  };

  if (href) {
    return <Link to={href} {...commonProps} />;
  }

  return <button type="button" {...commonProps} />;
}
