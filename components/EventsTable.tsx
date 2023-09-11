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
import { EventProps } from "@/interfaces";

interface Props {
  events: EventProps[];
}

const head = [
  "Name",
  "Action",
  "Conditions",
  "Created At",
  "Times Triggered",
  "Last Triggered",
];

const EventsTable: FC<Props> = ({ events }) => {
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
          {events.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text className="font-semibold">{item.action}</Text>
              </TableCell>
              <TableCell>{item.conditions.length}</TableCell>
              <TableCell>
                <Text>{moment(item.createdAt).fromNow()}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.timesTriggered}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {(item.lastTriggered &&
                    moment(item.lastTriggered).fromNow()) ||
                    "Never"}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default EventsTable;
