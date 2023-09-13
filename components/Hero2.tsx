import Link from "next/link";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { ExpandingArrow } from "./ExpandingArrow";
import { SiGithub } from "react-icons/si";
import { BsStars } from "react-icons/bs";

const Hero = () => {
  return (
    <div className="flex items-center flex-col bg-transparent gap-7">
      <Link
        href={"/github"}
        className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 px-7 py-3 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-purple-800/20 mt-10"
      >
        <SiGithub />
        <p className="text-sm font-semibold">We're opensource</p>
        <BsStars />
        <p>Star on GitHub</p>
        <ExpandingArrow className="-ml-1 h-3.5 w-3.5" />
      </Link>
      <h1 className="text-center font-semibold lg:text-8xl text-6xl lg:w-[60%]">
        Powerful analytics for NodeJS APIs
      </h1>
      <p className="lg:text-xl text-lg lg:w-[50%] px-5 text-center">
        Deeper insights into your API usage with realtime analytics, logging,
        alerts and usage reports.
      </p>
      <div className="flex gap-4 items-center flex-wrap">
        <Link
          href="/docs"
          className="flex items-center group font-semibold gap-1 bg-transparent backdrop-blur-md hover:bg-gradient-to-r from-transparent to-purple-500/40 text-white transition-colors px-5 py-3 rounded-full"
        >
          Documentation
          <HiMiniArrowSmallRight className="group-hover:translate-x-1 transition-all" />
        </Link>
        <Link
          href="/signup"
          className="flex items-center group font-semibold gap-1 backdrop-blur-md bg-white hover:text-purple-800 text-black transition-colors px-5 py-3 rounded-full"
        >
          Get started
          <HiMiniArrowSmallRight className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
