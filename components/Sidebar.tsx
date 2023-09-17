import { RxDashboard } from "react-icons/rx";
import { PiKeyBold } from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { MdStackedLineChart } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { BsViewStacked } from "react-icons/bs";
import { Button, Select, SelectItem } from "@tremor/react";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import AddNewProject from "./AddNewProject";
import { useState } from "react";
import { useProjectsStore } from "@/stores/projectsStore";
import { set } from "lodash";

const Sidebar = () => {
  const links = [
    { icon: <RxDashboard />, href: "/overview", title: "Overview" },
    {
      icon: <BsViewStacked />,
      href: "/logs",
      title: "Logs",
    },
    { icon: <TbBulb />, href: "/insights", title: "Insights" },
    {
      icon: <MdStackedLineChart />,
      href: "/charts",
      title: "Charts",
    },
    {
      icon: <IoNotificationsOutline />,
      href: "/events",
      title: "Events",
    },
    { icon: <PiKeyBold />, href: "/api-keys", title: "API Keys" },
    {
      icon: <RiSettingsLine />,
      href: "/settings",
      title: "Settings",
    },
  ];

  const pathname = usePathname();

  const { project, setProject } = useProjectStore();
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

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const closeModal = () => {
    setIsNewProjectModalOpen(false);
  };

  const { projects } = useProjectsStore();

  return (
    <div className="w-full h-screen py-5 relative flex flex-col justify-between">
      <AddNewProject isOpen={isNewProjectModalOpen} closeModal={closeModal} />
      <div>
        <div className="flex items-center gap-3 px-5">
          <Select
            value={project?.id?.toString()}
            onValueChange={(value) => {
              const find = projects.find((p) => p.id.toString() === value);
              setProject(find?.name!, find?.id!, find?.apiUrl!);
            }}
          >
            {projects.map((project, index) => (
              <SelectItem key={index} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </Select>
          <button
            className="flex items-center gap-2 px-2 py-2 rounded-lg bg-purple-800/30 font-medium text-white transition-colors hover:bg-purple-800/40"
            onClick={() => setIsNewProjectModalOpen(!isNewProjectModalOpen)}
          >
            <FiPlus />
          </button>
        </div>
        <div className="mt-10 px-5">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`${
                pathname?.includes(link.href) && "bg-purple-800/30 font-medium"
              } flex items-center gap-3 mb-4 px-2 py-2 rounded-lg lg:hover:bg-purple-800/30 transition-colors group`}
            >
              <span
                className={`${
                  !pathname?.includes(link.href)
                    ? "group-hover:translate-x-2 transition-all"
                    : ""
                }`}
              >
                {link.icon}
              </span>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-5 w-full">
        <Button color="red" variant="light" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
