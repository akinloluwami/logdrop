import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiShootingStar } from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import Tilt from "react-parallax-tilt";
const OpenSource = () => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios(
        "https://api.github.com/repos/akinloluwami/logdrop"
      );
      setStars(data.stargazers_count);
    })();
  }, []);

  return (
    <div className="bg-gradient-to-r mt-20 from-purple-400 to-purple-700 py-32 flex flex-col items-center gap-5">
      <h1 className="lg:text-7xl text-4xl font-semibold">
        Proudly open-source
      </h1>
      <p className="text-lg lg:w-[50%] text-center mx-auto">
        Our source code is available on GitHub, and you are welcome to read,
        review, or contribute to its development as you see fit!
      </p>
      <Tilt>
        <Link
          href="https://github.com/akinloluwami/logdrop"
          target="_blank"
          className="bg-black text-white py-3 px-8 rounded-md flex items-center gap-2"
        >
          <SiGithub /> Star on GitHub{" "}
          <PiShootingStar className="text-purple-400" /> {stars}
        </Link>
      </Tilt>
    </div>
  );
};

export default OpenSource;
