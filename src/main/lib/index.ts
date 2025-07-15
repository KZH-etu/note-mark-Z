import { appDirectoryName, fileEncoding, welcomeNoteFileName } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types";
import { dialog } from "electron";
import { ensureDir, readdir, readFile, remove, stat, writeFile } from "fs-extra";
import { isEmpty } from "lodash";
import { homedir } from "os";
import path from "path";
import welcomeNoteFile from "../../../resources/welcomeNote.md?asset";


export const getRootDirectory = () => {
    return `${homedir()}/${appDirectoryName}`;
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDirectory()}/${filename}`);

    return {
        title: filename.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs,
    }
}

export const getNotes: GetNotes = async () => {
    const rootDirectory = getRootDirectory();
    
    await ensureDir(rootDirectory);
    const notesFileNames = await readdir(rootDirectory, {
        encoding: fileEncoding,
        withFileTypes: false
    });

    const notes = notesFileNames.filter((filename) => filename.endsWith('.md'));

    if(isEmpty(notes)) {
        const content = await readFile(welcomeNoteFile, {
            encoding: fileEncoding
        });

        await writeFile(`${rootDirectory}/${welcomeNoteFileName}`, content, {
            encoding: fileEncoding
        });
        notes.push(welcomeNoteFileName);
    }

    return Promise.all(notes.map(getNoteInfoFromFilename));
}

export const readNote: ReadNote = async (filename) => {
    const rootDirectory = getRootDirectory();

    return readFile(`${rootDirectory}/${filename}.md`, {
        encoding: fileEncoding
    })
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDirectory = getRootDirectory();
    return writeFile(`${rootDirectory}/${filename}.md`, content, {
        encoding: fileEncoding
    })
}

export const createNote: CreateNote = async () => {
    const rootDirectory = getRootDirectory();

    await ensureDir(rootDirectory);
    const {filePath, canceled} = await dialog.showSaveDialog({
        title: 'New Note',
        defaultPath: `${rootDirectory}/Untitled.md`,
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation',],
        showsTagField: false,
        filters: [{
            name: 'Markdown',
            extensions: ['md']
        }]
    })

    if(canceled || !filePath) {
        return false;
    }

    const {name: filename, dir: parentDir} = path.parse(filePath);
    if(parentDir !== rootDirectory) {
        await dialog.showMessageBox({
            type: 'error',
            title: 'Creation Failed',
            message: `All Notes must be saved under the ${rootDirectory} directory.
            Avoid using others directories to prevent unexpected behavior.`,
        })
        return false;
    }

    await writeFile(filePath, '');
    return filename;
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDirectory = getRootDirectory();

    const {response} = await dialog.showMessageBox({
        type: 'warning',
        title: 'Delete note',
        message: `Are you sure you want to delete the note "${filename}"?`,
        buttons: ['Delete', 'Cancel'], // O is delete, 1 is Cancel
        defaultId: 1,
        cancelId: 1,
    })

    if(response == 1) {
        return false;
    }
    await remove(`${rootDirectory}/${filename}.md`);
    return true;

}