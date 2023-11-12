import OverviewNavbar from "@/components/OverviewNavbar";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const links = [
    { name: "General", href: "/account" },
    {
      name: "Usage",
      href: "/account/usage",
    },
  ];

  return (
    <div className="p-5">
      <Head>
        <title>Account • LogDrop</title>
      </Head>
      <OverviewNavbar />
      <div className="flex px-10 mt-10 gap-10">
        <div className="w-[20%] flex flex-col gap-5">
          {links.map((link) => (
            <Link
              href={link.href}
              className={`rounded-md p-2 font-semibold ${
                router.asPath === link.href ? "bg-purple-600" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
