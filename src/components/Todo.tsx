import { useState } from "react";
import { TodoId, type Todo as TodoType } from "../types/types";
import { SuccessIcon } from "../icons/Icons";
import { ActionsTodo } from "./ActionsTodo";

interface Props extends Pick<TodoType, "uuid" | "content" | "completed"> {
  setCompleted: ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">) => void;
  setTitle: ({ uuid, content }: Pick<TodoType, "uuid" | "content">) => void;
  removeTodo: ({ uuid }: TodoId) => void;
}

export const Todo: React.FC<Props> = ({
  uuid,
  content,
  completed,
  removeTodo,
  setCompleted,
  setTitle,
}) => {
  const [EditedTitle, setEditedTitle] = useState(content);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleRemove = () => {
    setTimeout(() => {
      const currentTodo = document.getElementById(uuid);
      currentTodo?.classList.remove("animate-fadeIn");
      currentTodo?.classList.add("animate-fadeOut");

      currentTodo?.addEventListener("animationend", () => {
        currentTodo.remove();
        removeTodo({ uuid });
      });
    });
  };

  const handleSaveContent = () => {
    if (EditedTitle !== content) setTitle({ uuid, content: EditedTitle.trim() });

    if (EditedTitle === "") removeTodo({ uuid });
  };

  const handleChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setEditedTitle(target.value);

  return (
    <>
      <div
        id={uuid}
        className="flex items-center justify-between py-3 px-4 gap-5
          animate-fadeIn"
      >
        <div className="flex items-center gap-4">
          <label
            className="relative flex cursor-pointer items-center rounded-md"
            htmlFor={`checkbox-${uuid}`}
          >
            <input
              type="checkbox"
              className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3178c6] checked:bg-[#3178c6] checked:before:bg-[#3178c6] hover:before:opacity-10`}
              checked={completed}
              onChange={(e) =>
                setCompleted({ uuid, completed: e.target.checked })
              }
              id={`checkbox-${uuid}`}
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
          onChange={handleChangeContent}
          onBlur={handleSaveContent}
        ></textarea>

        <ActionsTodo
          isModalOpen={isModalOpen}
          handleRemove={handleRemove}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};
