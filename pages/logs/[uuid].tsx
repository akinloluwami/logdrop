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
  Badge,
} from "@tremor/react";
import dayjs from "dayjs";
import { formatTimeTaken } from "@/utils/formatTimeTaken";

const Log = () => {
  const router = useRouter();
  const [log, setLog] = useState<any>({});

  const [bodyType, setBodyType] = useState("");

  useEffect(() => {
    if (router?.query?.uuid) {
      (async () => {
        const { data } = await axios(`/logs/${router?.query?.uuid}`);
        setLog(data);
        // console.log(JSON.parse(data.responseHeaders)["Content-Type"]);
        setBodyType(
          JSON?.parse(data?.responseHeaders)["Content-Type"].includes(
            "application/json"
          )
            ? "JSON"
            : "HTML"
        );
      })();
    }
  }, [router?.query?.uuid]);

  return (
    <DashboardLayout pageTitle="Log">
      <h2 className="text-3xl font-semibold">
        {log?.method} <span className="text-lg">{log?.endpoint}</span>
        <Badge
          className="ml-2"
          color={
            log.statusCode === 200 || log.statusCode === 201
              ? "green"
              : log.statusCode === 304
              ? "blue"
              : "red"
          }
        >
          {log?.statusCode}
        </Badge>
      </h2>
      <TabGroup className="mt-5">
        <TabList className="!bg-transparent" variant="solid" color="purple">
          <Tab>Summary</Tab>
          <Tab>Request</Tab>
          <Tab>Response</Tab>
        </TabList>
        <TabPanels className="mt-5">
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
              <Card>
                <p className="text-lg font-semibold text-gray-400">Client IP</p>
                <p className="">{log?.ip}</p>
              </Card>
              <Card>
                <p className="text-lg font-semibold text-gray-400">
                  Operating System
                </p>
                <p className="">{log?.os}</p>
              </Card>
              <Card>
                <p className="text-lg font-semibold text-gray-400">Browser</p>
                <p className="">{log?.browser}</p>
              </Card>
              <Card>
                <p className="text-lg font-semibold text-gray-400">
                  Device Type
                </p>
                <p className="">{log?.deviceType}</p>
              </Card>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Text className="font-semibold !text-lg">Headers</Text>
            <TabGroup>
              <TabList color="purple">
                <Tab>Pretty</Tab>
                <Tab>Raw</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {log?.requestHeaders &&
                    Object.entries(JSON.parse(log.requestHeaders)).map(
                      ([key, value], index) => {
                        return (
                          <div key={index} className="my-2 w-full">
                            <p className="text-lg font-semibold text-gray-400">
                              {key}
                            </p>
                            <p
                              className="w-full"
                              style={{ wordWrap: "break-word" }}
                            >
                              {value as string}
                            </p>
                          </div>
                        );
                      }
                    )}
                </TabPanel>
                <TabPanel>
                  <p style={{ wordWrap: "break-word" }}>{log.requestHeaders}</p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            <Text className="font-semibold !text-lg mt-10">Body</Text>
            <TabGroup>
              <TabList color="purple">
                <Tab>Pretty</Tab>
                <Tab>Raw</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {log?.requestBody &&
                    Object.entries(JSON.parse(log.requestBody)).map(
                      ([key, value], index) => {
                        return (
                          <div key={index} className="my-2 w-full">
                            <p className="text-lg font-semibold text-gray-400">
                              {key}
                            </p>
                            <p
                              className="w-full"
                              style={{ wordWrap: "break-word" }}
                            >
                              {value as string}
                            </p>
                          </div>
                        );
                      }
                    )}
                </TabPanel>
                <TabPanel>
                  <p style={{ wordWrap: "break-word" }}>{log.requestBody}</p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </TabPanel>
          <TabPanel>
            <Text className="font-semibold !text-lg">Headers</Text>
            <TabGroup>
              <TabList color="purple">
                <Tab>Pretty</Tab>
                <Tab>Raw</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {log?.responseHeaders &&
                    Object.entries(JSON.parse(log.responseHeaders)).map(
                      ([key, value], index) => {
                        return (
                          <div key={index} className="my-2 w-full">
                            <p className="text-lg font-semibold text-gray-400">
                              {key}
                            </p>
                            <p
                              className="w-full"
                              style={{ wordWrap: "break-word" }}
                            >
                              {value as string}
                            </p>
                          </div>
                        );
                      }
                    )}
                </TabPanel>
                <TabPanel>
                  <p style={{ wordWrap: "break-word" }}>
                    {log.responseHeaders}
                  </p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            <Text className="font-semibold !text-lg mt-10">Body</Text>
            <TabGroup>
              <TabList color="purple">
                <Tab>{bodyType}</Tab>
                <Tab>Raw</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>{}</TabPanel>
                <TabPanel>
                  <p style={{ wordWrap: "break-word" }}>{log.responseBody}</p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Log;
