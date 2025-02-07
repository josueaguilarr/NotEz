import { useEffect, useRef, useState } from "react";
import { FilterValue, Group } from "../types/types";
import { ActionsGroup } from "./ActionsGroup";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  isAuthenticated: boolean;
  currentGroupName: string | undefined;
  currentGroupUuid: string | undefined;
  onClearCompleted: () => void;
  handleFilterChange: (filter: FilterValue) => void;
  updateTitleGroup: ({
    group_name,
    uuid,
  }: Pick<Group, "group_name" | "uuid">) => void;
  removeGroup: ({ uuid }: Pick<Group, "uuid">) => void;
}

export const ActionBar: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  isAuthenticated,
  currentGroupName,
  currentGroupUuid,
  onClearCompleted,
  handleFilterChange,
  updateTitleGroup,
  removeGroup,
}) => {
  const [titleGroup, setTitleGroup] = useState<string | undefined>(
    currentGroupName
  );
  const inputTitle = useRef<HTMLInputElement>(null);

  const singleActiveCount = activeCount === 1;
  const activeTaskWord = singleActiveCount ? "tarea" : "tareas";

  const handleUpdateTitleGroup = () => {
    if (titleGroup === undefined || currentGroupUuid === undefined) return;

    updateTitleGroup({ group_name: titleGroup, uuid: currentGroupUuid });
  };

  const handleRemoveGroup = () => {
    if(currentGroupUuid === undefined) return;

    removeGroup({ uuid: currentGroupUuid });
  }

  useEffect(() => {
    setTitleGroup(currentGroupName);
  }, [currentGroupName]);

  return (
    <footer className="flex justify-between gap-7 sm:flex-row flex-col mt-4 mb-6">
      {activeCount > 0 && (
        <>
          <span className="max-w-1/4 truncate flex items-center gap-[2px]">
            <span>
              <strong>{activeCount}</strong> {activeTaskWord} pendiente
              {!singleActiveCount && "s"}{" "}
              {currentGroupName !== undefined ? "en" : ""}
              <input
                ref={inputTitle}
                type="text"
                value={titleGroup || ""}
                onChange={(e) => {
                  setTitleGroup(e.target.value);
                }}
                onBlur={handleUpdateTitleGroup}
                className="ms-1 text-lg bg-transparent focus:outline-none font-bold gradientText"
              />
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

        {activeCount > 0 && (
          <ActionsGroup
            groupSelected={currentGroupName}
            focusInputTitle={() => inputTitle.current?.focus()}
            handleRemoveGroup={handleRemoveGroup}
          />
        )}
      </div>
    </footer>
  );
};
