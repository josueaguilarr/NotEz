import { useState } from "react"
import { type Todo as TodoType, type TodoId } from "../types/types"
import { Todo } from "./Todo"

interface Props {
    todos: TodoType[],
    setCompleted: ({ uuid, completed }: Pick<TodoType, 'uuid' | 'completed'>) => void,
    setTitle: ({ uuid, content }: Pick<TodoType, 'uuid' | 'content'>) => void,
    removeTodo: ({ uuid }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, removeTodo, setCompleted, setTitle }) => {
    return (
        <ul className="my-4">
            {todos.map(({ uuid, content, completed }) => (
                <li
                    key={uuid}
                    className={`${completed ? 'opacity-[0.65] line-through' : ''}`}
                >
                    <Todo
                        key={uuid}
                        uuid={uuid}
                        content={content}
                        completed={completed}
                        removeTodo={removeTodo}
                        setCompleted={setCompleted}
                        setTitle={setTitle}
                    />
                </li>
            ))}
        </ul>
    )
}