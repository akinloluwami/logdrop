import RequestsTable from "@/components/RequestsTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, LineChart } from "@tremor/react";
import moment from "moment";

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
  const formattedChartData = chartdata.map((data) => ({
    ...data,
    formattedDate: moment(data.date, "DD/MM/YYYY").format("MMM D"),
  }));

  const recentRequests = [
    {
      endpoint: "/ping",
      method: "GET",
      status: 200,
      timeTaken: "5ms",
      createdAt: "25/08/2023",
    },
    {
      endpoint: "/auth/signup",
      method: "POST",
      status: 201,
      timeTaken: "5ms",
      createdAt: "25/08/2023",
    },
    {
      endpoint: "/auth/login",
      method: "POST",
      status: 400,
      timeTaken: "5ms",
      createdAt: "25/08/2023",
    },
  ];

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
