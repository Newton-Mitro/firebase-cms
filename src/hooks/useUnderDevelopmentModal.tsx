import { useState } from "react";

const useUnderDevelopmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const UnderDevelopmentModal = () => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className=" w-96 p-4 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Under Development</h2>
              <p className="text-gray-600">
                This feature is currently under development.
              </p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 hover:bg-blue-600  font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return { openModal, closeModal, UnderDevelopmentModal };
};

export default useUnderDevelopmentModal;
