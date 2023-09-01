import DashboardLayout from "@/layouts/DashboardLayout";
import RequestsTable from "@/components/RequestsTable";

const Requests = () => {
  const requests = [
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
    <DashboardLayout pageTitle="Requests">
      <RequestsTable data={requests} />
    </DashboardLayout>
  );
};

export default Requests;
