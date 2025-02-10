import { useState } from "react";
import { SearchIcon } from "../icons/Icons";
import { Note as NoteType, type NoteIdPick, Group } from "../types/types";
import { Note } from "./Note";

interface Props {
  notes: NoteType[];
  groups: Group[];
  isAuthenticated: boolean;
  setCompleted: ({
    uuid,
    completed,
  }: Pick<NoteType, "uuid" | "completed">) => void;
  setTitle: ({ uuid, content }: Pick<NoteType, "uuid" | "content">) => void;
  removeNote: ({ uuid }: NoteIdPick) => void;
  moveNoteToGroup: ({
    id_group,
    uuid,
  }: Pick<NoteType, "id_group" | "uuid">) => void;
  updateNotes: (notes: NoteType[]) => void;
}

export const Notes: React.FC<Props> = ({
  notes,
  groups,
  isAuthenticated,
  removeNote,
  setCompleted,
  setTitle,
  moveNoteToGroup,
  updateNotes,
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const updatedNotes = [...notes];
    const draggedItem = updatedNotes[draggingIndex];
    updatedNotes.splice(draggingIndex, 1);
    updatedNotes.splice(index, 0, draggedItem);

    setDraggingIndex(index);
    updateNotes(updatedNotes);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  return (
    <>
      <ul className="my-4">
        {notes.length > 0 ? (
          notes.map(({ uuid, content, completed, id_group }, index) => (
            <li
              key={uuid}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={handleDrop}
              className="cursor-grab"
            >
              <Note
                key={uuid}
                uuid={uuid}
                content={content}
                completed={completed}
                id_group={id_group}
                groups={groups}
                removeNote={removeNote}
                setCompleted={setCompleted}
                setTitle={setTitle}
                isAuthenticated={isAuthenticated}
                moveNoteToGroup={moveNoteToGroup}
              />
            </li>
          ))
        ) : (
          <div className="w-100 h-56 flex flex-col items-center justify-center gap-3 opacity-30">
            <SearchIcon className="size-20" />
            <span className="font-medium ">No se encontraron notas.</span>
          </div>
        )}
      </ul>
    </>
  );
};
