import ApiKeysTable from "@/components/ApiKeysTable";
import DashboardLayout from "@/layouts/DashboardLayout";
const ApiKeys = () => {
  const apiKeys = [
    {
      id: 1,
      name: "key",
      key: "bjo987ytf3vbntjkgovucytfvbnm",
      timesUsed: 100,
      lastUsed: "01/09/2023",
      created: "28/08/2023",
    },
  ];
  return (
    <DashboardLayout pageTitle="API Keys">
      <ApiKeysTable data={apiKeys} />
    </DashboardLayout>
  );
};

export default ApiKeys;
