import { ActionButton, ActionButtonProps } from '@/components';
import { deleteNoteAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { FaTrashCan } from "react-icons/fa6";

export const DeleteNoteButton = ({...props}:  ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom);
  const handleDeletion = async () => {
    await deleteNote();
  }

  return (
    <ActionButton {...props} onClick={handleDeletion}>
        <FaTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
