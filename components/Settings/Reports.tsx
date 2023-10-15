import { axios } from "@/configs/axios";
import { Button, Flex } from "@tremor/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Reports = () => {
  const [isWeeklyReportsOn, setIsWeeklyReportsOn] = useState(false);

  const updateWeeklyReportsState = async () => {
    setIsWeeklyReportsOn(!isWeeklyReportsOn);
    try {
      await axios.put("/reports?interval=weekly");
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
        <Button color="purple" onClick={updateWeeklyReportsState}>
          {isWeeklyReportsOn ? "Off" : "On"}
        </Button>
      </Flex>
    </div>
  );
};

export default Reports;
