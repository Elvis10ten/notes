import {readdir, readFile} from 'fs/promises';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

// The ES module version of Node.js does not have the __dirname and __filename variables. So, we need to define them manually.
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const projectDirName = resolve(__dirname, '..');
// The source directory is where the Markdown files are stored, and the destination directory is where the HTML files will be generated.
export const srcDir = resolve(__dirname, '..', 'src');
export const destDir = resolve(__dirname, '..', 'docs');

export async function getNoteFileNames() {
    const notes = await readdir(srcDir);
    return notes.filter(note => note.endsWith('.md'));
}

export function getSrcPath(noteFileName) {
    return resolve(srcDir, noteFileName);
}

export function getDestPath(noteFileName) {
    return resolve(destDir, noteFileName.replace('.md', '.html'));
}

export function getToolsPath(fileName) {
    return resolve(__dirname, fileName);
}

export async function readFileText(filePath) {
    return await readFile(filePath, 'utf8');
}