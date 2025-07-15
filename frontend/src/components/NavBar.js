import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="mx-auto mt-4 mb-4 w-fit rounded-full bg-[#efefef] px-3 py-2.5">
      <ul className="flex space-x-4">
        <li>
          <Link className="block rounded-full bg-white px-8 py-2.5" href={"#"}>
            Accueil
          </Link>
        </li>
        <li>
          <Link className="block rounded-full bg-white px-8 py-2.5" href={"#"}>
            Activités
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-full bg-white px-8 py-2.5"
            href={"#"}
          ></Link>
        </li>
        <li>
          <Link
            className="block rounded-full bg-white px-8 py-2.5"
            href={"#"}
          ></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
