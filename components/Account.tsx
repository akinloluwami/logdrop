import { axios } from "@/configs/axios";
import { Button } from "@tremor/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

const Account = () => {
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
    }
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <RxAvatar size={32} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#0a0a0a] focus:outline-none">
            <div className="p-2 w-full flex flex-col gap-3">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={`rounded-md p-2
                    ${active ? "bg-white/80 text-black" : ""}
                  `}
                  >
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`text-left rounded-md p-2 ${
                      active ? "bg-white/80 text-black" : ""
                    }`}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Account;
