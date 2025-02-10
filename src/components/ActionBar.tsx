import { useEffect, useRef, useState } from "react";
import { FilterValue, Group } from "../types/types";
import { ActionsGroup } from "./ActionsGroup";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
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
  const activeTaskWord = singleActiveCount ? "nota" : "notas";

  const handleUpdateTitleGroup = () => {
    if (titleGroup === undefined || currentGroupUuid === undefined) return;

    updateTitleGroup({ group_name: titleGroup, uuid: currentGroupUuid });
  };

  const handleRemoveGroup = () => {
    if (currentGroupUuid === undefined) return;

    removeGroup({ uuid: currentGroupUuid });
  };

  useEffect(() => {
    setTitleGroup(currentGroupName);
  }, [currentGroupName]);

  return (
    <footer className="flex justify-between gap-2 lg:flex-row md:flex-col flex-col mt-4 mb-6">
      <>
        <span className="lg:w-60 truncate flex items-center gap-[2px]">
          <span>
            <strong>{activeCount}</strong> {activeTaskWord} pendiente
            {!singleActiveCount && "s"}{" "}
            {currentGroupName !== undefined ? "en" : ""}
            {currentGroupName && (
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
            )}
          </span>
        </span>
      </>

      <div className="flex flex-wrap text-xs gap-1 sm:text-base">
        {activeCount > 0 && (
          <Filters
            filterSelected={filterSelected}
            completedCount={completedCount}
            onFilterChange={handleFilterChange}
          />
        )}

        <ActionsGroup
          groupSelected={currentGroupName}
          focusInputTitle={() => inputTitle.current?.focus()}
          handleRemoveGroup={handleRemoveGroup}
          onClearCompleted={onClearCompleted}
        />
      </div>
    </footer>
  );
};
