import RequestsTable from "@/components/RequestsTable";
import { axios } from "@/configs/axios";
import { resend } from "@/configs/resend";
import Email from "@/emails";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import { Card, LineChart } from "@tremor/react";
import dayjs from "dayjs";
import moment from "moment";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { project } = useProjectStore();

  const [chartdata, setChartData] = useState<
    { date: string; _count: number }[]
  >([]);

  const formattedChartData = chartdata.map((data) => ({
    ...data,
    formattedDate: moment(data.date, "YYYY-MM-DD").format("MMM D"),
  }));

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (project.id) {
      (async () => {
        try {
          const { data } = await axios(
            `project/${project?.id}/logs?pageSize=10`
          );
          setRecentRequests(data);
        } catch (error) {}
      })();
    }
  }, [project.id]);

  useEffect(() => {
    if (project.id) {
      (async () => {
        try {
          const { data } = await axios(
            `/stats/chart?projectId=${project?.id}&startDate=${dayjs().subtract(
              6,
              "days"
            )}&endDate=${dayjs()}`
          );
          setChartData(data);
          console.log(data);
        } catch (error) {}
      })();
    }
  }, [project.id]);

  return (
    <DashboardLayout pageTitle="Overview">
      <h2 className="mb-5 font-semibold text-lg">Last 7 days API Requests</h2>
      <Card className="!bg-transparent">
        <LineChart
          className="mt-6 h-72"
          data={formattedChartData}
          index="formattedDate"
          categories={["API Requests"]}
          colors={["purple"]}
          yAxisWidth={40}
          curveType="linear"
        />
      </Card>
      <h2 className="mb-5 font-semibold text-lg my-5">Recent API Requests</h2>
      <RequestsTable data={recentRequests} />
    </DashboardLayout>
  );
};

export default Dashboard;
