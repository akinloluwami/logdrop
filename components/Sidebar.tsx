import { RxDashboard } from "react-icons/rx";
import { GoGitPullRequestDraft } from "react-icons/go";
import { PiKeyBold } from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { MdStackedLineChart } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const links = [
    { icon: <RxDashboard />, href: "/dashboard", title: "Overview" },
    {
      icon: <GoGitPullRequestDraft />,
      href: "/dashboard/requests",
      title: "Requests",
    },
    {
      icon: <MdStackedLineChart />,
      href: "/dashboard/charts",
      title: "Charts",
    },
    { icon: <TbBulb />, href: "/dashboard/insights", title: "Insights" },
    {
      icon: <IoNotificationsOutline />,
      href: "/dashboard/events",
      title: "Events",
    },
    { icon: <PiKeyBold />, href: "/dashboard/api-keys", title: "API Keys" },
    {
      icon: <RiSettingsLine />,
      href: "/dashboard/settings",
      title: "Settings",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="w-full h-screen pt-5">
      <div className="">
        <h2 className="text-xl font-semibold px-7">Project name</h2>
      </div>
      <div className="mt-10 px-5">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`${
              pathname === link.href && "bg-purple-800/30 font-medium"
            } flex items-center gap-3 mb-4 px-2 py-2 rounded-lg hover:bg-purple-800/30 transition-colors group`}
          >
            <span
              className={`${
                pathname !== link.href
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
  );
};

export default Sidebar;
