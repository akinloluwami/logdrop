import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import dayjs from "dayjs";
import { useEffect } from "react";

const Insights = () => {
  const { project } = useProjectStore();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `/stats/endpoints?projectId=${project?.id}&startDate=${dayjs().subtract(
            6,
            "days"
          )}&endDate=${dayjs()}`
        );
        // setChartData(data);
        console.log(data);
      } catch (error) {}
    })();
  }, [project.id]);
  return <DashboardLayout pageTitle="Insights">Insights</DashboardLayout>;
};

export default Insights;
