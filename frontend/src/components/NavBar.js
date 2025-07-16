"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "@/app/context/UserContext";

const NavBar = () => {
  const { user, loading, logout } = useAuth();
  return (
    <nav className="z-10">
      <ul className="flex space-x-4">
        <li>
          <Link
            className="hover:bg-c-teal block rounded-full bg-white px-8 py-2.5 font-medium transition hover:text-white"
            href={"/"}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-c-teal block rounded-full bg-white px-8 py-2.5 font-medium transition hover:text-white"
            href={"#"}
          >
            Activités
          </Link>
        </li>
        <Menu>
          <MenuButton className="hover:bg-c-teal data-active:bg-c-teal relative cursor-pointer rounded-full bg-white px-8 py-2.5 font-medium outline-0 transition hover:text-white data-active:text-white">
            <User strokeWidth={1.5} />
          </MenuButton>

          <MenuItems
            anchor="bottom end"
            transition
            className="z-20 mt-2 min-w-52 origin-top rounded-md bg-white py-2.5 outline-0 transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            {/* {!loading && user && <div>{user.firstName}</div>} */}
            {!loading && user ? (
              <>
                <h2 className="mb-2 border-b-1 border-gray-300 px-3.5 pb-2 font-medium">
                  {user.firstName} {user.lastName}
                </h2>
                <MenuItem className="px-3.5 py-1.5 transition hover:bg-gray-100">
                  <Link className="block" href={"/profile"}>
                    Profil
                  </Link>
                </MenuItem>
                <MenuItem className="px-3.5 py-1.5 transition hover:bg-gray-100">
                  <button
                    onClick={logout}
                    className="w-full cursor-pointer text-left"
                    href={"/logout"}
                  >
                    Déconnexion
                  </button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem className="px-3.5 py-2 transition hover:bg-gray-100">
                  <Link className="block" href={"/login"}>
                    Connexion
                  </Link>
                </MenuItem>
                <MenuItem className="px-3.5 py-2 transition hover:bg-gray-100">
                  <Link className="block" href={"/register"}>
                    Inscription
                  </Link>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </ul>
    </nav>
  );
};

export default NavBar;
