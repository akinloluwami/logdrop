import DashboardLayout from "@/layouts/DashboardLayout";
import RequestsTable from "@/components/RequestsTable";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import useHref from "use-href";

import {
  Flex,
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { project } = useProjectStore();

  const [endpoint, setEndpoint] = useState("");
  const [methods, setMethods] = useState([]);
  const [statusCodes, setStatusCodes] = useState<string[]>([]);
  const [debouncedEndpoint, setDebouncedEndpoint] = useState("");

  const debouncedSearch = debounce((value) => {
    setDebouncedEndpoint(value);
  }, 500);
  const { addQueryParam } = useHref();

  useEffect(() => {
    (async () => {
      try {
        const encodedURL = `/logs?projectId=${encodeURIComponent(
          `${project.id}`
        )}&status_codes=${encodeURIComponent(
          statusCodes.join("_")
        )}&methods=${encodeURIComponent(
          methods.join("_")
        )}&endpoint=${encodeURIComponent(endpoint)}`;
        const { data } = await axios(encodedURL);
        setRequests(data);
      } catch (error) {}
    })();
  }, [project.id, statusCodes, methods]);

  const httpStatusCodes: { code: number; name: string }[] = [
    { code: 100, name: "Continue" },
    { code: 101, name: "Switching Protocols" },
    { code: 102, name: "Processing" },
    { code: 200, name: "OK" },
    { code: 201, name: "Created" },
    { code: 202, name: "Accepted" },
    { code: 203, name: "Non-Authoritative Information" },
    { code: 204, name: "No Content" },
    { code: 205, name: "Reset Content" },
    { code: 206, name: "Partial Content" },
    { code: 207, name: "Multi-Status" },
    { code: 208, name: "Already Reported" },
    { code: 226, name: "IM Used" },
    { code: 300, name: "Multiple Choices" },
    { code: 301, name: "Moved Permanently" },
    { code: 302, name: "Found" },
    { code: 303, name: "See Other" },
    { code: 304, name: "Not Modified" },
    { code: 305, name: "Use Proxy" },
    { code: 306, name: "Switch Proxy (Unused)" },
    { code: 307, name: "Temporary Redirect" },
    { code: 308, name: "Permanent Redirect" },
    { code: 400, name: "Bad Request" },
    { code: 401, name: "Unauthorized" },
    { code: 402, name: "Payment Required" },
    { code: 403, name: "Forbidden" },
    { code: 404, name: "Not Found" },
    { code: 405, name: "Method Not Allowed" },
    { code: 406, name: "Not Acceptable" },
    { code: 407, name: "Proxy Authentication Required" },
    { code: 408, name: "Request Timeout" },
    { code: 409, name: "Conflict" },
    { code: 410, name: "Gone" },
    { code: 411, name: "Length Required" },
    { code: 412, name: "Precondition Failed" },
    { code: 413, name: "Payload Too Large" },
    { code: 414, name: "URI Too Long" },
    { code: 415, name: "Unsupported Media Type" },
    { code: 416, name: "Range Not Satisfiable" },
    { code: 417, name: "Expectation Failed" },
    { code: 418, name: "I'm a Teapot" },
    { code: 421, name: "Misdirected Request" },
    { code: 422, name: "Unprocessable Entity" },
    { code: 423, name: "Locked" },
    { code: 424, name: "Failed Dependency" },
    { code: 425, name: "Too Early" },
    { code: 426, name: "Upgrade Required" },
    { code: 428, name: "Precondition Required" },
    { code: 429, name: "Too Many Requests" },
    { code: 431, name: "Request Header Fields Too Large" },
    { code: 451, name: "Unavailable For Legal Reasons" },
    { code: 500, name: "Internal Server Error" },
    { code: 501, name: "Not Implemented" },
    { code: 502, name: "Bad Gateway" },
    { code: 503, name: "Service Unavailable" },
    { code: 504, name: "Gateway Timeout" },
    { code: 505, name: "HTTP Version Not Supported" },
    { code: 506, name: "Variant Also Negotiates" },
    { code: 507, name: "Insufficient Storage" },
    { code: 508, name: "Loop Detected" },
    { code: 510, name: "Not Extended" },
    { code: 511, name: "Network Authentication Required" },
  ];

  const httpMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE",
  ];

  return (
    <DashboardLayout pageTitle="Requests">
      <div className="flex items-center w-full mb-7 gap-4">
        <TextInput
          placeholder="Search endpoint..."
          onChange={(e) => setEndpoint(e.target.value)}
        />
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
        <MultiSelect
          placeholder="All status codes"
          onValueChange={(e) => {
            let u = [];
            u.push(e);
            addQueryParam("status_codes", u.join("_"));
            //@ts-ignore
            setStatusCodes([...u]);
          }}
        >
          <>
            {httpStatusCodes.map((status) => (
              <MultiSelectItem value={status.code.toString()} key={status.code}>
                {status.code} {status.name}
              </MultiSelectItem>
            ))}
          </>
        </MultiSelect>

        <MultiSelect
          placeholder="All methods"
          onValueChange={(e) => {
            let u = [];
            u.push(e);
            addQueryParam("methods", u.join("_"));

            //@ts-ignore
            setMethods([...u]);
          }}
        >
          <>
            {httpMethods.map((method) => (
              <MultiSelectItem value={method} key={method.toLowerCase()}>
                {method}
              </MultiSelectItem>
            ))}
          </>
        </MultiSelect>
      </div>
      <RequestsTable data={requests} />
    </DashboardLayout>
  );
};

export default Requests;
