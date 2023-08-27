import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between px-14 py-4">
      <h2>Snaplog</h2>
      <div className="flex gap-6">
        <Link href={"/login"}>Docs</Link>
        <Link href={"/login"}>Login</Link>
        <Link href={"/login"}>Get started</Link>
      </div>
    </div>
  );
};

export default Navbar;
