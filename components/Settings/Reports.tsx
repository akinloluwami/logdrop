import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import { Button, Flex, Switch } from "@tremor/react";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  sendWeeklyReports: boolean;
}

const Reports: FC<Props> = ({ sendWeeklyReports }) => {
  const [isWeeklyReportsOn, setIsWeeklyReportsOn] = useState(sendWeeklyReports);
  const { project } = useProjectStore();

  useEffect(() => {
    setIsWeeklyReportsOn(sendWeeklyReports);
  }, [sendWeeklyReports]);

  const updateWeeklyReportsState = async () => {
    setIsWeeklyReportsOn(!isWeeklyReportsOn);
    try {
      await axios.patch(`/project/${project.id}/reports?interval=weekly`);
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Error updating weekly reports"
      );
    }
  };

  return (
    <div className="lg:w-[450px] w-full flex flex-col gap-4">
      <Flex>
        <div className="mt-2">
          <p className="text-gray-300">Weekly usage reports</p>
          <p className="text-xs">
            Get an email at the beginning of every week about the previous
            week's usage report.
          </p>
        </div>
        <Switch
          checked={isWeeklyReportsOn}
          onChange={updateWeeklyReportsState}
        />
      </Flex>
    </div>
  );
};

export default Reports;
