import CopySnippet from "@/components/CopySnippet";
import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { frameworks } from "@/lib/snippets";
import { useProjectStore } from "@/stores/projectStore";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Button, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { AiOutlineApi } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { FiCopy } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useWindowSize } from "usehooks-ts";

const code = {
  "hljs-comment": {
    color: "#7195a8",
  },
  "hljs-quote": {
    color: "#c084fc",
  },
  "hljs-variable": {
    color: "#ffffff",
  },
  "hljs-template-variable": {
    color: "#ffffff",
  },
  "hljs-attribute": {
    color: "#ffffff",
  },
  "hljs-tag": {
    color: "#ffffff",
  },
  "hljs-name": {
    color: "#ffffff",
  },
  "hljs-regexp": {
    color: "#FFFFFF",
  },
  "hljs-link": {
    color: "#ffffff",
  },
  "hljs-selector-id": {
    color: "#ffffff",
  },
  "hljs-selector-class": {
    color: "#ffffff",
  },
  "hljs-number": {
    color: "#ffffff",
  },
  "hljs-meta": {
    color: "#ffffff",
  },
  "hljs-built_in": {
    color: "#ffffff",
  },
  "hljs-builtin-name": {
    color: "#ffffff",
  },
  "hljs-literal": {
    color: "#ffffff",
  },
  "hljs-type": {
    color: "#ffffff",
  },
  "hljs-params": {
    color: "#ffffff",
  },
  "hljs-string": {
    color: "#c084fc",
  },
  "hljs-symbol": {
    color: "#ffffff",
  },
  "hljs-bullet": {
    color: "#ffffff",
  },
  "hljs-keyword": {
    color: "#737A7F",
  },
  "hljs-selector-tag": {
    color: "#ffffff",
  },
  hljs: {
    display: "block",
    overflowX: "auto",
    background: "#161b1d",
    color: "#ffffff",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
};

const Onboarding = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedFramework, setSelectedFramework] = useState<{
    name: string;
    icon: IconType;
    code: string;
  }>(frameworks[0]);

  const { project } = useProjectStore();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(`/project/${project.id}/api-key`);
        setApiKey(data);
      } catch (error) {}
    })();
  }, [project.id]);

  const [verifying, setVerifying] = useState<boolean>(false);

  const checkIntegration = async () => {
    try {
      const { data } = await axios(`project/${project.id}/onboarding`);
      return { data };
    } catch (error) {}
  };

  const handleVerifyIntegration = () => {
    setVerifying(true);

    const makeAPICall = () => {
      checkIntegration()
        .then((response: any) => {
          if (response.data === 0) {
            setTimeout(makeAPICall, 5000);
          } else {
            // handleNext();
            setVerifying(false);
          }
        })
        .catch((error) => {
          setVerifying(false);
        });
    };

    makeAPICall();
  };

  return (
    <DashboardLayout pageTitle="Onboarding">
      <Title className="!text-3xl">Record your first request</Title>
      <Text>Follow the steps to integrate LogDrop into your API.</Text>

      <div className="mt-10 flex flex-col gap-10">
        <div className="">
          <Title>1. Install the SDK</Title>
          <Text>Install the SDK by running the following command:</Text>
          <CopySnippet text="npm i @logdrop/node" />
        </div>
        <div className="">
          <Title>2. Grab your API key</Title>
          <Text>Use the generated key below to authenticate requests.</Text>
          <CopySnippet text={apiKey} />
        </div>
        <div className="">
          <Title>3. Integrate into your API</Title>
          <Text>Check out the example snippets below.</Text>
          <div className="mt-3 border border-gray-200/25 rounded-xl">
            <div className="flex items-center justify-between p-3 border-b border-white/5">
              <div className="flex gap-2 items-center">
                {frameworks.map((framework, i) => (
                  <button
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1 text-sm font-semibold rounded-md transition-colors ${
                      selectedFramework.name === framework.name
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-500 hover:bg-gray-100/5"
                    }`}
                    onClick={() => setSelectedFramework(framework)}
                  >
                    {framework.icon()}
                    {framework.name}
                  </button>
                ))}
              </div>
              <button>
                <FiCopy />
              </button>
            </div>
            <div className="mt-3">
              <SyntaxHighlighter
                language="javascript"
                style={code as any}
                customStyle={{
                  background: "black",
                  borderRadius: "20px",
                  padding: "15px",
                  fontSize: "15px",
                  height: "300px",
                }}
              >
                {selectedFramework.code}
              </SyntaxHighlighter>
            </div>
            <div className="border-t p-3 border-white/5">
              <button
                className="flex items-center gap-2 text-sm p-2 font-semibold rounded-md transition-colors bg-gray-200 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={verifying}
                onClick={handleVerifyIntegration}
              >
                {verifying ? (
                  <CgSpinner size={20} className="animate-spin" />
                ) : (
                  <AiOutlineApi size={20} />
                )}{" "}
                Verify
                {verifying ? "ing" : ""} integration
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
