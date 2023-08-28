import { SiGithub } from "react-icons/si";

const GitHubButton = ({ action }: { action: () => void }) => {
  return (
    <button
      onClick={action}
      className="flex items-center gap-3 bg-white/10 px-16 py-4 rounded-full font-semibold bg-gradient-to-r from-transparent to-purple-500/50  hover:to-purple-500 transition-all"
    >
      <SiGithub />
      Continue with GitHub
    </button>
  );
};

export default GitHubButton;
