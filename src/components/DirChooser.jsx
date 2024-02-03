import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import propTypes from "prop-types";
import api from "../endpoints/api";

const DirChooser = ({ setPath }) => {
  const [folders, setFolders] = useState([]);
  const [chosenFolder, setChosenFolder] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const clickFolder = (foldername) => {
    setChosenFolder(foldername);
  };

  const submitChosenFolder = () => {
    closeModal();
    localStorage.setItem("path", chosenFolder);
    setPath(chosenFolder);
  };

  useEffect(() => {
    const getFolders = async () => {
      try {
        const res = await fetch(api.checkDirs);
        const data = await res.json();
        console.log(data);
        setFolders([...data]);
      } catch (error) {
        console.error(error);
      }
    };

    getFolders();
  }, []);
  return (
    <>
      <div className="fixed right-0 bottom-0 mr-4 mb-2">
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Choose Folder
        </button>
      </div>

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
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose Folder
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex justify-between text-center">
                      {folders.map((folder) => {
                        return (
                          <div
                            key={folder}
                            onClick={() => clickFolder(folder)}
                            className=" active:bg-slate-400"
                          >
                            <img
                              src="/images/folder-1484.png"
                              alt="folder"
                              width={80}
                            />
                            <figcaption>{folder}</figcaption>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={submitChosenFolder}
                    >
                      Choose
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

DirChooser.propTypes = {
  setPath: propTypes.func.isRequired,
};

export default DirChooser;
