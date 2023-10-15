import Cooking from "@/components/Cooking";
import General from "@/components/Settings/General";
import Reports from "@/components/Settings/Reports";
import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import {
  ProgressBar,
  Card,
  Flex,
  Text,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import { useEffect, useState } from "react";

const Settings = () => {
  const { project } = useProjectStore();
  const [projectData, setProjectData] = useState<{
    sendWeeklyReports: boolean;
  }>({ sendWeeklyReports: false });

  useEffect(() => {
    if (project.id) {
      (async () => {
        const { data } = await axios(`/project/${project.id}/settings`);
        setProjectData(data);
      })();
    }
  }, [project.id]);

  return (
    <DashboardLayout pageTitle="Settings">
      <TabGroup>
        <TabList className="!bg-transparent border-gray-800" variant="solid">
          <Tab className="!bg-black !text-white">General</Tab>
          <Tab className="!bg-black !text-white">Reports</Tab>
          <Tab className="!bg-black !text-white">Plan & Usage</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <General />
            </div>
          </TabPanel>
          <TabPanel>
            <Reports sendWeeklyReports={projectData.sendWeeklyReports} />
          </TabPanel>
          <TabPanel>
            <Cooking />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
