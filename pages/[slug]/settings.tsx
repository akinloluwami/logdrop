import Cooking from "@/components/Cooking";
import General from "@/components/Settings/General";
import Reports from "@/components/Settings/Reports";
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
            <Reports />
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
