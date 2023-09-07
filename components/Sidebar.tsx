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
import { Button } from "@tremor/react";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

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

  const { project } = useProjectStore();
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
    <div className="w-full h-screen pt-5 relative">
      <div className="">
        <h2 className="text-xl font-semibold px-7">{project?.name}</h2>
      </div>
      <div className="mt-10 px-5">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`${
              pathname?.includes(link.href) && "bg-purple-800/30 font-medium"
            } flex items-center gap-3 mb-4 px-2 py-2 rounded-lg hover:bg-purple-800/30 transition-colors group`}
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
      <div className="absolute bottom-2 px-5 w-full">
        <Button color="red" variant="light" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
