import { axios } from "@/configs/axios";
import AccountLayout from "@/layouts/AccountLayout";
import { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios("/me");
      setUser(data);
    })();
  }, []);

  return <AccountLayout>general</AccountLayout>;
};

export default Account;
