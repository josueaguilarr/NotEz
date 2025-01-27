import { PropsWithChildren } from "react";
import { CancelIcon } from "../icons/Icons";

type Props = {
  id: string
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Modal: React.FC<Props> = ({ isOpen, onClose, children, id }) => {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="fixed top-0 inset-0 sm:p-0 p-10 overflow-x-hidden bg-gray-800/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-800 max-w-md max-h-[300px] overflow-y-auto scrollbar-custom rounded-lg shadow-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CancelIcon className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
};
