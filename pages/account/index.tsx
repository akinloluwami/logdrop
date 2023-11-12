import OverviewNavbar from "@/components/OverviewNavbar";
import { axios } from "@/configs/axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios("/me");
      setUser(data);
    })();
  }, []);

  return (
    <div className="p-5">
      <Head>
        <title>Account • LogDrop</title>
      </Head>
      <OverviewNavbar />
      <div className="flex"></div>
    </div>
  );
};

export default Account;
