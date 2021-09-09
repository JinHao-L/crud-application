import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../assets/notes.svg";

interface HeaderProps {
  rightComponent: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ rightComponent }) => {
  return (
    <header className="h-16 md:h-15 px-10 py-4 bg-white">
      <nav className="h-full flex px-3 py-0 mx-auto my-0 max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="h-full flex align-middle text-xl font-semibold no-underline uppercase flex-row items-center"
        >
          <LogoIcon className="w-8 h-8 mr-1 flex" />
          Notes
        </Link>
        {rightComponent}
      </nav>
    </header>
  );
};

export default Header;
