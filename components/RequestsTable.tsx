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

interface Props {
  data: {
    endpoint: string;
    method: string;
    status: number;
    timeTaken: string;
    createdAt: string;
  }[];
}

const head = ["Endpoint", "Method", "Status", "Time Taken", "Created"];

const SnapTable: FC<Props> = ({ data }) => {
  return (
    <Card className="!bg-transparent">
      <Table className="">
        <TableHead>
          <TableRow>
            {head.map((item) => (
              <TableHeaderCell className="font-semibold">
                {item}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.endpoint}</TableCell>
              <TableCell>
                <Text className="font-semibold">{item.method}</Text>
              </TableCell>
              <TableCell>
                <Text className="font-semibold">
                  <Badge
                    color={
                      item.status === 200 || item.status === 201
                        ? "green"
                        : "red"
                    }
                  >
                    {item.status}
                  </Badge>
                </Text>
              </TableCell>
              <TableCell>
                <Text>{item.timeTaken}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.createdAt}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SnapTable;
