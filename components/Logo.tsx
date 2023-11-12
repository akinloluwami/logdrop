import Image from "next/image";
import Link from "next/link";
const Logo = ({
  toOverview,
  height,
  width,
}: {
  toOverview?: boolean;
  height?: number;
  width?: number;
}) => {
  return (
    <Link href={toOverview ? "/overview" : "/"}>
      <Image
        src={"/logo.svg"}
        width={width || 120}
        height={height || 50}
        alt="LogDrop logo"
      />
    </Link>
  );
};

export default Logo;
