import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button,
  Flex,
  Title,
  TextInput,
} from "@tremor/react";
import moment from "moment";
import { EventProps } from "@/interfaces";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { Popover } from "@headlessui/react";
import { MdOutlineDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FC, useState } from "react";
import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import toast from "react-hot-toast";

interface Props {
  events: EventProps[];
  onDelete: (id: number) => void;
}

const head = [
  "Name",
  "Action",
  "Conditions",
  "Created",
  "Times Triggered",
  "Last Triggered",
  "",
];

const EventsTable: FC<Props> = ({ events, onDelete }) => {
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const { project } = useProjectStore();

  const [confirmationText, setConfirmationText] = useState<string>("");

  const deleteEvent = async () => {
    toast.promise(
      axios.delete(`/project/${project.id}/events/${selectedEvent?.id}`),
      {
        loading: "Deleting...",
        success: "Event deleted!",
        error: "Failed to delete event.",
      }
    );
    setSelectedEvent(null);
    setConfirmationText("");
    onDelete(selectedEvent?.id!);
  };

  return (
    <div className="relative">
      <div
        className={`w-full fixed right-0 z-40 flex items-center justify-center top-0 h-screen bg-black/40 backdrop-blur-md transition-opacity ${
          selectedEvent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSelectedEvent(null)}
      >
        <Card
          className="lg:w-[500px] w-[95%]"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex className="mb-3">
            <Title>Delete Event</Title>
            <button onClick={() => setSelectedEvent(null)}>
              <IoClose size={20} className="text-white hover:text-red-500" />
            </button>
          </Flex>
          <p className="text-white">
            Are you sure you want to delete the{" "}
            <span className="font-semibold">{selectedEvent?.name}</span> event?
          </p>
          <p className="font-bold text-red-500">This cannot be undone.</p>
          <div className="mt-5">
            <p>
              Type <span className="font-bold">DELETE</span> to confirm.
            </p>
            <TextInput
              placeholder=""
              className="mt-1"
              onChange={(e) => setConfirmationText(e.target.value)}
              value={confirmationText}
            />
            <Button
              className="mt-3"
              color="red"
              disabled={confirmationText !== "DELETE"}
              onClick={deleteEvent}
            >
              Delete Event
            </Button>
          </div>
        </Card>
      </div>
      <Card className="!bg-transparent">
        <Table className="">
          <TableHead>
            <TableRow>
              {head.map((event, i) => (
                <TableHeaderCell className="font-semibold" key={i}>
                  {event}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, i) => (
              <TableRow key={i}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  <Text className="font-semibold">{event.action}</Text>
                </TableCell>
                <TableCell>{event.conditions.length}</TableCell>
                <TableCell>
                  <Text>{moment(event.createdAt).fromNow()}</Text>
                </TableCell>
                <TableCell>
                  <Text>{event.timesTriggered}</Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {(event.lastTriggered &&
                      moment(event.lastTriggered).fromNow()) ||
                      "Never"}
                  </Text>
                </TableCell>
                <TableCell className="">
                  <Popover className="">
                    <Popover.Button>
                      <HiOutlineEllipsisVertical size={22} />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-2 z-10 bg-black border border-white/20 px-10 py-3 rounded-md">
                      <button
                        onClick={() =>
                          setSelectedEvent({
                            id: event.id,
                            name: event.name,
                          })
                        }
                        className="flex gap-2 items-center hover:text-red-500 transition-colors"
                      >
                        <MdOutlineDelete />
                        Delete
                      </button>
                    </Popover.Panel>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default EventsTable;
