import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { Dialog, Transition } from "@headlessui/react";
import { TextInput } from "@tremor/react";
import { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineLightningBolt } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddNewProject: FC<Props> = ({ isOpen, closeModal }) => {
  const { addNewProject } = useProjectsStore();
  const { setProject } = useProjectStore();

  const [newProject, setNewProject] = useState({
    apiUrl: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAddProject = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("/project", newProject);
      const { name, id, apiUrl } = data.project;
      addNewProject(data.project);
      setProject(name, id, apiUrl);
      closeModal();
      toast.success("Project created!");
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/15 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-sm shadow-purple-500/20 transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Create a new project
                  </Dialog.Title>
                  <div className="mt-2">
                    <TextInput
                      className="my-5"
                      placeholder="Project name"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                    />
                    <TextInput
                      className="my-5"
                      placeholder="API URL"
                      value={newProject.apiUrl}
                      onChange={(e) =>
                        setNewProject({ ...newProject, apiUrl: e.target.value })
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleAddProject}
                      disabled={
                        !newProject.apiUrl || !newProject.name || loading
                      }
                    >
                      {loading ? (
                        <CgSpinner size={20} className="animate-spin" />
                      ) : (
                        <>
                          <HiOutlineLightningBolt size={20} />
                          Launch!
                        </>
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddNewProject;
