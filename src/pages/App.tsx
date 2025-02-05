import { useEffect, useState } from "react";
import { Notes } from "../components/Notes";
import { FilterValue, NoteContentPick, Note, type NoteIdPick, type Group, GroupName } from "../types/types";
import { NOTE_FILTERS } from "../consts/consts";
import { ActionBar } from "../components/ActionBar";
import { Header } from "../components/Header";
import { CreateNote } from "../components/CreateNote";
import { Groups } from "../components/Groups";
import { createClient } from "@supabase/supabase-js";
import {
  getDataFromDatabase,
  getNotes,
  handleRemoveNoteSP,
  handleCompletedNoteSP,
  handleAddNoteSP,
  handleUpdateTitleSP,
  handleRemoveAllCompleted,
  handleMoveNoteToGroup,
  handleAddGroupSP,
} from "../utils/notesSupabase";
import {
  getDataFromLocalStorage,
  handleRemoveNoteLocalStorage,
  handleCompletedNoteLocalStorage,
  handleAddNoteLocalStorage,
  handleUpdateTitleLocalStorage,
} from "../utils/notesLocalStorage";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const App = (): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    NOTE_FILTERS.ALL
  );
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupSelected, setGroupSelected] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isUserAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    const isLoggedIn = data.session !== null;
    setIsAuthenticated(isLoggedIn);

    if (isLoggedIn) {
      getDataFromDatabase({ setGroups, setNotes });
    } else {
      getDataFromLocalStorage({ setNotes });
    }
  };

  const handleAddNote = async ({ content }: NoteContentPick): Promise<void> => {
    isAuthenticated
      ? await handleAddNoteSP({ content, notes, setNotes })
      : handleAddNoteLocalStorage({ content, setNotes });
  };

  const handleCompleted = async ({
    uuid,
    completed,
  }: Pick<Note, "uuid" | "completed">): Promise<void> => {
    isAuthenticated
      ? await handleCompletedNoteSP({
          uuid,
          completed,
          notes,
          setNotes,
          setGroups,
        })
      : handleCompletedNoteLocalStorage({ uuid, completed, setNotes });
  };

  const handleUpdateTitle = async ({
    uuid,
    content,
  }: Pick<Note, "uuid" | "content">): Promise<void> => {
    isAuthenticated
      ? await handleUpdateTitleSP({
          uuid,
          content,
          notes,
          setNotes,
        })
      : handleUpdateTitleLocalStorage({
          uuid,
          content,
          setNotes,
        });
  };

  const handleRemoveNote = async ({ uuid }: NoteIdPick): Promise<void> => {
    isAuthenticated
      ? await handleRemoveNoteSP({ uuid, notes, setNotes })
      : handleRemoveNoteLocalStorage({ uuid, setNotes });
  };

  const handleNotesForGroup = async ({
    id_group,
  }: Pick<Note, "id_group">) => {
    setGroupSelected(id_group);
    await getNotes({ setNotes, groupSelected: id_group });
  };

  const handleRemoveCompleted = () => {
    handleRemoveAllCompleted({ notes, setNotes });
  };

  const handleAddGroup = ({ group }: { group: GroupName }) => {
    handleAddGroupSP({ group, groups, setGroups });
  };

  const moveNoteToGroup = ({
    id_group,
    uuid,
  }: Pick<Note, "id_group" | "uuid">) => {
    handleMoveNoteToGroup({ id_group, uuid, setNotes, groupSelected });
  };

  const filteredNotes = notes.filter((note) => {
    if (filterSelected === NOTE_FILTERS.ACTIVE) return !note.completed;
    if (filterSelected === NOTE_FILTERS.COMPLETED) return note.completed;

    return note;
  });

  const handleFilterChange = (filter: FilterValue) => setFilterSelected(filter);
  const activeCount = notes.filter((note) => !note.completed).length;
  const completedCount = notes.length - activeCount;
  const currentGroupName = groups.find(
    (group) => group.id === groupSelected
  )?.group_name;

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <main className="top-0 z-[-2] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen flex justify-center sm:items-start">
      <section className="sm:w-1/2 w-4/5 text-gray-200 mx-4 my-16 sm:my-10">
        <Header
          sbClient={supabase}
          isAuthenticated={isAuthenticated}
          handleAuthenticated={isUserAuthenticated}
        />

        <CreateNote saveNote={handleAddNote} />

        {isAuthenticated && (
          <Groups
            groups={groups}
            groupSelected={groupSelected}
            setGroupSelected={handleNotesForGroup}
            setAddGroup={handleAddGroup}
          />
        )}

        <ActionBar
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          isAuthenticated={isAuthenticated}
          currentGroupName={currentGroupName}
          onClearCompleted={handleRemoveCompleted}
          handleFilterChange={handleFilterChange}
        />

        <Notes
          notes={filteredNotes}
          selectedGroupName={currentGroupName}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          removeNote={handleRemoveNote}
          moveNoteToGroup={moveNoteToGroup}
          groups={groups}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </main>
  );
};
