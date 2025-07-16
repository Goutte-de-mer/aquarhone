"use client";
import { House } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./actions";
import { useAuth } from "../context/UserContext";

export default function page() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);
    setError("");
    const result = await registerUser(formData);
    if (result.success) {
      login(result.user);
      router.push("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center bg-[url(https://images.unsplash.com/photo-1537015125382-74e1f1c99ac4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center">
      <Link
        href={"/"}
        className="hover:bg-c-teal absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:text-white"
      >
        <House strokeWidth={1.5} />
      </Link>
      <div className="absolute inset-0 bg-black/20" />
      <form
        action={handleSubmit}
        className="z-10 grid w-full max-w-lg grid-cols-2 gap-x-5 gap-y-8 rounded-xl bg-white/80 p-6 shadow-sm"
      >
        <h2 className="col-span-2 text-center text-3xl font-medium uppercase">
          Inscription
        </h2>
        <div className="flex flex-col-reverse">
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="focus:border-b-c-teal peer w-full border-b-2 border-b-gray-400 py-1 focus:outline-0"
          />
          <label
            htmlFor="firstName"
            className="peer-focus:text-c-teal text-sm font-medium"
          >
            Prénom
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="focus:border-b-c-teal peer w-full border-b-2 border-b-gray-400 py-1 focus:outline-0"
          />
          <label
            htmlFor="lastName"
            className="peer-focus:text-c-teal text-sm font-medium"
          >
            Nom
          </label>
        </div>
        <div className="col-span-2 flex flex-col-reverse">
          <input
            type="email"
            name="email"
            id="email"
            className="focus:border-b-c-teal peer w-full border-b-2 border-b-gray-400 py-1 focus:outline-0"
          />
          <label
            htmlFor="email"
            className="peer-focus:text-c-teal text-sm font-medium"
          >
            Email
          </label>
        </div>
        <div className="col-span-2 flex flex-col-reverse">
          <input
            type="password"
            name="password"
            id="password"
            className="focus:border-b-c-teal peer w-full border-b-2 border-b-gray-400 py-1 focus:outline-0"
          />
          <label
            htmlFor="password"
            className="peer-focus:text-c-teal text-sm font-medium"
          >
            Mot de passe
          </label>
        </div>
        {error && (
          <div className="rounded bg-red-100 p-2 text-red-500">{error}</div>
        )}
        <button type="submit" className="col-span-2 mx-auto min-w-3xs">
          <span className="bg-c-teal hover:bg-c-darkteal block cursor-pointer rounded-md px-8 py-2.5 font-medium text-white transition">
            {loading ? "Inscription..." : "Je m'inscris"}
          </span>
        </button>
      </form>
    </main>
  );
}
