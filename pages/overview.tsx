import ProjectCard from "@/components/ProjectCard";
import { axios } from "@/configs/axios";
import { Button, Title } from "@tremor/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Overview = () => {
  const [projects, setProjects] = useState<
    {
      slug: string;
      name: string;
      apiUrl: string;
      sparkline: number[];
      logs: number;
      averageRequestsPerHour: number;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios("/project");
      setProjects(data);
    })();
  }, []);

  return (
    <div className="flex items-center  justify-center flex-col py-10">
      <Head>
        <title>Overview • LogDrop</title>
      </Head>
      <div className="flex items-center justify-between w-full px-14">
        <Title>Welcome back</Title>
        <Button color="red" variant="light">
          Log out
        </Button>
      </div>
      <div className="mt-20">
        <h2 className="text-3xl font-semibold text-center">
          Choose your fighter
        </h2>
        <div className="flex items-center justify-center mt-10 gap-5 flex-wrap">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
      {/* <small className="mt-10 text-center text-gray-600">
        This is a temporary page. I'm currently working on something!
      </small> */}
    </div>
  );
};

export default Overview;
