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
import { formatTimeTaken } from "@/utils/formatTimeTaken";

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
                    item.statusCode >= 500
                      ? "red"
                      : item.statusCode >= 400
                      ? "orange"
                      : item.statusCode >= 300
                      ? "yellow"
                      : item.statusCode >= 100
                      ? "blue"
                      : "green"
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
