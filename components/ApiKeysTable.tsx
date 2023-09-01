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
  Button,
} from "@tremor/react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  data: {
    id: number;
    name: string;
    key: string;
    timesUsed: number;
    lastUsed: string;
    created: string;
  }[];
}

const head = ["Name", "Key", "Times used", "Last Used", "Created", ""];

const ApiKeysTable: FC<Props> = ({ data }) => {
  return (
    <div className="">
      <Button className="mb-5" color="purple" icon={AiOutlinePlus}>
        Create API key
      </Button>
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
            {data.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{key.name}</TableCell>
                <TableCell>
                  <Text>{key.key}</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold">{key.timesUsed}</Text>
                </TableCell>
                <TableCell>{key.lastUsed}</TableCell>
                <TableCell>{key.created}</TableCell>
                <TableCell>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <HiMiniEllipsisVertical />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ApiKeysTable;
