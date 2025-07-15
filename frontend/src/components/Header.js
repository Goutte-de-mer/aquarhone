import React from "react";
import Image from "next/image";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div>
      <h1 className="text-center text-8xl tracking-wider">Aquarhône</h1>
      <NavBar />

      <Image
        src={`https://images.unsplash.com/photo-1468221296755-1c53a9dbcd54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
        width={1200}
        height={500}
        alt="Kayak sur le Rhône"
        className="mx-auto h-[450px] w-full max-w-[1200px] rounded-full object-cover"
      />
    </div>
  );
};

export default Header;
