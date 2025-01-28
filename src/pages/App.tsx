import { useEffect, useState } from "react";
import { Todos } from "../components/Todos";
import {
  FilterValue,
  TodoContent,
  Todo as TodoType,
  type TodoId,
  type Group,
} from "../types/types";
import { TODO_FILTERS } from "../consts/consts";
import { ActionBar } from "../components/ActionBar";
import { Header } from "../components/Header";
import { CreateTodo } from "../components/CreateTodo";
import { Groups } from "../components/Groups";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const App = (): JSX.Element => {
  const [notes, setNotes] = useState<TodoType[]>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );
  const [groups, setGroups] = useState<Group[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isUserAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    const isLoggedIn = data.session !== null;
    setIsAuthenticated(isLoggedIn);

    if (isLoggedIn) {
      getDataFromDatabase();
    } else {
      getDataFromLocalStorage();
    }
  };
  
  const handleRemoveTodo = async ({ uuid }: TodoId): Promise<void> => {
    const { error } = await supabase.from("Notes").delete().eq("uuid", uuid);

    if (error) return;

    const newNotes = notes.filter((todo) => todo.uuid !== uuid);
    setNotes(newNotes);
  };

  const handleCompleted = async ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">): Promise<void> => {
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

  const handleRemoveAllCompleted = async (): Promise<void> => {
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

  const handleAddTodo = async ({ content }: TodoContent): Promise<void> => {
    const { data, error } = await supabase
      .from("Notes")
      .insert([{ content: content }])
      .select();

    if (error) return;

    const newNotes = [...notes, data[0]];
    setNotes(newNotes);
  };

  const handleUpdateTitle = async ({
    uuid,
    content,
  }: Pick<TodoType, "uuid" | "content">): Promise<void> => {
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

  const getNotes = async () => {
    const { data } = await supabase.from("Notes").select("*");

    if (data) setNotes(data);
  };

  const getGroups = async () => {
    const { data } = await supabase.from("Groups").select();

    if (data) setGroups(data);
  };

  const getDataFromDatabase = () => {
    getGroups();
    getNotes();
  };

  const getDataFromLocalStorage = () => {
    setGroups([]);
    setNotes([]);
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
        <Header sbClient={supabase} isAuthenticated={isAuthenticated} handleAuthenticated={isUserAuthenticated} />

        <CreateTodo saveTodo={handleAddTodo} />

        <Groups groups={groups} />

        <ActionBar
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveAllCompleted}
          handleFilterChange={handleFilterChange}
        />

        <Todos
          todos={filteredTodos}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          removeTodo={handleRemoveTodo}
          groups={groups}
          sbClient={supabase}
        />
      </section>
    </main>
  );
};
