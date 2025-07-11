import { ActionButton, ActionButtonProps } from '@/components';
import { LuFilePlus2 } from "react-icons/lu";

export const NewNoteButton = ({...props}:  ActionButtonProps) => {
  return (
    <ActionButton {...props}>
        <LuFilePlus2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
