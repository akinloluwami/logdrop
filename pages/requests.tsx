import DashboardLayout from "@/layouts/DashboardLayout";
import RequestsTable from "@/components/RequestsTable";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import { Flex, Select, SelectItem, TextInput } from "@tremor/react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { project } = useProjectStore();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(`/logs?projectId=${project?.id}`);
        setRequests(data);
      } catch (error) {}
    })();
  }, [project.id]);

  return (
    <DashboardLayout pageTitle="Requests">
      <div className="flex items-center w-full mb-5 gap-4">
        <TextInput placeholder="Search..." />
        <Select defaultValue="all">
          <SelectItem className="!bg-black" value="15m">
            Last 15 minutes
          </SelectItem>
          <SelectItem className="!bg-black" value="20m">
            Last 30 minutes
          </SelectItem>
          <SelectItem className="!bg-black" value="ah">
            Last 1 hour
          </SelectItem>
          <SelectItem className="!bg-black" value="10h">
            Last 10 hours
          </SelectItem>
          <SelectItem className="!bg-black" value="24h">
            Last 24 hours
          </SelectItem>
          <SelectItem className="!bg-black" value="3d">
            Last 3 days
          </SelectItem>
          <SelectItem className="!bg-black" value="7d">
            Last 7 days
          </SelectItem>
          <SelectItem className="!bg-black" value="14d">
            Last 14 days
          </SelectItem>
          <SelectItem className="!bg-black" value="30d">
            Last 30 days
          </SelectItem>
          <SelectItem className="!bg-black" value="all">
            All time
          </SelectItem>
        </Select>
      </div>
      <RequestsTable data={requests} />
    </DashboardLayout>
  );
};

export default Requests;
