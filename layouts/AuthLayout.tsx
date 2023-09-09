import React, { ReactNode } from "react";
import Logo from "../components/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <div className="lg:w-[40%] pt-7 pb-3 px-7 flex justify-between h-full flex-col">
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
          <div className="h-full mt-20 flex items-center flex-col justify-center">
            {children}
            <div className="mt-5 flex gap-1 items-center lg:text-xs">
              {pathname === "/signup" && "Already have an account?"}
              {pathname === "/login" && "New to LogDrop?"}
              <Link
                href={pathname === "/signup" ? "/login" : "/signup"}
                className="hover:text-purple-500 transition-colors"
              >
                {pathname === "/signup" ? "Login" : "Sign up"}
              </Link>
            </div>
          </div>
        </div>
        <small>We're open-source.</small>
      </div>
      <div className="hidden lg:block lg:w-[60%] bg-purple-500/10"></div>
    </div>
  );
};

export default AuthLayout;
