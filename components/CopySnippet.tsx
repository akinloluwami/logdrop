import { copyToClipboard } from "@/utils/copyToClipboard";
import { FC, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

interface Props {
  text: string;
}

const CopySnippet: FC<Props> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-5 bg-white/5 w-fit px-2 py-3 rounded-md flex items-center gap-20">
      <code>{text}</code>
      <button
        onClick={() => {
          copyToClipboard(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
        className="bg-white/80 hover:bg-white transition-colors rounded-full p-2 text-black"
      >
        {copied ? <BsCheck2 /> : <FiCopy />}
      </button>
    </div>
  );
};

export default CopySnippet;
