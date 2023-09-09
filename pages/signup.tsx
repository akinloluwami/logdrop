import AuthLayout from "../layouts/AuthLayout";
import GitHubButton from "../components/GitHubButton";
import Head from "next/head";
import { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  return (
    <AuthLayout>
      <Head>
        <title>Signup • LogDrop</title>
      </Head>
      <GitHubButton
        loading={loading}
        action={() => {
          setLoading(true);
          window.open(`api/auth/github`, "_self");
        }}
      />
    </AuthLayout>
  );
};

export default Signup;
