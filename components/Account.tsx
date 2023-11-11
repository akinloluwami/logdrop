import { axios } from "@/configs/axios";
import { Button } from "@tremor/react";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

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
    <div>
      <Button color="red" variant="light" onClick={logout}>
        Log out
      </Button>
    </div>
  );
};

export default Account;
