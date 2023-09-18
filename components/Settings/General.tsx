import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { Button, Flex, TextInput } from "@tremor/react";
import { set } from "lodash";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const General = () => {
  const [name, setName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState("");
  const [slug, setSlug] = useState("");

  const { project, setProject } = useProjectStore();
  const { updateProject } = useProjectsStore();

  const handleUpdateProject = async (field: "name" | "apiUrl" | "slug") => {
    setLoading(field);
    try {
      await axios.patch(`/project/${project.id}`, {
        [field]: field === "name" ? name : field === "apiUrl" ? apiUrl : slug,
      });

      field === "name" &&
        setProject(name, project.id!, project.apiUrl, project.slug);
      field === "apiUrl" &&
        setProject(project.name, project.id!, apiUrl, project.slug);
      field === "slug" &&
        setProject(project.name, project.id!, project.apiUrl, slug);

      field === "name" && toast.success("Project name updated");
      field === "apiUrl" && toast.success("API URL updated");
      field === "slug" && toast.success("Project slug updated");

      field === "name" &&
        updateProject({
          name: name,
          apiUrl: project.apiUrl,
          slug: project.slug,
          id: project.id!,
        });

      field === "apiUrl" &&
        updateProject({
          name: project.name,
          apiUrl: apiUrl,
          slug: project.slug,
          id: project.id!,
        });

      field === "slug" &&
        updateProject({
          name: project.name,
          apiUrl: project.apiUrl,
          slug: slug,
          id: project.id!,
        });

      setLoading("");
      setName("");
      setApiUrl("");
      setSlug("");
    } catch (error: any) {
      toast.error(error.response.data.message || "Error updating project");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="lg:w-[450px] w-full flex flex-col gap-4">
      <div className="">
        <p className="text-gray-300">Project name</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.name}
            className="!bg-transparent my-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Button
            color="purple"
            onClick={() => handleUpdateProject("name")}
            disabled={loading === "name" || name === project.name || !name}
          >
            {loading === "name" ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </div>
      <div className="">
        <p className="text-gray-300">API URL</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.apiUrl}
            className="!bg-transparent my-2"
            onChange={(e) => setApiUrl(e.target.value)}
            value={apiUrl}
          />
          <Button
            color="purple"
            onClick={() => handleUpdateProject("apiUrl")}
            disabled={
              loading === "apiUrl" || apiUrl === project.apiUrl || !apiUrl
            }
          >
            {loading === "apiUrl" ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </div>
      <div className="">
        <p className="text-gray-300">Project slug</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.slug}
            className="!bg-transparent my-2"
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            value={slug}
          />
          <Button
            color="purple"
            onClick={() => handleUpdateProject("slug")}
            disabled={loading === "slug" || slug === project.slug || !slug}
          >
            {loading === "slug" ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default General;
