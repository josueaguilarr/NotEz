import { useEffect, useState } from "react";
import { Todos } from "../components/Todos";
import { FilterValue, TodoContent, Todo as TodoType, type TodoId, type Group } from "../types/types";
import { TODO_FILTERS } from "../consts/consts";
import { ActionBar } from "../components/ActionBar";
import { Header } from "../components/Header";
import { CreateTodo } from "../components/CreateTodo";
import { Groups } from "../components/Groups";
import { createClient } from "@supabase/supabase-js";
import {
  getDataFromDatabase,
  getNotes,
  handleRemoveTodoSP,
  handleCompletedTodoSP,
  handleAddTodoSP,
  handleUpdateTitleSP,
  handleRemoveAllCompleted,
  handleMoveNoteToGroup,
} from "../utils/notesSupabase";
import {
  getDataFromLocalStorage,
  handleRemoveTodoLocalStorage,
  handleCompletedTodoLocalStorage,
  handleAddTodoLocalStorage,
  handleUpdateTitleLocalStorage,
} from "../utils/notesLocalStorage";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const App = (): JSX.Element => {
  const [notes, setNotes] = useState<TodoType[]>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
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

  const handleAddTodo = async ({ content }: TodoContent): Promise<void> => {
    isAuthenticated
      ? await handleAddTodoSP({ content, notes, setNotes })
      : handleAddTodoLocalStorage({ content, setNotes });
  };

  const handleCompleted = async ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">): Promise<void> => {
    isAuthenticated
      ? await handleCompletedTodoSP({
          uuid,
          completed,
          notes,
          setNotes,
        })
      : handleCompletedTodoLocalStorage({ uuid, completed, setNotes });
  };

  const handleUpdateTitle = async ({
    uuid,
    content,
  }: Pick<TodoType, "uuid" | "content">): Promise<void> => {
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

  const handleRemoveTodo = async ({ uuid }: TodoId): Promise<void> => {
    isAuthenticated
      ? await handleRemoveTodoSP({ uuid, notes, setNotes })
      : handleRemoveTodoLocalStorage({ uuid, setNotes });
  };

  const handleNotesForGroup = async ({
    id_group,
  }: Pick<TodoType, "id_group">) => {
    setGroupSelected(id_group)
    await getNotes({ setNotes, groupSelected: id_group });
  };

  const handleRemoveCompleted = () => {
    handleRemoveAllCompleted({ notes, setNotes });
  };

  const moveNoteToGroup = ({
    id_group,
    uuid,
  }: Pick<TodoType, "id_group" | "uuid">) => {    
    handleMoveNoteToGroup({ id_group, uuid, setNotes, groupSelected });
  };

  const filteredTodos = notes.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;

    return todo;
  });

  const handleFilterChange = (filter: FilterValue) => setFilterSelected(filter);
  const activeCount = notes.filter((todo) => !todo.completed).length;
  const completedCount = notes.length - activeCount;

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

        <CreateTodo saveTodo={handleAddTodo} />

        {isAuthenticated && (
          <Groups
            groups={groups}
            groupSelected={groupSelected}
            setGroupSelected={handleNotesForGroup}
          />
        )}

        <ActionBar
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveCompleted}
          handleFilterChange={handleFilterChange}
          isAuthenticated={isAuthenticated}
        />

        <Todos
          todos={filteredTodos}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          removeTodo={handleRemoveTodo}
          moveNoteToGroup={moveNoteToGroup}
          groups={groups}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </main>
  );
};
