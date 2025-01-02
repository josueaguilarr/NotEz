import { FilterValue } from "../types/types";
import { Filters } from "./Filters";

interface Props {
    activeCount: number,
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    onClearCompleted,
    handleFilterChange
}) => {
    const singleActiveCount = activeCount === 1
    const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'

    return (
        <footer className="flex justify-between gap-7 sm:flex-row flex-col mt-4">

            {activeCount > 0 && (
                <>
                    <span className="max-w-1/4">
                        <span>
                            <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
                        </span>
                    </span>
                </>
            )}

            <div className="flex text-xs sm:text-base">
            {activeCount > 0 && (
            <Filters
                filterSelected={filterSelected}
                completedCount={completedCount}
                onFilterChange={handleFilterChange}
            />
            )}

            {
                completedCount > 0 && (
                    <button
                        className="px-2 rounded-full mx-[0.25rem] text-sm font-medium bg-red-900 text-red-300"
                        onClick={onClearCompleted}
                    >
                        Borrar completados
                    </button>
                )
            }
            </div>
        </footer>
    )
}