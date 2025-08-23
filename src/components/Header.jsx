//3. Create a Header.jsx component that renders a <header> element
//to show the Keeper App name in an <h1>.

import { IoMdFlashlight } from "react-icons/io";
import React from "react";

function Header() {
  return (
    <header>
      <div className="header-content">
        <IoMdFlashlight />
        <h1>Keeper</h1>
      </div>
    </header>
  );
}

export default Header;
