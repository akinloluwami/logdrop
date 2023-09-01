import { Button, Flex, Text, TextInput } from "@tremor/react";

const General = () => {
  return (
    <div className="w-[450px]">
      <p className="text-gray-300">Project name</p>
      <Flex className="gap-2">
        <TextInput
          placeholder="Project name"
          className="!bg-transparent my-2"
        />
        <Button color="purple">Save</Button>
      </Flex>
    </div>
  );
};

export default General;
