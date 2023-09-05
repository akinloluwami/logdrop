import { FC } from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import moment from "moment";
import Link from "next/link";

interface Props {
  data: {
    uuid: string;
    endpoint: string;
    method: string;
    statusCode: number;
    elapsedDuration: number;
    createdAt: string;
  }[];
}

const head = ["Endpoint", "Method", "Status", "Time Taken", "Created"];

const formatTimeTaken = (ms: number) => {
  if (ms > 1000) {
    const secondsValue = ms / 1000;
    return secondsValue.toFixed(2) + "s";
  } else {
    return ms + "ms";
  }
};

const RequestsTable: FC<Props> = ({ data }) => {
  return (
    <Card className="!bg-transparent">
      <Table className="">
        <TableHead>
          <TableRow>
            {head.map((item, i) => (
              <TableHeaderCell className="font-semibold" key={i}>
                {item}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <Link
                  href={`/logs/${item.uuid}`}
                  className="border-b border-dashed border-gray-600 hover:border-gray-400 transition-colors hover:text-gray-400"
                >
                  {item.endpoint}
                </Link>
              </TableCell>
              <TableCell>
                <Text className="font-semibold">{item.method}</Text>
              </TableCell>
              <TableCell>
                <Badge
                  color={
                    item.statusCode === 200 || item.statusCode === 201
                      ? "green"
                      : item.statusCode === 304
                      ? "blue"
                      : "red"
                  }
                >
                  {item.statusCode}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{formatTimeTaken(item.elapsedDuration)}</Text>
              </TableCell>
              <TableCell>
                <Text>{moment(item.createdAt).fromNow()}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RequestsTable;
