import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden lg:block border-r-2 border-purple-500/20 w-[20%]">
        <Sidebar />
      </div>
      <div className="py-5 px-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
