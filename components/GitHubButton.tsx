import { SiGithub } from "react-icons/si";

const GitHubButton = ({ action }: { action: () => void }) => {
  return (
    <button onClick={action}>
      <SiGithub />
      Continue with GitHub
    </button>
  );
};

export default GitHubButton;
