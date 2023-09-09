"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const logOut = async () => {
    const res = await fetch("/api/login");
    const json = await res.json();

    if (json["status"] === true) {
      router.replace("/");
    }
  };
  return (
    <header className="p-4 bg-gray-800 text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <Link href="/" className="flex items-center p-2">
          Assignment 14
        </Link>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <Link
              href="/"
              className="flex items-center px-4 -mb-1  text-violet-400 "
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              href={"/dashboard"}
              className="flex items-center px-4 -mb-1  text-violet-400 "
              replace
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div>
          <ul className="items-center flex-shrink-0 hidden lg:flex justify-between">
            <li className="flex ">
              <Link
                href={"/login"}
                className="flex items-center px-4 -mb-1 text-violet-400 "
                replace
              >
                Log In
              </Link>
            </li>
            <li className="flex">
              <button
                onClick={logOut}
                className="flex items-center px-8 py-2 font-semibold rounded bg-rose-500 text-gray-100"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
