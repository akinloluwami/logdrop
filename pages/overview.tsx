import ProjectCard from "@/components/ProjectCard";
import { axios } from "@/configs/axios";
import { Button, Title } from "@tremor/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    (async () => {
      const { data } = await axios("/project");
      setProjects(data);
    })();
  }, []);

  const router = useRouter();

  const logout = async () => {
    toast.loading("Logging out", {
      id: "logout",
    });
    try {
      toast.dismiss("logout");
      await axios("/auth/logout");
      toast("Logged out successfully", {
        duration: 800,
      });
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex items-center  justify-center flex-col py-10">
      <Head>
        <title>Overview • LogDrop</title>
      </Head>
      <div className="flex items-center justify-between w-full lg:px-14 px-5">
        <Title>Welcome back</Title>
        <Button color="red" variant="light" onClick={logout}>
          Log out
        </Button>
      </div>
      <div className="mt-20 w-full">
        <h2 className="text-3xl font-semibold text-center">
          Choose your fighter
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 lg:w-[90%] mx-auto px-5">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
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
