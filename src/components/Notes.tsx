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
  moveNoteToGroup: ({ id_group, uuid }: Pick<NoteType, "id_group" | "uuid">) => void;
}

export const Notes: React.FC<Props> = ({
  notes,
  groups,
  isAuthenticated,
  removeNote,
  setCompleted,
  setTitle,
  moveNoteToGroup,
}) => {  
  return (
    <>
      <ul className="my-4">
        {notes.map(({ uuid, content, completed, id_group }) => (
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
        ))}
      </ul>
    </>
  );
};
