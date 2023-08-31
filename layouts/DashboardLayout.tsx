import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  pageTitle: string;
}

const DashboardLayout: FC<Props> = ({ children, pageTitle }) => {
  return (
    <div className="flex">
      <Head>
        <title>{pageTitle} • Snaplog</title>
      </Head>
      <div className="hidden lg:block border-r border-purple-500/20 w-[20%] fixed">
        <Sidebar />
      </div>
      <div className="w-[80%] ml-[20%]">
        <div className="flex justify-between border-b border-purple-500/20 px-10 py-5 w-full sticky top-0 bg-black/20 backdrop-blur-md z-50">
          <h2 className="text-2xl font-medium">{pageTitle}</h2>
          <button>Docs</button>
        </div>
        <div className="py-5 px-10">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
