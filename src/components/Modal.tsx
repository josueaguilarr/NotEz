import { PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
