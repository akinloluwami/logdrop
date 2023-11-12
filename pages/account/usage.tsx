import { axios } from "@/configs/axios";
import AccountLayout from "@/layouts/AccountLayout";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  DonutChart,
  ProgressCircle,
  Title,
} from "@tremor/react";

const Usage = () => {
  const [start, setStart] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(dayjs().format("YYYY-MM-DD"));

  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(start),
    to: new Date(end),
  });

  const [usage, setUsage] = useState<{
    percentage: number;
    usage: number;
    quota: number;
    usageByProject: {
      name: string;
      logs: number;
    }[];
  } | null>(null);

  const fecthUsage = async () => {
    const { data } = await axios.get(`/me/usage?from=${start}&to=${end}`);
    setUsage(data);
  };

  useEffect(() => {
    fecthUsage();
  }, [start, end]);

  return (
    <AccountLayout>
      <div className="">
        <DateRangePicker
          className="mb-5"
          value={value}
          onValueChange={(value) => {
            setValue(value);
            setStart(dayjs(value.from).format("YYYY-MM-DD"));
            setEnd(dayjs(value.to).format("YYYY-MM-DD"));
          }}
        />
        <Card className="flex items-center justify-between px-28">
          <div className="">
            <Title className="text-center mb-5 text-xl">Requests</Title>
            <ProgressCircle
              value={usage?.percentage}
              radius={80}
              strokeWidth={15}
              tooltip={`Requests: ${usage?.usage}, Quota: ${usage?.quota}`}
              size="lg"
              color="purple"
            >
              <span>{usage?.percentage}%</span>
            </ProgressCircle>
          </div>

          <div className="">
            <Title className="text-center mb-5 text-xl">
              Requests by projects
            </Title>
            <DonutChart
              data={usage?.usageByProject!}
              index="name"
              category="logs"
              colors={[
                "purple",
                "blue",
                "amber",
                "cyan",
                "emerald",
                "fuchsia",
                "gray",
                "green",
              ]}
              variant="pie"
              valueFormatter={(value) => `${value} requests`}
            />
          </div>
        </Card>
        {/* <Card className="flex flex-col">
          <Title className="text-center mb-5 text-xl">Events</Title>
          <ProgressCircle
            value={usage?.percentage}
            radius={80}
            strokeWidth={15}
            tooltip={`Requests: ${usage?.usage}, Quota: ${usage?.quota}`}
            size="lg"
            color="purple"
          >
            <span>{usage?.percentage}%</span>
          </ProgressCircle>
        </Card> */}
      </div>
    </AccountLayout>
  );
};

export default Usage;
