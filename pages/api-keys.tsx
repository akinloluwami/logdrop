import ApiKeysTable from "@/components/ApiKeysTable";
import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import { Button, Flex, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { AiOutlineQuestion, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { TbRefresh } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { Tooltip } from "react-tooltip";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { toast } from "react-hot-toast";

const ApiKeys = () => {
  const { project } = useProjectStore();
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (project.id) {
      (async () => {
        const { data } = await axios(`/api-key?projectId=${project.id}`);
        setKey(data);
      })();
    }
  }, [project.id]);

  return (
    <DashboardLayout pageTitle="API Keys">
      <div className="flex items-center gap-3">
        <Tooltip id="copy" place="right" />
        <Text className="!text-lg">
          {showKey ? key : "••••••••••••••••••••••••••••••••••••••••••••"}
        </Text>

        <button onClick={() => setShowKey(!showKey)}>
          {showKey ? <FiEyeOff /> : <FiEye />}
        </button>
        <Button
          variant="light"
          color="purple"
          onClick={() => {
            copyToClipboard(key);
            toast("Copied to clipboard", {
              duration: 800,
            });
          }}
        >
          <BiCopy
            className="text-lg"
            data-tooltip-id="copy"
            data-tooltip-content="Copy to clipboard"
          />
        </Button>
      </div>
      {/* <div className="flex gap-3 items-center">
        <Tooltip id="btn" />
        <button className="mt-4 flex items-center gap-3 bg-purple-600 px-3 py-2 rounded-md">
          <TbRefresh /> Regenerate
        </button>
        <AiOutlineQuestionCircle
          data-tooltip-id="btn"
          data-tooltip-content="This will regenerate your API key, your app using the old one will no longer work."
        />
      </div> */}
    </DashboardLayout>
  );
};

export default ApiKeys;
