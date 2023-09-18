import { axios } from "@/configs/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Overview = () => {
  const [projects, setProjects] = useState<{ slug: string; name: string }[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const { data } = await axios("/project");
      setProjects(data);
    })();
  }, []);

  return (
    <div className="flex items-center  justify-center flex-col py-10">
      <h1>Welcome back</h1>
      <div className="mt-20">
        <h2 className="text-3xl font-semibold text-center">
          Choose your fighter
        </h2>
        <div className="flex items-center justify-center mt-10 gap-5 flex-wrap">
          {projects.map((project) => (
            <Link
              href={`/${project.slug}/overview`}
              className="text-white hover:text-gray-900 font-bold border border-purple-800/30 shadow-purple-500 w-[250px] h-[250px] rounded-md flex items-center justify-center"
            >
              {project.name}
            </Link>
          ))}
        </div>
      </div>
      <small className="mt-10 text-center text-gray-600">
        This is a temporary page. I'm currently working on something!
      </small>
    </div>
  );
};

export default Overview;
