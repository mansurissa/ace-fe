'use client';
import { FC, useEffect, useState } from 'react';
import { Note } from '@/types/note';
import toast from 'react-hot-toast';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData?: Partial<Note>;
  mode: 'create' | 'edit';
}

const NoteModal: FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    }
  }, [isOpen, initialData]);

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title, content });
      toast.success(mode === 'create' ? 'Note created!' : 'Note updated!');
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>
          {mode === 'create' ? 'Create Note' : 'Edit Note'}
        </h2>
        <input
          className='w-full border px-3 py-2 mb-3 rounded border-gray-300'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          className='w-full border px-3 py-2 mb-4 rounded border-gray-300'
          placeholder='Content'
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <div className='flex justify-end gap-2'>
          <button
            className='text-gray-600 bg-gray-200 px-4 py-2 rounded cursor-pointer hover:brightness-90'
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className='bg-[#006A67] text-white px-4 py-2 rounded cursor-pointer hover:brightness-90'
            onClick={handleSubmit}
            disabled={loading}
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
