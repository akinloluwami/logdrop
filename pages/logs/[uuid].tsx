import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Col,
  Card,
  Text,
  Metric,
} from "@tremor/react";
import dayjs from "dayjs";
import { formatTimeTaken } from "@/utils/formatTimeTaken";

const Log = () => {
  const router = useRouter();
  const [log, setLog] = useState<any>({});

  useEffect(() => {
    console.log(router?.query?.uuid);
    if (router?.query?.uuid) {
      (async () => {
        const { data } = await axios(`/logs/${router?.query?.uuid}`);
        setLog(data);
      })();
    }
  }, [router?.query?.uuid]);

  return (
    <DashboardLayout pageTitle="Log">
      <h2 className="text-3xl font-semibold">
        {log?.method} <span className="text-lg">{log?.endpoint}</span>
      </h2>
      <TabGroup>
        <TabList className="!bg-transparent" variant="solid" color="purple">
          <Tab>Summary</Tab>
          <Tab>Request</Tab>
          <Tab>Response</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
              <Col numColSpan={2}>
                <Card>
                  <p className="text-lg font-semibold text-gray-400">
                    Request ID
                  </p>
                  <p className="">{log?.uuid}</p>
                </Card>
              </Col>
              <Card>
                <p className="text-lg font-semibold text-gray-400">
                  Request Time
                </p>
                <p className="">
                  {dayjs(log?.requestTime).format("DD MMM • hh:mm:ss")}
                </p>
              </Card>
              <Col>
                <Card>
                  <p className="text-lg font-semibold text-gray-400">
                    Response Time
                  </p>
                  <p className="">
                    {dayjs(log?.responseTime).format("DD MMM • hh:mm:ss")}
                  </p>
                </Card>
              </Col>
              <Card>
                <p className="text-lg font-semibold text-gray-400">
                  Response Code
                </p>
                <p className="">{log?.statusCode}</p>
              </Card>
              <Card>
                <p className="text-lg font-semibold text-gray-400">
                  Time Taken
                </p>
                <p className="">{formatTimeTaken(log?.elapsedDuration)}</p>
              </Card>
              <Col numColSpan={2}>
                <Card>
                  <p className="text-lg font-semibold text-gray-400">
                    Full URL
                  </p>
                  <p className="">{log?.url}</p>
                </Card>
              </Col>
            </Grid>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Log;
