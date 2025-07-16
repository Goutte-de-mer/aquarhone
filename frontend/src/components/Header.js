// import Image from "next/image";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="p-4">
      <div className="relative flex h-[450px] w-full justify-between overflow-hidden rounded-3xl bg-[url(https://images.unsplash.com/photo-1611431380333-548944660ee4?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center p-4">
        <div className="absolute inset-0 bg-black/15" />

        <h1 className="z-10 text-4xl text-white">Aquarhône</h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
