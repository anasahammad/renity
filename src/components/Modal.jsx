import React, { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4' onClick={onClose}>
      <div className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg transition-all transform duration-300 ease-in-out' onClick={(e) => e.stopPropagation()}>
        <div className='sticky top-0 flex justify-end p-2 bg-white z-10'>
          <button onClick={onClose} className='p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200' aria-label='Close modal'>
            <RxCross2 size={24} />
          </button>
        </div>
        <div className='px-6 pb-6 pt-2'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
