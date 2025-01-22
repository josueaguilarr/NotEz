import { useState } from "react";
import { CancelIcon, MoreIcon, SuccessIcon, TrashIcon } from "../icons/Icons";
import { Modal } from "./Modal";

interface Props {
  isModalOpen: boolean;
  handleRemove: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const groups = [
  { id: "portfolio", name: "Portfolio" },
  { id: "projects", name: "Proyectos" },
  { id: "personal-life", name: "Vida Personal" },
];

export const ActionsTodo: React.FC<Props> = ({
  isModalOpen,
  handleRemove,
  openModal,
  closeModal,
}) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleCheckboxChange = (groupId: string) => {
    setSelectedGroups(
      (prevSelected) =>
        prevSelected.includes(groupId)
          ? prevSelected.filter((id) => id !== groupId)
          : [...prevSelected, groupId]
    );
  };

  return (
    <>
      <div>
        <span className="group relative">
          <div className="absolute left-[100%] translate-x-[%50] hidden group-hover:block min-w-28">
            <div className="px-1 py-1 bg-neutral-800/40 border border-neutral-800/60 rounded-lg">
              <p
                onClick={handleRemove}
                className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
              >
                <TrashIcon className="size-3" />
                Eliminar
              </p>
              <p
                onClick={openModal}
                className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
              >
                <CancelIcon className="size-3 rotate-45" />
                Agregar a grupo
              </p>
            </div>
          </div>
          <span>
            <MoreIcon className="size-6" />
          </span>
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">Agregar tarea a grupo(s)</h2>
        {groups.map(({ id, name }) => (
          <div className="flex items-center gap-2 my-4">
            <label
              className="relative flex cursor-pointer items-center rounded-md"
              htmlFor={`checkbox-${id}`}
            >
              <input
                type="checkbox"
                className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3178c6] checked:bg-[#3178c6] checked:before:bg-[#3178c6] hover:before:opacity-10`}
                checked={selectedGroups.includes(id)}
                onChange={() => {
                  handleCheckboxChange(id);
                }}
                id={`checkbox-${id}`}
              />
              {selectedGroups.includes(id) && (
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <SuccessIcon className="size-4" />
                </div>
              )}
            </label>
            <label htmlFor="">{name}</label>
          </div>
        ))}
      </Modal>
    </>
  );
};
