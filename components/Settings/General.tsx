import { useProjectStore } from "@/stores/projectStore";
import { Button, Flex, Text, TextInput } from "@tremor/react";

const General = () => {
  const { project } = useProjectStore();
  return (
    <div className="w-[450px] flex flex-col gap-4">
      <div className="">
        <p className="text-gray-300">Project name</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.name}
            className="!bg-transparent my-2"
          />
          <Button color="purple">Save</Button>
        </Flex>
      </div>
      <div className="">
        <p className="text-gray-300">API URL</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.apiUrl}
            className="!bg-transparent my-2"
          />
          <Button color="purple">Save</Button>
        </Flex>
      </div>
    </div>
  );
};

export default General;
