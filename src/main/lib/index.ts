import { appDirectoryName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes } from "@shared/types";
import { ensureDir, readdir, stat } from "fs-extra";
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