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
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );
  const [groups, setGroups] = useState<Group[]>([]);

  const handleRemoveTodo = ({ uuid }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.uuid !== uuid);
    setTodos(newTodos);
  };

  const handleCompleted = ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.uuid === uuid) {
        return {
          ...todo,
          completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = async ({ content }: TodoContent): Promise<void> => {
    const { data, error } = await supabase
      .from("Notes")
      .insert([{ content: content }])
      .select();

    if (error) return;

    const newTodos = [...todos, data[0]];
    setTodos(newTodos);
  };

  const handleUpdateTitle = ({
    uuid,
    content,
  }: Pick<TodoType, "uuid" | "content">): void => {
    setTodos((todos) =>
      todos.map((todo) => (todo.uuid === uuid ? { ...todo, content } : todo))
    );
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;

    return todo;
  });

  const getNotes = async () => {
    const { data } = await supabase.from("Notes").select("*");

    if (data) setTodos(data);
  };

  const getGroups = async () => {
    const { data } = await supabase.from("Groups").select();

    if (data) setGroups(data);
  };

  useEffect(() => {
    getNotes();
    getGroups();
  }, []);

  return (
    <main className="top-0 z-[-2] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen flex justify-center sm:items-start">
      <section className="w-1/2 text-gray-200 mx-4 my-16 sm:my-10">
        <Header />

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
        />
      </section>
    </main>
  );
};
