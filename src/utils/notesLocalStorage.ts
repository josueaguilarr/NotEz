import {
    Note,
    NoteUuid,
    NoteCompleted,
    NoteContent,
} from "../types/types";

export const getDataFromLocalStorage = ({ setNotes }: { setNotes: (notes: Note[]) => void }) => {
    getNotesLocalStorage({ setNotes });
};

export const getNotesLocalStorage = ({ setNotes }: { setNotes: (notes: Note[]) => void }) => {
    const storedNotes = localStorage.getItem("notes");
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    setNotes(notes);
};

export const handleAddNoteLocalStorage = ({ content, setNotes }: { content: NoteContent, setNotes: (notes: Note[]) => void }): void => {
    const newNote: Pick<Note, "uuid" | "content" | "completed"> = {
        uuid: crypto.randomUUID(),
        content,
        completed: false,
    };

    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = [...storedNotes, newNote];
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleUpdateTitleLocalStorage = ({
    uuid,
    content,
    setNotes
}: { uuid: NoteUuid, content: NoteContent, setNotes: (notes: Note[]) => void }): void => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = storedNotes.map((note: Note) =>
        note.uuid === uuid ? { ...note, content } : note
    );

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleCompletedNoteLocalStorage = async ({
    uuid,
    completed,
    setNotes,
}: { uuid: NoteUuid, completed: NoteCompleted, setNotes: (notes: Note[]) => void }) => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

    const newNotes = storedNotes.map((note: Note) =>
        note.uuid === uuid ? { ...note, completed } : note
    );

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};

export const handleRemoveNoteLocalStorage = ({ uuid, setNotes }: { uuid: NoteUuid; setNotes: (notes: Note[]) => void }): void => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const newNotes = storedNotes.filter((note: Note) => note.uuid !== uuid);

    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
};