import { NotePreview } from '@/components/NotePreview'
import { useNotesList } from '@/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotesPreviewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void;
}

export const NotesPreviewList = ({onSelect, className, ...props} : NotesPreviewListProps) => {
    const {notes, selectedNoteIndex, handleNoteSelect} = useNotesList({onSelect});

    if(!notes) return null;

    if(isEmpty(notes)) {
        return (
            <ul className={twMerge('text-center pt-4', className)}>
                <span> No Notes Yet!</span>
            </ul>
        )
    }
    return (
        <ul
            className={className}
            {...props}
        >
            {notes.map((note, index) => (
                <NotePreview 
                    key={note.title + note.lastEditTime}
                    isActive={selectedNoteIndex === index}
                    onClick={handleNoteSelect(index)}
                    {...note} 
                />
            ))}
        </ul>
    )
}
