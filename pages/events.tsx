import Cooking from "@/components/Cooking";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  Button,
  Card,
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useState } from "react";
import Modal from "@/components/Modal";
import { httpStatusCodes } from "@/lib/statusCodes";
import { MdAddCircleOutline } from "react-icons/md";
import { debounce } from "lodash";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";

const Events = () => {
  const [showModal, setShowModal] = useState(true);
  const [when, setWhen] = useState("");
  const [is, setIs] = useState<any>();
  const [action, setAction] = useState<any>();
  const [addSecondCondition, setAddSecondCondition] = useState(false);
  const [conditions, setConditions] = useState<any[]>([]);

  const [name, setName] = useState("");

  const { project } = useProjectStore();
  const addNewEvent = async () => {
    try {
      const { data } = await axios.post(`/project/${project.id}/events`, {
        name,
        conditions,
        action,
      });
      console.log(data);
      toast.success("Event created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardLayout pageTitle="Events">
        <Button
          icon={TbLayoutGridAdd}
          color="purple"
          onClick={() => {
            console.log("hey");
            setShowModal(true);
          }}
        >
          Create New Event
        </Button>
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <div className="text-sm border border-purple-500/40 bg-black px-5 py-7 rounded-md w-[500px] flex flex-col gap-5 items-start">
            <TextInput
              placeholder="Event name"
              onChange={(e) => setName(e.target.value)}
            />

            <h1>Choose conditions</h1>
            <div className="flex items-center gap-5 w-full">
              <p className="bg-purple-700 rounded-md px-3 py-2">When</p>
              <Select
                className=""
                placeholder="Select when"
                onValueChange={(value) => setWhen(value)}
              >
                <SelectItem value="endpoint">Endpoint</SelectItem>
                <SelectItem value="status-code">Status Code</SelectItem>
                <SelectItem value="method">Method</SelectItem>
              </Select>
            </div>
            {when && (
              <div className="flex items-center gap-3 w-full">
                <p className="bg-purple-700 rounded-md px-3 py-2">Is</p>
                {when === "endpoint" && (
                  <TextInput
                    placeholder="Enter endpoint"
                    onChange={(e) => {
                      const newEndpoint = e.target.value;

                      const existingEndpointIndex = conditions.findIndex(
                        (condition) => condition.endpoint
                      );

                      const newCondition = { endpoint: newEndpoint };

                      if (existingEndpointIndex !== -1) {
                        const updatedConditions = [...conditions];
                        updatedConditions[existingEndpointIndex] = newCondition;
                        setConditions(updatedConditions);
                      } else {
                        setConditions([...conditions, newCondition]);
                      }
                    }}
                  />
                )}
                {when === "status-code" && (
                  <SearchSelect
                    placeholder="Select status code"
                    onValueChange={(value) => setIs(value)}
                  >
                    {httpStatusCodes.map((status) => (
                      <SearchSelectItem
                        value={status.code.toString()}
                        key={status.code}
                      >
                        {status.code} {status.name}
                      </SearchSelectItem>
                    ))}
                  </SearchSelect>
                )}
              </div>
            )}
            {/* <button
              onClick={() => setAddSecondCondition(!addSecondCondition)}
              className="flex items-center text-gray-400 gap-1"
            >
              <MdAddCircleOutline /> Add second condition
            </button> */}
            {addSecondCondition && (
              <>
                <div className="flex items-center gap-3 w-full">
                  <p className="bg-purple-700 rounded-md px-3 py-2">And</p>
                  <Select
                    className="w-[100px]"
                    defaultValue="status-code"
                    onValueChange={(value) => setWhen(value)}
                  >
                    <SelectItem value="status-code">Status Code</SelectItem>
                    <SelectItem value="method">Method</SelectItem>
                  </Select>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <p className="bg-purple-700 rounded-md px-3 py-2">Is</p>
                  <SearchSelect placeholder="Select status code">
                    {httpStatusCodes.map((status) => (
                      <SearchSelectItem
                        value={status.code.toString()}
                        key={status.code}
                      >
                        {status.code} {status.name}
                      </SearchSelectItem>
                    ))}
                  </SearchSelect>
                </div>
              </>
            )}
            <div className="flex items-center gap-3 w-full">
              <p className="bg-purple-700 rounded-md px-3 py-2">Then</p>
              <Select
                placeholder="Select action"
                onValueChange={(value) => setAction(value)}
              >
                {/* <SelectItem value="slack">Send Slack notification</SelectItem> */}
                <SelectItem value="email">Send email</SelectItem>
              </Select>
            </div>
            <center className="w-full mt-5">
              <Button
                icon={TbLayoutGridAdd}
                color="purple"
                onClick={addNewEvent}
              >
                Create Event
              </Button>
            </center>
          </div>
        </Modal>
      </DashboardLayout>
    </>
  );
};

export default Events;
