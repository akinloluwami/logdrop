import AuthLayout from "../layouts/AuthLayout";
import GitHubButton from "../components/GitHubButton";
import Head from "next/head";

const Signup = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Signup • ReqLog</title>
      </Head>
      <GitHubButton
        action={() => {
          window.open(`api/auth/github`, "_self");
        }}
      />
    </AuthLayout>
  );
};

export default Signup;
