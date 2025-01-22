import { useState } from "react"
import { TodoContent } from "../types/types"

interface Props {
    saveTodo: ({ content }: TodoContent) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e): void => {
        if (e.key === 'Enter' && inputValue !== '') {
            saveTodo({ content: inputValue })
            setInputValue("")
        }
    }

    return (
        <input
            type="text"
            className="bg-neutral-800/40 w-full rounded-lg p-4 text-sm font-medium ring-2 outline-none ring-neutral-800/60"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }}
            onKeyDown={handleKeyDown}
            placeholder="¿Qué tienes por hacer hoy?"
            autoFocus
        />
    )
}
