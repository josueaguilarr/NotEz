import { Note as NoteType, type NoteIdPick, Group } from "../types/types";
import { Note } from "./Note";

interface Props {
  notes: NoteType[];
  groups: Group[];
  isAuthenticated: boolean;
  selectedGroupName: string | undefined;
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
}

export const Notes: React.FC<Props> = ({
  notes,
  groups,
  isAuthenticated,
  selectedGroupName,
  removeNote,
  setCompleted,
  setTitle,
  moveNoteToGroup,
}) => {
  return (
    <>
      <ul className="my-4">
        {notes.length > 0 ? (
          notes.map(({ uuid, content, completed, id_group }) => (
            <li key={uuid}>
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
          <div className="sm:h-32 flex justify-center items-center text-3xl">
            <p className="font-semibold">
              No hay notas en el grupo
              <strong className="gradientText ms-2">{selectedGroupName + "."}</strong>
            </p>
          </div>
        )}
      </ul>
    </>
  );
};
