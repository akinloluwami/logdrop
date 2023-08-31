import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default DashboardLayout;
