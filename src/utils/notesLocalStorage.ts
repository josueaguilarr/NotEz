import {
    Todo as TodoType,
    NoteUuid,
    NoteCompleted,
    NoteContent,
} from "../types/types";

export const getDataFromLocalStorage = ({ setNotes }: { setNotes: (notes: TodoType[]) => void }) => {
    getNotesLocalStorage({ setNotes });
};

export const getNotesLocalStorage = ({ setNotes }: { setNotes: (notes: TodoType[]) => void }) => {
    const storedNotes = localStorage.getItem("notes");
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    setNotes(notes);
};

export const handleAddTodoLocalStorage = ({ content, setNotes }: { content: NoteContent, setNotes: (notes: TodoType[]) => void }): void => {
    const newTodo: Pick<TodoType, "uuid" | "content" | "completed"> = {
        uuid: crypto.randomUUID(),
        content,
        completed: false,
    };

    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = [...storedNotes, newTodo];
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleUpdateTitleLocalStorage = ({
    uuid,
    content,
    setNotes
}: { uuid: NoteUuid, content: NoteContent, setNotes: (notes: TodoType[]) => void }): void => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = storedNotes.map((note: TodoType) =>
        note.uuid === uuid ? { ...note, content } : note
    );

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleCompletedTodoLocalStorage = async ({
    uuid,
    completed,
    setNotes,
}: { uuid: NoteUuid, completed: NoteCompleted, setNotes: (notes: TodoType[]) => void }) => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

    const newNotes = storedNotes.map((todo: TodoType) =>
        todo.uuid === uuid ? { ...todo, completed } : todo
    );

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleRemoveTodoLocalStorage = ({ uuid, setNotes }: { uuid: NoteUuid; setNotes: (notes: TodoType[]) => void }): void => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = storedNotes.filter((todo: TodoType) => todo.uuid !== uuid);

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};