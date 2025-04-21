'use client';
import { FC } from 'react';
import toast from 'react-hot-toast';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'this note'
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-sm text-center'>
        <h2 className='text-lg font-semibold mb-3'>Delete Confirmation</h2>
        <p className='mb-4 text-gray-700'>
          Are you sure you want to delete {itemName}?
        </p>
        <div className='flex justify-center gap-3'>
          <button
            className='text-gray-600 bg-gray-200 px-4 py-2 rounded cursor-pointer hover:brightness-90'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-400 text-white px-3 py-1 rounded hover:brightness-90 flex items-center gap-2 cursor-pointer'
            onClick={() => {
              onConfirm();
              toast.success('Note deleted');
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
