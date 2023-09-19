import { faker } from "@faker-js/faker";
import { Card, Text, Title } from "@tremor/react";
import Link from "next/link";
import { FC } from "react";
import { TbLayoutList } from "react-icons/tb";
import { Sparklines, SparklinesLine } from "react-sparklines";
import millify from "millify";

interface Props {
  project: {
    name: string;
    apiUrl: string;
    slug: string;
    sparkline: number[];
    logs: number;
    averageRequestsPerHour: number;
  };
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { name, apiUrl, slug, sparkline, logs, averageRequestsPerHour } =
    project;
  return (
    <Link
      href={`${slug}/overview`}
      className="w-full max-w-[400px] h-[230px] border border-gray-600/70 rounded-md hover:border-purple-600 transition-colors duration-300 ease-in-out"
    >
      <div className="mb-4 w-full h-2 bg-transparent"></div>
      <Sparklines data={sparkline} width={400} height={50} margin={5}>
        <SparklinesLine
          style={{
            fill: "none",
            stroke: "rgb(147, 51, 234)",
            strokeWidth: 0.5,
          }}
        />
      </Sparklines>
      <div className="px-6 w-full">
        <div className="w-full flex items-end justify-end">
          <Text>
            {averageRequestsPerHour !== 0 && averageRequestsPerHour < 1
              ? averageRequestsPerHour.toFixed(2)
              : averageRequestsPerHour}{" "}
            requests/h
          </Text>
        </div>
        <div className="mt-3">
          <Title className="font-semibold">{name}</Title>
          <Text className="text-sm text-gray-500">{apiUrl}</Text>
          <div className="flex items-center mt-7">
            <TbLayoutList className="mr-1" /> {millify(logs)} requests
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
