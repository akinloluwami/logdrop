import { axios } from "@/configs/axios";
import React from "react";

const Emails = () => {
  return (
    <div>
      <button
        onClick={async () => {
          try {
            axios.post("/emails/test");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Send test email
      </button>

      {/* <FirstRequest /> */}
    </div>
  );
};

export default Emails;
