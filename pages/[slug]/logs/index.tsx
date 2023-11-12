import DashboardLayout from "@/layouts/DashboardLayout";
import RequestsTable from "@/components/RequestsTable";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import { debounce } from "lodash";

import {
  Button,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { httpStatusCodes } from "@/lib/statusCodes";
import { httpMethods } from "@/lib/methods";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { project } = useProjectStore();

  const [methods, setMethods] = useState<string[]>([]);
  const [statusCodes, setStatusCodes] = useState<string[]>([]);
  const [debouncedEndpoint, setDebouncedEndpoint] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");

  const debouncedSearch = debounce((value) => {
    setDebouncedEndpoint(value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase();

    if (newValue) {
      // addQueryParam("endpoint", newValue);
    } else {
      // deleteQueryParam("endpoint");
    }
    debouncedSearch(newValue);
  };

  const handleStatusCodesChange = (selectedValues: string[]) => {
    setStatusCodes(selectedValues);
    if (selectedValues.length > 0) {
      // addQueryParam("status_codes", selectedValues.join("_"));
    } else {
      // deleteQueryParam("status_codes");
    }
  };

  const handleMethodsChange = (selectedValues: string[]) => {
    setMethods(selectedValues);
    if (selectedValues.length > 0) {
      // addQueryParam("methods", selectedValues.join("_"));
    } else {
      // deleteQueryParam("methods");
    }
  };

  const [page, setPage] = useState(0);

  const [requestsLength, setRequestsLength] = useState<number | null>(null);

  useEffect(() => {
    // setSelectedDateRange((router?.query?.dateRange as string) || "all");

    if (project.id) {
      (async () => {
        try {
          const encodedURL = `project/${project?.id}/logs?status_codes=${encodeURIComponent(
            statusCodes.join("_")
          )}&methods=${encodeURIComponent(
            methods.join("_")
          )}&endpoint=${encodeURIComponent(
            debouncedEndpoint
          )}&dateRange=${encodeURIComponent(
            selectedDateRange
          )}&pageSize=${20}&page=${page}`;
          const { data } = await axios(encodedURL);
          setRequests(data);
          setRequestsLength(data.length);
        } catch (error) {}
      })();
    }
  }, [
    project.id,
    statusCodes,
    methods,
    debouncedEndpoint,
    selectedDateRange,
    page,
    // router.query,
  ]);
  return (
    <DashboardLayout pageTitle="Logs">
      <div className="flex items-center w-full mb-7 gap-4 flex-wrap lg:flex-nowrap">
        <TextInput
          placeholder="Search endpoint..."
          onChange={handleSearchChange}
        />
        <Select
          defaultValue={selectedDateRange}
          onValueChange={(value) => {
            const selectedValue = value;
            setSelectedDateRange(selectedValue);
            // addQueryParam("dateRange", selectedValue);
          }}
        >
          <SelectItem value="15m">Last 15 minutes</SelectItem>
          <SelectItem value="30m">Last 30 minutes</SelectItem>
          <SelectItem value="1h">Last 1 hour</SelectItem>
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
          onValueChange={handleStatusCodesChange}
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
          onValueChange={handleMethodsChange}
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
      <div className="mt-5 flex gap-5">
        <Button
          color="purple"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Prev
        </Button>
        <Button
          color="purple"
          onClick={() => setPage(page + 1)}
          disabled={requestsLength === null || requestsLength < 20}
        >
          Next
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Requests;
