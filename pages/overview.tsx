import Account from "@/components/Account";
import AddNewProject from "@/components/AddNewProject";
import Logo from "@/components/Logo";
import ProjectCard from "@/components/ProjectCard";
import { axios } from "@/configs/axios";
import { Button, Title, Text } from "@tremor/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineRocketLaunch } from "react-icons/md";

const Overview = () => {
  const [projects, setProjects] = useState<
    {
      id: number;
      slug: string;
      name: string;
      apiUrl: string;
      sparkline: number[];
      logs: number;
      averageRequestsPerHour: number;
    }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios("/project");
      setProjects(data);
      setLoading(false);
    })();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col py-5">
      <AddNewProject
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <Head>
        <title>Overview • LogDrop</title>
      </Head>
      <div className="flex items-center justify-between w-full lg:px-14 px-5">
        <Logo />
        <Account />
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <CgSpinner size={30} className="animate-spin mt-40" />
        </div>
      ) : (
        <div className="mt-20 w-full">
          {projects.length === 0 ? (
            <div className="flex items-center justify-center flex-col">
              <Title className="!lg:text-5xl !text-4xl text-center">
                Welcome to LogDrop
              </Title>
              <Text className="!text-lg !font-semibold mt-1">
                Let's create your first project.
              </Text>
              <button
                className="bg-white text-black font-semibold px-4 py-3 rounded-md flex items-center gap-2 hover:shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-500 mt-10"
                onClick={() => setIsModalOpen(true)}
              >
                <MdOutlineRocketLaunch size={20} />
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 lg:w-[90%] mx-auto px-5">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* <small className="mt-10 text-center text-gray-600">
        This is a temporary page. I'm currently working on something!
      </small> */}
    </div>
  );
};

export default Overview;
