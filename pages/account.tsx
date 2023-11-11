import { axios } from "@/configs/axios";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios("/me");
      setUser(data);
    })();
  }, []);

  return <div>Account</div>;
};

export default Account;
