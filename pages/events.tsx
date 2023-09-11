import DashboardLayout from "@/layouts/DashboardLayout";
import {
  Button,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useEffect, useState } from "react";
import { httpStatusCodes } from "@/lib/statusCodes";
import { MdAddCircleOutline } from "react-icons/md";
import { useProjectStore } from "@/stores/projectStore";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { httpMethods } from "@/lib/methods";
import EventsTable from "@/components/EventsTable";

const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [when, setWhen] = useState("");
  const [action, setAction] = useState<any>();
  const [addSecondCondition, setAddSecondCondition] = useState(false);
  const [addThirdCondition, setAddThirdCondition] = useState(false);
  const [conditions, setConditions] = useState<any[]>([]);
  const [and1, setAnd1] = useState("");
  const [and2, setAnd2] = useState("");
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
      setShowModal(false);
      setConditions([]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDropDown = (hidden: string[], and: string) => {
    const types = [
      { value: "endpoint", label: "Endpoint" },
      { value: "status-code", label: "Status Code" },
      { value: "method", label: "Method" },
    ];

    return (
      <Select
        onValueChange={(value) => {
          if (and === "and1") {
            setAnd1(value);
            return;
          }
          if (and === "and2") {
            setAnd2(value);
            return;
          }
        }}
      >
        {types
          .filter((type) => !hidden.includes(type.value))
          .map((type) => (
            <SelectItem value={type.value} key={type.value}>
              {type.label}
            </SelectItem>
          ))}
      </Select>
    );
  };

  const renderSelection = (value: string) => {
    return (
      <>
        {value === "endpoint" && (
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
        {value === "status-code" && (
          <SearchSelect
            placeholder="Select status code"
            onValueChange={(e) => {
              const newStatusCode = Number(e);
              const existingStatusCodeIndex = conditions.findIndex(
                (condition) => condition.statusCode
              );
              const newCondition = { statusCode: newStatusCode };
              if (existingStatusCodeIndex !== -1) {
                const updatedConditions = [...conditions];
                updatedConditions[existingStatusCodeIndex] = newCondition;
                setConditions(updatedConditions);
              } else {
                setConditions([...conditions, newCondition]);
              }
            }}
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
        {value === "method" && (
          <SearchSelect
            placeholder="Select a method"
            onValueChange={(e) => {
              const newMethod = e;
              const existingMethodIndex = conditions.findIndex(
                (condition) => condition.method
              );
              const newCondition = { method: newMethod };
              if (existingMethodIndex !== -1) {
                const updatedConditions = [...conditions];
                updatedConditions[existingMethodIndex] = newCondition;
                setConditions(updatedConditions);
              } else {
                setConditions([...conditions, newCondition]);
              }
            }}
          >
            {httpMethods.map((method) => (
              <SearchSelectItem value={method} key={method}>
                {method}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        )}
      </>
    );
  };

  const [events, setEvents] = useState<[]>([]);

  useEffect(() => {
    if (project.id) {
      (async () => {
        try {
          const { data } = await axios(`/project/${project.id}/events`);
          console.log(data);
          setEvents(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [project.id]);

  return (
    <>
      <DashboardLayout pageTitle="Events">
        {!showModal && (
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
        )}
        {showModal && (
          <div className="mt-5">
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
                  {renderSelection(when)}
                </div>
              )}

              {addSecondCondition && (
                <>
                  <div className="flex items-center gap-3 w-full">
                    <p className="bg-purple-700 rounded-md px-3 py-2">And</p>
                    {renderDropDown([when], "and1")}
                  </div>
                  {and1 && (
                    <div className="flex items-center gap-3 w-full">
                      <p className="bg-purple-700 rounded-md px-3 py-2">Is</p>
                      {renderSelection(and1)}
                    </div>
                  )}
                </>
              )}
              {when && (
                <button
                  onClick={() => setAddSecondCondition(!addSecondCondition)}
                  className="flex items-center text-gray-400 gap-1"
                >
                  {addSecondCondition ? (
                    <HiOutlineMinusCircle />
                  ) : (
                    <MdAddCircleOutline />
                  )}{" "}
                  {addSecondCondition ? "Remove" : "Add"} second condition
                </button>
              )}
              {addThirdCondition && (
                <>
                  <div className="flex items-center gap-3 w-full">
                    <p className="bg-purple-700 rounded-md px-3 py-2">And</p>
                    {renderDropDown([when, and1], "and2")}
                  </div>
                  {and2 && (
                    <div className="flex items-center gap-3 w-full">
                      <p className="bg-purple-700 rounded-md px-3 py-2">Is</p>
                      {renderSelection(and2)}
                    </div>
                  )}
                </>
              )}
              {and1 && (
                <button
                  onClick={() => setAddThirdCondition(!addThirdCondition)}
                  className="flex items-center text-gray-400 gap-1"
                >
                  {addThirdCondition ? (
                    <HiOutlineMinusCircle />
                  ) : (
                    <MdAddCircleOutline />
                  )}{" "}
                  {addThirdCondition ? "Remove" : "Add"} third condition
                </button>
              )}
              {conditions.length > 0 && (
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
              )}
              <center className="w-full mt-5">
                <Button
                  icon={TbLayoutGridAdd}
                  color="purple"
                  onClick={addNewEvent}
                  disabled={!name || conditions.length === 0 || !action}
                >
                  Publish Event
                </Button>
              </center>
            </div>
          </div>
        )}
        <div className="mt-5">
          <EventsTable events={events} />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Events;
