import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjectStore } from "@/stores/projectStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";

const Insights = () => {
  const { project } = useProjectStore();

  const [topEndpoints, setTopEndpoints] = useState<
    { value: number; name: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `/stats/endpoints?projectId=${project?.id}&startDate=${dayjs().subtract(
            6,
            "days"
          )}&endDate=${dayjs()}`
        );
        setTopEndpoints(data);
        console.log(data);
      } catch (error) {}
    })();
  }, [project.id]);
  return (
    <DashboardLayout pageTitle="Insights">
      <Card className="max-w-lg">
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
    </DashboardLayout>
  );
};

export default Insights;
