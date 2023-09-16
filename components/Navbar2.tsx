import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const links = [
    { title: "Pricing", href: "/pricing" },
    { title: "Docs", href: "/docs" },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex justify-between lg:px-14 px-4 items-center">
      <Logo />
      <div className="hidden lg:flex gap-12 items-center font-semibold">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`hover:text-gray-300 transition-colors ${
              pathname === link.href && "text-purple-500"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex gap-12 items-center font-semibold">
        <Link href={"/login"} className="hover:text-gray-300 transition-colors">
          Login
        </Link>

        <Link
          href={"/signup"}
          className="bg-white px-4 py-2 rounded-full text-black hover:bg-gray-100 duration-300 ease-in-out border-2 border-transparent hover:border-purple-500 transition-colors"
        >
          Get started
        </Link>
      </div>
      <button className="lg:hidden" onClick={() => setShowMenu(true)}>
        <HiMenuAlt4 className="text-2xl" color="#fff" size={30} />
      </button>
      <div
        className={`${
          showMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:hidden bg-black z-10 top-0 right-0 h-screen w-full absolute transition-opacity duration-500`}
      >
        <div className="flex flex-col gap-6 p-8 text-white text-center mt-20">
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setShowMenu(false)}
          >
            <IoClose />
          </button>
          {links.map((link, i) => (
            <Link key={i} href={link.href} className="text-xl">
              {link.title}
            </Link>
          ))}
          <Link
            href={"/login"}
            className="bg-white px-4 py-4 font-semibold rounded-full text-black"
          >
            Login
          </Link>

          <Link
            href={"/signup"}
            className="bg-gradient-to-r from-purple-500/20 to-purple-800 px-4 py-4 font-semibold rounded-full text-white"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
