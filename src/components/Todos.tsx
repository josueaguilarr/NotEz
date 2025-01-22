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
    const [IsEditing, setIsEditing] = useState('')

    return (
        <ul className="my-4">
            {todos.map(({ uuid, content, completed }) => (
                <li
                    key={uuid}
                    onDoubleClick={() => { setIsEditing(uuid) }}
                    className={`${completed ? 'opacity-[0.65] line-through' : ''}`}
                >
                    <Todo
                        key={uuid}
                        uuid={uuid}
                        content={content}
                        completed={completed}
                        isEditing={IsEditing}
                        removeTodo={removeTodo}
                        setCompleted={setCompleted}
                        setTitle={setTitle}
                        setIsEditing={setIsEditing}
                    />
                </li>
            ))}
        </ul>
    )
}