import AuthLayout from "../layouts/AuthLayout";
import GitHubButton from "../components/GitHubButton";

const Signup = () => {
  return (
    <AuthLayout>
      <GitHubButton
        action={() => {
          window.open(`api/auth/github`, "_self");
        }}
      />
    </AuthLayout>
  );
};

export default Signup;
