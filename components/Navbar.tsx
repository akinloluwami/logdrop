import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const links = [
    { title: "Pricing", href: "/pricing" },
    { title: "Docs", href: "/docs" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex justify-between px-14 py-4">
      <Logo />
      <div className="flex gap-12 items-center font-semibold">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`hover:text-purple-500 transition-colors ${
              pathname === link.href && "text-purple-500"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-12 items-center font-semibold">
        <Link
          href={"/login"}
          className="hover:text-purple-500 transition-colors"
        >
          Login
        </Link>

        <Link
          href={"/signup"}
          className="bg-white px-4 py-2 rounded-full text-black hover:bg-gray-100 duration-300 ease-in-out border-2 border-transparent hover:border-purple-500 transition-colors"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
