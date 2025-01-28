import { FilterValue } from "../types/types";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  isAuthenticated: boolean;
  onClearCompleted: () => void;
  handleFilterChange: (filter: FilterValue) => void;
}

export const ActionBar: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  isAuthenticated,
  onClearCompleted,
  handleFilterChange,
}) => {
  const singleActiveCount = activeCount === 1;
  const activeTodoWord = singleActiveCount ? "tarea" : "tareas";

  return (
    <footer className="flex justify-between gap-7 sm:flex-row flex-col mt-4 mb-6">
      {activeCount > 0 && (
        <>
          <span className="max-w-1/4">
            <span>
              <strong>{activeCount}</strong> {activeTodoWord} pendiente
              {!singleActiveCount && "s"}
            </span>
          </span>
        </>
      )}

      <div className="flex flex-wrap text-xs gap-1 sm:text-base">
        {activeCount > 0 && (
          <Filters
            filterSelected={filterSelected}
            completedCount={completedCount}
            onFilterChange={handleFilterChange}
          />
        )}

        {isAuthenticated && completedCount > 0 && (
          <button
            className="px-2 rounded-full text-sm font-medium bg-red-900 text-red-300"
            onClick={onClearCompleted}
          >
            Borrar completados
          </button>
        )}
      </div>
    </footer>
  );
};
