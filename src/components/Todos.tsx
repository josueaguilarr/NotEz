import { type Todo as TodoType, type TodoId, Group } from "../types/types";
import { Todo } from "./Todo";
import { SupabaseClient } from "@supabase/supabase-js";

interface Props {
  todos: TodoType[];
  groups: Group[];
  setCompleted: ({
    uuid,
    completed,
  }: Pick<TodoType, "uuid" | "completed">) => void;
  setTitle: ({ uuid, content }: Pick<TodoType, "uuid" | "content">) => void;
  removeTodo: ({ uuid }: TodoId) => void;
  sbClient: SupabaseClient
}

export const Todos: React.FC<Props> = ({
  todos,
  groups,
  removeTodo,
  setCompleted,
  setTitle,
  sbClient
}) => {
  return (
    <>
      <ul className="my-4">
        {todos.map(({ uuid, content, completed, id_group }) => (
          <li key={uuid}>
            <Todo
              key={uuid}
              uuid={uuid}
              content={content}
              completed={completed}
              id_group={id_group}
              sbClient={sbClient}
              groups={groups}
              removeTodo={removeTodo}
              setCompleted={setCompleted}
              setTitle={setTitle}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
