import { axios } from "@/configs/axios";
import AccountLayout from "@/layouts/AccountLayout";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Usage = () => {
  const [start, setStart] = useState(
    dayjs().startOf("month").subtract(1, "month").format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/me/usage?from=${start}&to=${end}`);
      console.log(res);
    })();
  }, []);

  return (
    <AccountLayout>
      <div className=""></div>
    </AccountLayout>
  );
};

export default Usage;
