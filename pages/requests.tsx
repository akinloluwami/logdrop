import DashboardLayout from "@/layouts/DashboardLayout";
import RequestsTable from "@/components/RequestsTable";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import { Flex, Select, SelectItem, TextInput } from "@tremor/react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { project } = useProjectStore();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(`/logs?projectId=${project?.id}`);
        setRequests(data);
      } catch (error) {}
    })();
  }, [project.id]);

  const httpStatusCodes = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "Switch Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a Teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
  };

  return (
    <DashboardLayout pageTitle="Requests">
      <div className="flex items-center w-full mb-7 gap-4">
        <TextInput placeholder="Search..." />
        <Select defaultValue="all">
          <SelectItem className="!bg-black" value="15m">
            Last 15 minutes
          </SelectItem>
          <SelectItem className="!bg-black" value="20m">
            Last 30 minutes
          </SelectItem>
          <SelectItem className="!bg-black" value="ah">
            Last 1 hour
          </SelectItem>
          <SelectItem value="10h">Last 10 hours</SelectItem>
          <SelectItem value="24h">Last 24 hours</SelectItem>
          <SelectItem value="3d">Last 3 days</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="14d">Last 14 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </Select>
        <Select defaultValue="all"></Select>
      </div>
      <RequestsTable data={requests} />
    </DashboardLayout>
  );
};

export default Requests;
