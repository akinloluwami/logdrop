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
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";
// const colorScale = scaleLinear().domain([0, 100]).range(["#FFF", "#06F"]);

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Insights = () => {
  const { project } = useProjectStore();

  const [topEndpoints, setTopEndpoints] = useState<
    { value: number; name: string }[]
  >([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const take = 6;

  const url = `/project/${project?.id}/insights?startDate=${dayjs().subtract(
    6,
    "days"
  )}&endDate=${dayjs()}&take=${take}&group=`;

  useEffect(() => {
    if (project?.id) {
      (async () => {
        try {
          const { data } = await axios(`${url}endpoint`);
          setTopEndpoints(data);
        } catch (error) {}
      })();
    }
    (async () => {
      try {
        const { data } = await axios(`${url}os`);
        setOperatingSystems(data);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await axios(`${url}browser`);
        setBrowsers(data);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await axios(`${url}country`);
        setCountries(data);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await axios(`${url}city`);
        setCities(data);
      } catch (error) {}
    })();
  }, [project.id]);

  const getColorBasedOnValue = (value) => {
    // Define your own color mapping logic based on value
    // For example, you can use a switch statement or if-else conditions
    if (value >= 8) {
      return "#FF5733"; // Red
    } else if (value >= 3) {
      return "#FFC300"; // Yellow
    } else {
      return "#58D68D"; // Green
    }
  };

  return (
    <DashboardLayout pageTitle="Insights">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="h-[400px]">
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
        <Card className="h-[400px]">
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
                <BarList data={browsers} className="mt-2 bg-purple" />
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
        <Card className="h-[400px]">
          <Title>Location</Title>
          <TabGroup>
            <TabList color="purple">
              <Tab>Countries</Tab>
              <Tab>Cities</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex className="mt-4">
                  <Text>
                    <Bold>Country</Bold>
                  </Text>
                  <Text>
                    <Bold>Requests</Bold>
                  </Text>
                </Flex>
                <BarList data={countries} className="mt-2" />
              </TabPanel>
              <TabPanel>
                <Flex className="mt-4">
                  <Text>
                    <Bold>City</Bold>
                  </Text>
                  <Text>
                    <Bold>Requests</Bold>
                  </Text>
                </Flex>
                <BarList data={cities} className="mt-2" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
      <div></div>
    </DashboardLayout>
  );
};

export default Insights;
