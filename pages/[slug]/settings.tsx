import Cooking from "@/components/Cooking";
import General from "@/components/Settings/General";
import PlanAndUsage from "@/components/Settings/PlanAndUsage";
import PaddleLoader from "@/components/paddleLoader";
import DashboardLayout from "@/layouts/DashboardLayout";
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

const Settings = () => {
  return (
    <DashboardLayout pageTitle="Settings">
      <PaddleLoader />
      <TabGroup>
        <TabList className="!bg-transparent border-gray-800" variant="solid">
          <Tab className="!bg-black !text-white">General</Tab>
          <Tab className="!bg-black !text-white">Plan & Usage</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <General />
            </div>
          </TabPanel>
          <TabPanel>
            <PlanAndUsage />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
