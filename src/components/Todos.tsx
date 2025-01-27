import { useState } from "react";
import { type Todo as TodoType, type TodoId, Group } from "../types/types";
import { Todo } from "./Todo";
import { Modal } from "./Modal";
import { SuccessIcon } from "../icons/Icons";

interface Props {
  todos: TodoType[];
  groups: Group[];
  setCompleted: ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">) => void;
  setTitle: ({ uuid, content }: Pick<TodoType, "uuid" | "content">) => void;
  removeTodo: ({ uuid }: TodoId) => void;
}

export const Todos: React.FC<Props> = ({
  todos,
  groups,
  removeTodo,
  setCompleted,
  setTitle,
}) => {
  const [selectedGroups, setSelectedGroups] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleCheckboxChange = (groupId: number) =>
    setSelectedGroups((prev) => (prev === groupId ? null : groupId));

  return (
    <>
      <ul className="my-4">
        {todos.map(({ uuid, content, completed }) => (
          <li key={uuid}>
            <Todo
              key={uuid}
              uuid={uuid}
              content={content}
              completed={completed}
              removeTodo={removeTodo}
              setCompleted={setCompleted}
              setTitle={setTitle}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-6">Tus grupos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groups.map(({ id, group_name }, index) => (
            <div
              key={index}
              title={group_name}
              className={`col-span-1 p-3 rounded-lg flex items-center gap-2 bg-neutral-700/30 ${
                selectedGroups !== null && selectedGroups != id
                  ? "opacity-50"
                  : ""
              }`}
            >
              <label
                className="relative flex cursor-pointer items-center rounded-md"
                htmlFor={`checkbox-${id}`}
              >
                <input
                  type="checkbox"
                  className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-9 before:w-9 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3178c6] checked:bg-[#3178c6] checked:before:bg-[#3178c6] hover:before:opacity-10`}
                  checked={selectedGroups === id}
                  onChange={() => handleCheckboxChange(id)}
                  id={`checkbox-${id}`}
                />
                {selectedGroups === id && (
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <SuccessIcon className="size-4" />
                  </div>
                )}
              </label>
              <label className="truncate">{group_name}</label>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
