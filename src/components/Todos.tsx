import { useState } from "react"
import { type Todo as TodoType, type TodoId } from "../types/types"
import { Todo } from "./Todo"

interface Props {
    todos: TodoType[],
    setCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
    setTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void,
    removeTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, removeTodo, setCompleted, setTitle }) => {
    const [IsEditing, setIsEditing] = useState('')

    return (
        <ul className="my-4">
            {todos.map(({ id, title, completed }) => (
                <li
                    key={id}
                    onDoubleClick={() => { setIsEditing(id) }}
                    className={`${completed ? 'opacity-[0.65] line-through' : ''}`}
                >
                    <Todo
                        key={id}
                        id={id}
                        title={title}
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