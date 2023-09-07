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
      className="flex items-center justify-center gap-3 bg-white/10 px-16 py-4 rounded-full font-semibold bg-gradient-to-r w-[350px] from-transparent to-purple-500/50  hover:to-purple-500 transition-all disabled:cursor-not-allowed disabled:opacity-60"
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
