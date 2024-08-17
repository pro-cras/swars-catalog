import { Link } from "react-router-dom";
import { Box } from "../box/Box";
import logo from "/assets/Star-Wars-Logo-1-500x281.png";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <Box as="header" className="flex justify-between items-center">
      <div>{children}</div>
      <Link to="/">
        <img src={logo} className="bg-white max-h-10 border-r-4" />
      </Link>
    </Box>
  );
}
