import { axios } from "@/configs/axios";
import UsageReport from "@/emails/usage-report";
import React from "react";

const Emails = () => {
  return (
    <div>
      <UsageReport />
    </div>
  );
};

export default Emails;
