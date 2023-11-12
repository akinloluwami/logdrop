import General from "@/components/Settings/General";
import PlanAndUsage from "@/components/Settings/PlanAndUsage";
import DashboardLayout from "@/layouts/DashboardLayout";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";

const Settings = () => {
  const tabs = [{ index: 1, title: "plan-and-usage" }];

  const router = useRouter();

  const { addQueryParam, deleteQueryParam } = useHref();

  return (
    <DashboardLayout pageTitle="Settings">
      <TabGroup
        defaultIndex={
          tabs.find((tab) => tab.title === router.query.tab)?.index || 0
        }
        onIndexChange={(index) => {
          if (index === 0) {
            deleteQueryParam("tab");
            return;
          }

          addQueryParam(
            "tab",
            tabs.find((tabs) => tabs.index === index)?.title!
          );
        }}
      >
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
