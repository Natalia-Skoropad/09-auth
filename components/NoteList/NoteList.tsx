'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api/clientApi';
import { Button, LinkButton } from '@/app/components';

import css from './NoteList.module.css';

// ================================================================

interface NoteListProps {
  notes: Note[];
}

// ================================================================

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted');
    },

    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Failed to delete note';
      toast.error(msg);
    },

    onSettled: () => setPendingId(null),
  });

  const handleDelete = async (id: string) => {
    try {
      setPendingId(id);
      await mutateAsync(id);
    } catch {}
  };

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <LinkButton href={`/notes/${id}`} text="View details" />

            <Button
              text={pendingId === id ? 'Deleting…' : 'Delete'}
              variant="delete"
              type="button"
              onClick={() => handleDelete(id)}
              disabled={pendingId === id || isPending}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
