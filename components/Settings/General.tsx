import { Button, Flex, Text, TextInput } from "@tremor/react";

const General = () => {
  return (
    <div className="w-[450px] flex flex-col gap-4">
      <div className="">
        <p className="text-gray-300">Project name</p>
        <Flex className="gap-2">
          <TextInput
            placeholder="Project name"
            className="!bg-transparent my-2"
          />
          <Button color="purple">Save</Button>
        </Flex>
      </div>
      <div className="">
        <p className="text-gray-300">API endpoint</p>
        <Flex className="gap-2">
          <TextInput
            placeholder="API endpoint"
            className="!bg-transparent my-2"
          />
          <Button color="purple">Save</Button>
        </Flex>
      </div>
    </div>
  );
};

export default General;
