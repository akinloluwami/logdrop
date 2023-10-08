import Cooking from "@/components/Cooking";
import General from "@/components/Settings/General";
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
            <button
              className="mt-10 bg-white shadow-md rounded-md border border-gray-800 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-
              gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                //@ts-ignore
                Paddle.Checkout.open({
                  settings: {
                    displayMode: "overlay",
                    theme: "dark",
                    locale: "en",
                  },
                  items: [
                    {
                      priceId: "pri_01hawzr8pc4fh41fwz7ep1enfc",
                    },
                  ],
                });
              }}
            >
              Upgrade to Pro.
            </button>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
