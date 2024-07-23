type ModalProps = {
  open: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ toggleModal, open, children }) => {
  if (!open) return;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-1 bg-modalOverlay z-[2000]"
      // onClick={toggleModal}
    >
      <div className="relative w-[400px] p-8 bg-white rounded shadow-lg">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
          onClick={toggleModal}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
