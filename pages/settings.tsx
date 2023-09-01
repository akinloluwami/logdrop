import General from "@/components/Settings/General";
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
          <Tab className="!bg-black !text-white">Plan & Usage</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <General />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10">
              <Flex className="mt-4">
                <Text className="w-full">Product Z</Text>
                <Flex className="space-x-2" justifyContent="end">
                  <Text>$ 99,484</Text>
                  <Text>16%</Text>
                </Flex>
              </Flex>
              <ProgressBar value={12} className="mt-2" />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
