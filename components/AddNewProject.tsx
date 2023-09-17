import { Dialog, Transition } from "@headlessui/react";
import { TextInput } from "@tremor/react";
import { FC, Fragment, useState } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddNewProject: FC<Props> = ({ isOpen, closeModal }) => {
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
                    <TextInput className="my-5" placeholder="Project name" />
                    <TextInput className="my-5" placeholder="API URL" />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 items-center gap-2"
                      onClick={closeModal}
                    >
                      <HiOutlineLightningBolt size={20} />
                      Launch!
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
