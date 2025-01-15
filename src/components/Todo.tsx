import { useState } from "react";
import { TodoId, type Todo as TodoType } from "../types/types";
import { CancelIcon, MoreIcon, SuccessIcon, TrashIcon } from "../icons/Icons";
import { Modal } from "./Modal";

interface Props extends TodoType {
  isEditing: string;
  setIsEditing: (completed: string) => void;
  setCompleted: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void;
  setTitle: ({ id, title }: Pick<TodoType, "id" | "title">) => void;
  removeTodo: ({ id }: TodoId) => void;
}

const groups = [
  { id: "portfolio", name: "Portfolio" },
  { id: "projects", name: "Proyectos" },
  { id: "personal-life", name: "Vida Personal" },
];

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  removeTodo,
  setCompleted,
  setTitle,
  setIsEditing,
}) => {
  const [EditedTitle, setEditedTitle] = useState(title);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSelectedGroup, setSelectedGroup] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleCheckboxChange = (groupId: string) => {
    setSelectedGroups(
      (prevSelected) =>
        prevSelected.includes(groupId)
          ? prevSelected.filter((id) => id !== groupId) // Deselecciona
          : [...prevSelected, groupId] // Selecciona
    );
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleRemove = () => {
    setTimeout(() => {
      const currentTodo = document.getElementById(id);
      currentTodo?.classList.remove("animate-fadeIn");
      currentTodo?.classList.add("animate-fadeOut");

      currentTodo?.addEventListener("animationend", () => {
        currentTodo.remove();
        removeTodo({ id });
      });
    });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      setEditedTitle(EditedTitle.trim());

      if (EditedTitle !== title) {
        setTitle({ id, title: EditedTitle });
      }

      if (EditedTitle === "") removeTodo({ id });

      setIsEditing("");
    }

    if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing("");
    }
  };

  return (
    <>
      <div
        id={id}
        className="flex items-center justify-between py-3 px-4 gap-5
          animate-fadeIn"
      >
        <div className="flex items-center gap-4">
          <label
            className="relative flex cursor-pointer items-center rounded-md"
            htmlFor={`checkbox-${id}`}
          >
            <input
              type="checkbox"
              className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3178c6] checked:bg-[#3178c6] checked:before:bg-[#3178c6] hover:before:opacity-10`}
              checked={completed}
              onChange={(e) =>
                setCompleted({ id, completed: e.target.checked })
              }
              id={`checkbox-${id}`}
            />
            {completed && (
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <SuccessIcon className="size-4" />
              </div>
            )}
          </label>
        </div>

        <textarea
          className="w-full bg-transparent rounded-md p-1 font-medium text-lg focus:outline-none resize-none"
          value={EditedTitle}
          onChange={(e) => {
            setEditedTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setIsEditing("");
          }}
        ></textarea>

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
