import { supabase } from "../pages/App";
import {
    Note,
    type Group,
    NoteUuid,
    NoteCompleted,
    NoteContent,
    NoteGroup,
    GroupName
} from "../types/types";

export const getDataFromDatabase = ({ setGroups, setNotes }: { setGroups: (groups: Group[]) => void; setNotes: (notes: Note[]) => void }) => {
    getGroups({ setGroups });
    getNotes({ setNotes });
};

export const getNotes = async ({ setNotes, groupSelected = null }: { setNotes: (notes: Note[]) => void; groupSelected?: number | null }) => {
    const { data } = await supabase.from("Notes").select("*");
    if (!data) return;

    let filter = groupSelected ? groupSelected : null;
    
    setNotes(data.filter((note) => note.id_group === filter));
};

export const getGroups = async ({ setGroups }: { setGroups: (groups: Group[]) => void }) => {
    const { data } = await supabase.rpc('get_groups_with_pending').order("created_at", { ascending: false });
    
    if (data) setGroups(data);
};

export const handleAddNoteSP = async ({ content, notes, setNotes }: { content: NoteContent, notes: Note[]; setNotes: (notes: Note[]) => void }): Promise<void> => {
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
}: { uuid: NoteUuid, content: NoteContent, notes: Note[]; setNotes: (notes: Note[]) => void }): Promise<void> => {
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

export const handleCompletedNoteSP = async ({
    uuid,
    completed,
    notes,
    setNotes,
    setGroups
}: { uuid: NoteUuid; completed: NoteCompleted; notes: Note[]; setNotes: (notes: Note[]) => void; setGroups: (groups: Group[]) => void }): Promise<void> => {
    const { error } = await supabase
        .from("Notes")
        .update({ completed: completed })
        .eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.map((note) => {
        if (note.uuid === uuid) {
            return {
                ...note,
                completed,
            };
        }

        return note;
    });

    setNotes(newNotes);
    await getGroups({ setGroups })
};

export const handleMoveNoteToGroup = async ({
    id_group,
    uuid,
    setNotes,
    groupSelected
}: { id_group: NoteGroup; uuid: NoteUuid; setNotes: (notes: Note[]) => void; groupSelected: NoteGroup }) => {
    const { error } = await supabase
        .from("Notes")
        .update({ id_group: id_group })
        .eq("uuid", uuid);

    if (error) return;

    await getNotes({ setNotes, groupSelected });
};

export const handleRemoveNoteSP = async ({ uuid, notes, setNotes }: { uuid: string; notes: Note[]; setNotes: (notes: Note[]) => void }): Promise<void> => {
    const { error } = await supabase.from("Notes").delete().eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.filter((note) => note.uuid !== uuid);
    setNotes(newNotes);
};

export const handleRemoveAllCompleted = async ({ notes, setNotes }: { notes: Note[]; setNotes: (notes: Note[]) => void }): Promise<void> => {
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

export const handleAddGroupSP = async ({ group, setGroups }: { group: GroupName, groups: Group[], setGroups: (groups: Group[]) => void }) => {
    const { data, error } = await supabase
        .from('Groups')
        .insert([
            { group_name: group },
        ])
        .select()

    console.log(data);
    if (error) return;

    getGroups({ setGroups })
}