import { MoreIcon, PenIcon, TrashIcon } from "../icons/Icons";

type Props = {
  groupSelected: string | undefined;
  focusInputTitle: () => void;
  handleRemoveGroup: () => void;
  onClearCompleted: () => void;
  completedNotesCount: number;
};

export const ActionsGroup: React.FC<Props> = ({
  groupSelected,
  focusInputTitle,
  handleRemoveGroup,
  onClearCompleted,
  completedNotesCount,
}) => {
  return (
    <span className="group relative">
      <div className="absolute left-[100%] translate-x-[%50] hidden group-hover:block min-w-36">
        <div className="px-1 py-1 bg-neutral-800/40 border border-neutral-800/60 rounded-lg">
          {groupSelected && (
            <>
              <p
                onClick={focusInputTitle}
                className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
              >
                <PenIcon className="size-4" />
                Renombrar grupo
              </p>
              <p
                onClick={handleRemoveGroup}
                className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
              >
                <TrashIcon className="size-4" />
                Eliminar grupo
              </p>
            </>
          )}
          {completedNotesCount > 0 && (
            <p
              onClick={onClearCompleted}
              className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
            >
              <TrashIcon className="size-4" />
              Eliminar completadas
            </p>
          )}
        </div>
      </div>

      <span>
        <MoreIcon className="size-6 rounded-full p-1 bg-neutral-800/40" />
      </span>
    </span>
  );
};
