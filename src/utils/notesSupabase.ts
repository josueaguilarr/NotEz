import { supabase } from "../pages/App";
import {
    Todo as TodoType,
    type Group,
    NoteUuid,
    NoteCompleted,
    NoteContent,
    NoteGroup
} from "../types/types";

export const getDataFromDatabase = ({ setGroups, setNotes }: { setGroups: (groups: Group[]) => void; setNotes: (notes: TodoType[]) => void }) => {
    getGroups({ setGroups });
    getNotes({ setNotes });
};

export const getNotes = async ({ setNotes, groupSelected = null }: { setNotes: (notes: TodoType[]) => void; groupSelected?: number | null }) => {
    const { data } = await supabase.from("Notes").select("*");
    if (!data) return;

    let filter = groupSelected ? groupSelected : null;
    
    setNotes(data.filter((note) => note.id_group === filter));
};

export const getGroups = async ({ setGroups }: { setGroups: (groups: Group[]) => void }) => {
    const { data } = await supabase.from("Groups").select();

    if (data) setGroups(data);
};

export const handleAddTodoSP = async ({ content, notes, setNotes }: { content: NoteContent, notes: TodoType[]; setNotes: (notes: TodoType[]) => void }): Promise<void> => {
    const { data, error } = await supabase
        .from("Notes")
        .insert([{ content: content }])
        .select();

    if (error) return;

    const newNotes = [...notes, data[0]];
    setNotes(newNotes);
};

export const handleUpdateTitleSP = async ({
    uuid,
    content,
    notes,
    setNotes
}: { uuid: NoteUuid, content: NoteContent, notes: TodoType[]; setNotes: (notes: TodoType[]) => void }): Promise<void> => {
    const { error } = await supabase
        .from("Notes")
        .update({ content: content })
        .eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.map((note) => {
        if (note.uuid === uuid) {
            return {
                ...note,
                content,
            };
        }

        return note;
    });

    setNotes(newNotes);
};

export const handleCompletedTodoSP = async ({
    uuid,
    completed,
    notes,
    setNotes
}: { uuid: NoteUuid; completed: NoteCompleted; notes: TodoType[]; setNotes: (notes: TodoType[]) => void }): Promise<void> => {
    const { error } = await supabase
        .from("Notes")
        .update({ completed: completed })
        .eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.map((todo) => {
        if (todo.uuid === uuid) {
            return {
                ...todo,
                completed,
            };
        }

        return todo;
    });

    setNotes(newNotes);
};

export const handleMoveNoteToGroup = async ({
    id_group,
    uuid,
    setNotes,
}: { id_group: NoteGroup; uuid: NoteUuid; setNotes: (notes: TodoType[]) => void; }) => {
    const { error } = await supabase
        .from("Notes")
        .update({ id_group: id_group })
        .eq("uuid", uuid);

    if (error) return;

    await getNotes({ setNotes });
};

export const handleRemoveTodoSP = async ({ uuid, notes, setNotes }: { uuid: string; notes: TodoType[]; setNotes: (notes: TodoType[]) => void }): Promise<void> => {
    const { error } = await supabase.from("Notes").delete().eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.filter((todo) => todo.uuid !== uuid);
    setNotes(newNotes);
};

export const handleRemoveAllCompleted = async ({ notes, setNotes }: { notes: TodoType[]; setNotes: (notes: TodoType[]) => void }): Promise<void> => {
    const notesRemove = notes
        .filter((note) => note.completed)
        .map((note) => note.uuid);

    const { error } = await supabase
        .from("Notes")
        .delete()
        .in("uuid", notesRemove);

    if (error) return;

    const newNotes = notes.filter((note) => !note.completed);
    setNotes(newNotes);
};