import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  BarList,
  Card,
  Title,
  Bold,
  Flex,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";

const Insights = () => {
  const { project } = useProjectStore();

  const [topEndpoints, setTopEndpoints] = useState<
    { value: number; name: string }[]
  >([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [browsers, setBrowsers] = useState([]);

  const take = 6;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `/stats/endpoints?projectId=${project?.id}&startDate=${dayjs().subtract(
            6,
            "days"
          )}&endDate=${dayjs()}&take=${take}`
        );
        setTopEndpoints(data);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await axios(
          `/stats/os?projectId=${project?.id}&startDate=${dayjs().subtract(
            6,
            "days"
          )}&endDate=${dayjs()}&take=${take}`
        );
        setOperatingSystems(data);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await axios(
          `/stats/browsers?projectId=${project?.id}&startDate=${dayjs().subtract(
            6,
            "days"
          )}&endDate=${dayjs()}&take=${take}`
        );
        setBrowsers(data);
      } catch (error) {}
    })();
  }, [project.id]);
  return (
    <DashboardLayout pageTitle="Insights">
      <Flex className="gap-6 flex-col lg:flex-row">
        <Card className="max-w-lg h-[400px]">
          <Title>Top Endpoints</Title>
          <Flex className="mt-4">
            <Text>
              <Bold>Source</Bold>
            </Text>
            <Text>
              <Bold>Requests</Bold>
            </Text>
          </Flex>
          <BarList data={topEndpoints} className="mt-2" />
        </Card>
        <Card className="max-w-lg h-[400px]">
          <Title>Devices</Title>
          <TabGroup>
            <TabList color="purple">
              <Tab>Browser</Tab>
              <Tab>OS</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex className="mt-4">
                  <Text>
                    <Bold>Browser</Bold>
                  </Text>
                  <Text>
                    <Bold>Requests</Bold>
                  </Text>
                </Flex>
                <BarList data={browsers} className="mt-2" />
              </TabPanel>
              <TabPanel>
                <Flex className="mt-4">
                  <Text>
                    <Bold>OS</Bold>
                  </Text>
                  <Text>
                    <Bold>Requests</Bold>
                  </Text>
                </Flex>
                <BarList data={operatingSystems} className="mt-2" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </Flex>
    </DashboardLayout>
  );
};

export default Insights;
