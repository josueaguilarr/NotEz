import { Group, Todo as TodoType } from "../types/types";

interface Props {
  groups: Group[];
  groupSelected: number | null;
  setGroupSelected: ({ id_group }: Pick<TodoType, "id_group">) => void;
}

export const Groups: React.FC<Props> = ({
  groups,
  groupSelected,
  setGroupSelected,
}) => {    
  return (
    <div className="flex h-[40px] w-full mt-2 gap-2 overflow-auto will-change-scroll snap-x [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500/40">
      {groups.map(({ id, group_name }) => (
        <div
          onClick={() => groupSelected === id ? setGroupSelected({ id_group: null }) : setGroupSelected({ id_group: id })}
          key={id}
          className={`snap-center rounded-lg max-w-[200px] bg-neutral-800/40 p-2 cursor-pointer hover:bg-neutral-800/80 duration-500 border-neutral-800/60 border ${
            groupSelected === id ? "bg-neutral-500/40" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-sm truncate">{group_name}</p>
            <span className="flex gap-1 justify-center items-center truncate text-yellow-600 text-[10px] font-medium px-1 rounded-full">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-yellow-600"></span>
              </span>
              Pendientes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
