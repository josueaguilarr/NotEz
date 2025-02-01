import { CancelIcon, MoreIcon, TrashIcon } from "../icons/Icons";
import { Todo } from "../types/types";

interface Props {
  isAuthenticated: boolean;
  isGroupSelected: number | null;
  uuid: string;
  handleRemove: () => void;
  openModal: () => void;
  moveNoteToGroup: ({
    id_group,
    uuid,
  }: Pick<Todo, "id_group" | "uuid">) => void;
}

export const ActionsTodo: React.FC<Props> = ({
  isAuthenticated,
  isGroupSelected,
  uuid,
  handleRemove,
  openModal,
  moveNoteToGroup,
}) => {
  return (
    <>
      <div>
        <span className="group relative">
          <div className="absolute left-[100%] translate-x-[%50] hidden group-hover:block min-w-28">
            <div className="px-1 py-1 bg-neutral-800/40 border border-neutral-800/60 rounded-lg">
              <p
                onClick={handleRemove}
                className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
              >
                <TrashIcon className="size-3" />
                Eliminar
              </p>

              {isAuthenticated && (
                <>
                  <p
                    onClick={openModal}
                    className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
                  >
                    {isGroupSelected ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-transfer-up-down"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 21v-6" />
                        <path d="M20 6l-3 -3l-3 3" />
                        <path d="M10 18l-3 3l-3 -3" />
                        <path d="M7 3v2" />
                        <path d="M7 9v2" />
                        <path d="M17 3v6" />
                        <path d="M17 21v-2" />
                        <path d="M17 15v-2" />
                      </svg>
                    ) : (
                      <CancelIcon className="size-3 rotate-45" />
                    )}
                    {isGroupSelected ? "Mover de grupo" : "Agregar a grupo"}
                  </p>

                  {isGroupSelected && (
                    <p
                    onClick={() =>
                      moveNoteToGroup({
                        id_group: null,
                        uuid: uuid,
                      })
                    }
                    className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
                  >
                    <CancelIcon className="size-3" />
                    Quitar de grupo
                  </p>
                  )}
                </>
              )}
            </div>
          </div>
          <span>
            <MoreIcon className="size-6" />
          </span>
        </span>
      </div>
    </>
  );
};
