import { MoreIcon, PenIcon, TrashIcon } from "../icons/Icons";

type Props = {
  groupSelected: string | undefined;
  focusInputTitle: () => void;
};

export const ActionsGroup: React.FC<Props> = ({ groupSelected, focusInputTitle }) => {
  return (
    <span className="group relative">
      <div className="absolute left-[100%] translate-x-[%50] hidden group-hover:block min-w-32">
        <div className="px-1 py-1 bg-neutral-800/40 border border-neutral-800/60 rounded-lg">
          <>
            <p onClick={focusInputTitle} className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer">
              <PenIcon className="size-4" />
              Renombrar grupo
            </p>
            <p className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer">
              <TrashIcon className="size-4" />
              Eliminar grupo
            </p>
          </>
        </div>
      </div>

      {groupSelected && (
        <span>
          <MoreIcon className="size-6" />
        </span>
      )}
    </span>
  );
};
