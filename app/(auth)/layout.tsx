"use client";

import Logo from "@/components/Logo";
import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <div className="w-[40%] pt-7 pb-3 px-7 flex justify-between h-full flex-col">
        <div className="">
          <Logo />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              {pathname === "/login" && "Welcome back"}
              {pathname === "/signup" && "Get started"}
            </h2>
            <small className="font-semibold text-gray-400">
              {pathname === "/login" && "Login to your account"}
              {pathname === "/signup" && "Create a new account"}
            </small>
          </div>
          <div className="h-full mt-20 flex items-center justify-center">
            {children}
          </div>
        </div>
        <small>We're open-source.</small>
      </div>
      <div className="w-[60%] bg-purple-500/10"></div>
    </div>
  );
};

export default AuthLayout;
