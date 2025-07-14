import { appDirectoryName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes, ReadNote, WriteNote } from "@shared/types";
import { ensureDir, readdir, readFile, stat, writeFile } from "fs-extra";
import { homedir } from "os";


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
    console.log(`Writing note to ${rootDirectory}/${filename}.md`);
    return writeFile(`${rootDirectory}/${filename}.md`, content, {
        encoding: fileEncoding
    })
}