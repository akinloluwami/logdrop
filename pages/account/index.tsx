import { axios } from "@/configs/axios";
import AccountLayout from "@/layouts/AccountLayout";
import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios("/me");
      setUser(data);
    })();
  }, []);

  return (
    <AccountLayout>
      <div className="w-[700px] flex flex-col gap-5">
        <div className="">
          <p>Name</p>
          <TextInput value={user.name} readOnly />
        </div>
        <div className="">
          <p>Email</p>
          <TextInput value={user.email} readOnly />
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
