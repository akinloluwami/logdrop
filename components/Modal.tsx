import { FC, ReactNode } from "react";

interface Props {
  showModal: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ showModal, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 flex items-center justify-center z-50 w-full h-screen bg-black/5 backdrop-blur-md transition-opacity ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
