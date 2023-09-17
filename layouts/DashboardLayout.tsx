import Sidebar from "@/components/Sidebar";
import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface Props {
  children: ReactNode;
  pageTitle: string;
}

const DashboardLayout: FC<Props> = ({ children, pageTitle }) => {
  const { project, setProject } = useProjectStore();
  const loading = typeof project.id !== "number";
  const router = useRouter();

  useEffect(() => {
    if (project.id !== null) return;

    (async () => {
      try {
        const { data } = await axios("/project");
        if (data[0]) {
          setProject(data[0].name, data[0].id, data[0].apiUrl);
        } else {
          router.push("/onboarding");
        }
      } catch (error) {}
    })();
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex">
      <Head>
        <title>{`${pageTitle} • LogDrop`}</title>
      </Head>
      <>
        {loading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <CgSpinnerTwo className="animate-spin mr-2" size={50} />
          </div>
        ) : (
          <>
            <div className="hidden lg:block border-r border-gray-800 w-[20%] fixed">
              <Sidebar />
            </div>
            <div className="lg:w-[80%] lg:ml-[20%] w-full">
              <div className="sticky top-0">
                <div className="relative">
                  <div className="flex justify-between border-b border-gray-800 lg:px-10 px-4 py-5 w-full sticky top-0 bg-black/20 backdrop-blur-md">
                    <h2 className="text-2xl font-medium">{pageTitle}</h2>

                    <div className="flex items-center gap-3">
                      <Link href={"/docs"}>Docs</Link>
                      <button
                        className="lg:hidden"
                        onClick={() => setShowSidebar(!showSidebar)}
                      >
                        {showSidebar ? (
                          <IoClose
                            size={30}
                            color="#fff"
                            className="text-2xl"
                          />
                        ) : (
                          <HiMenuAlt4
                            className="text-2xl"
                            color="#fff"
                            size={30}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`h-screen w-full bg-black absolute transition-opacity z-20 ${
                      showSidebar
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Sidebar />
                  </div>
                </div>
              </div>
              <div className="py-5 lg:px-10 px-4">{children}</div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default DashboardLayout;
