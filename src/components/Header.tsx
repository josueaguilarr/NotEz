import { TodoTitle } from "../types/types"
import { CreateTodo } from "./CreateTodo"
import { Title } from "./Title"

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header>
            <Title />

            <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}
