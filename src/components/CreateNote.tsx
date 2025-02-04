import { useState } from "react"
import { NoteContentPick } from "../types/types"

interface Props {
    saveNote: ({ content }: NoteContentPick) => void
}

export const CreateNote: React.FC<Props> = ({ saveNote }) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e): void => {
        if (e.key === 'Enter' && inputValue !== '') {
            saveNote({ content: inputValue })
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
