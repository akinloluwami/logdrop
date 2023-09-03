import RequestsTable from "@/components/RequestsTable";
import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import { Card, LineChart } from "@tremor/react";
import moment from "moment";
import { useState, useEffect } from "react";

const chartdata = [
  {
    date: "25/08/2023",
    "API Requests": 962,
  },
  {
    date: "26/08/2023",
    "API Requests": 404,
  },
  {
    date: "27/08/2023",
    "API Requests": 521,
  },
  {
    date: "28/08/2023",
    "API Requests": 847,
  },
  {
    date: "29/08/2023",
    "API Requests": 76,
  },
  {
    date: "30/08/2023",
    "API Requests": 1267,
  },
  {
    date: "31/08/2023",
    "API Requests": 2000,
  },
];

const Dashboard = () => {
  const { project } = useProjectStore();

  const formattedChartData = chartdata.map((data) => ({
    ...data,
    formattedDate: moment(data.date, "DD/MM/YYYY").format("MMM D"),
  }));

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `/logs?projectId=${project?.id}&length=10`
        );
        setRecentRequests(data);
      } catch (error) {}
    })();
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
          curveType="natural"
        />
      </Card>
      <h2 className="mb-5 font-semibold text-lg my-5">Recent API Requests</h2>
      <RequestsTable data={recentRequests} />
    </DashboardLayout>
  );
};

export default Dashboard;
