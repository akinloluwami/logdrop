import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Log = () => {
  const router = useRouter();
  const [log, setLog] = useState<any>({});

  useEffect(() => {
    console.log(router?.query?.uuid);
    (async () => {
      const { data } = await axios(`/logs/${router?.query?.uuid}`);
      console.log(data);
    })();
  }, [router?.query]);

  return <DashboardLayout pageTitle="Log">Log</DashboardLayout>;
};

export default Log;
