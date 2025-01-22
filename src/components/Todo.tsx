import { useState } from "react";
import { TodoId, type Todo as TodoType } from "../types/types";
import { SuccessIcon } from "../icons/Icons";

interface Props extends Pick<TodoType, "uuid" | "content" | "completed"> {
  isEditing: string;
  setIsEditing: (completed: string) => void;
  setCompleted: ({ uuid, completed }: Pick<TodoType, "uuid" | "completed">) => void;
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
  setIsEditing,
}) => {
  const [EditedTitle, setEditedTitle] = useState(content);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      setEditedTitle(EditedTitle.trim());

      if (EditedTitle !== content) {
        setTitle({ uuid, content: EditedTitle });
      }

      if (EditedTitle === "") removeTodo({ uuid });

      setIsEditing("");
    }

    if (e.key === "Escape") {
      setEditedTitle(content);
      setIsEditing("");
    }
  };

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
          onChange={(e) => {
            setEditedTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setIsEditing("");
          }}
        ></textarea>
      </div>
    </>
  );
};
