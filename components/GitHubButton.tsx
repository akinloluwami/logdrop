import { CgSpinner } from "react-icons/cg";
import { SiGithub } from "react-icons/si";

const GitHubButton = ({
  action,
  loading,
}: {
  action: () => void;
  loading: boolean;
}) => {
  return (
    <button
      onClick={action}
      className="flex items-center justify-center gap-3 px-16 py-4 rounded-full font-semibold bg-gradient-to-r w-[350px] from-purple-400 to-purple-700 hover:to-purple-800 transition-all disabled:cursor-not-allowed disabled:opacity-60"
      disabled={loading}
    >
      <SiGithub />
      {loading ? (
        <CgSpinner className="animate-spin" size={20} />
      ) : (
        "Continue with GitHub"
      )}
    </button>
  );
};

export default GitHubButton;
