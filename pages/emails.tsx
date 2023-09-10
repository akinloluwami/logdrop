import { axios } from "@/configs/axios";
import Welcome from "@/emails/welcome";
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

      <Welcome />
    </div>
  );
};

export default Emails;
