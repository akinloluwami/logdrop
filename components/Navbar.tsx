import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between px-14 py-4">
      <h2>Snaplog</h2>
      <div className="flex gap-12 items-center font-semibold">
        <Link
          href={"/docs"}
          className="hover:text-purple-500 transition-colors"
        >
          Docs
        </Link>
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
