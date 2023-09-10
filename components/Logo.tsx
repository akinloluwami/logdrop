import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/">
      <Image src={"/logo.svg"} width={120} height={50} alt="LogDrop logo" />
    </Link>
  );
};

export default Logo;
