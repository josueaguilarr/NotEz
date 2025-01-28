import { CancelIcon, MoreIcon, TrashIcon } from "../icons/Icons";

interface Props {
  isAuthenticated: boolean;
  handleRemove: () => void;
  openModal: () => void;
}

export const ActionsTodo: React.FC<Props> = ({
  isAuthenticated,
  handleRemove,
  openModal,
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
                <p
                  onClick={openModal}
                  className="flex gap-1 items-center text-[10px] hover:bg-neutral-800 p-1 rounded-md duration-200 cursor-pointer"
                >
                  <CancelIcon className="size-3 rotate-45" />
                  Agregar a grupo
                </p>
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
