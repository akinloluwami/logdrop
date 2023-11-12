import Cooking from "@/components/Cooking";
import General from "@/components/Settings/General";
import DashboardLayout from "@/layouts/DashboardLayout";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";

const Settings = () => {
  return (
    <DashboardLayout pageTitle="Settings">
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
            <Cooking />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
