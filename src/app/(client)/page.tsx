'use client';
import { FC, useEffect, useState } from 'react';
import api from '@/utils/axios';
import { Note } from '@/types/note';
import toast from 'react-hot-toast';
import NoteModal from '@/components/NoteModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { FaPlus } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const Home: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const fetchNotes = async () => {
    try {
      const res = await api.get('/');
      setNotes(res.data);
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdate = async (data: Partial<Note>) => {
    if (mode === 'create') {
      await api.post('/', data);
    } else if (mode === 'edit' && selectedNote) {
      await api.put(`/${selectedNote.id}/`, data);
    }
    fetchNotes();
  };

  const handleDelete = async () => {
    if (!selectedNote) return;
    await api.delete(`/${selectedNote.id}/`);
    fetchNotes();
  };

  return (
    <>
      <title>Notes Taker</title>
      <main className='p-6 max-w-3xl mx-auto'>
        <div className='fixed top-0 left-0 right-0 bg-gray-100  z-10'>
          <div className='max-w-3xl mx-auto flex justify-between items-center p-6 border-b border-gray-300'>
            <h1 className='text-3xl  text-[#006A67] font-bold'>Notestaker</h1>
            <button
              className='bg-[#006A67] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer hover:brightness-90 transition-colors duration-200'
              onClick={() => {
                setMode('create');
                setSelectedNote(null);
                setModalOpen(true);
              }}
            >
              <span>
                <FaPlus />
              </span>
              <span>New Note</span>
            </button>
          </div>
        </div>
        <div className='mt-20'>
          {loading ? (
            <p>Loading...</p>
          ) : notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <ul className='space-y-4'>
              {notes.map((note) => (
                <li
                  key={note.id}
                  className='border p-4 rounded shadow-sm bg-white border-gray-300 flex flex-col gap-2'
                >
                  <h2 className='text-lg font-semibold'>{note.title}</h2>
                  <p className='text-gray-700'>{note.content}</p>
                  <div className='flex gap-3 mt-3 ml-auto'>
                    <button
                      onClick={() => {
                        setMode('edit');
                        setSelectedNote(note);
                        setModalOpen(true);
                      }}
                      className='text-white bg-[#006A67] px-3 py-1 rounded hover:brightness-90 flex items-center gap-2 cursor-pointer'
                    >
                      <span>
                        <FiEdit />
                      </span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNote(note);
                        setDeleteModalOpen(true);
                      }}
                      className='bg-red-400 text-white px-3 py-1 rounded hover:brightness-90 flex items-center gap-2 cursor-pointer'
                    >
                      <span>
                        <RiDeleteBack2Fill />
                      </span>
                      <span>Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={selectedNote || {}}
        mode={mode}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedNote?.title}
      />
    </>
  );
};

export default Home;
