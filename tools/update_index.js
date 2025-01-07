import {getNoteFileNames, getSrcPath, getToolsPath, projectDirName, readFileText} from "./utils.js";
import {writeFile} from "fs/promises";
import {relative, sep} from "path";

console.log('Updating notes index.md file...');

let noteFileNames = await getNoteFileNames();
noteFileNames = noteFileNames.filter(noteFileName => noteFileName !== 'index.md');

console.log('Creating a map of notes by year...');
const indexMap = await noteFileNames.reduce(async (accPromise, noteFileName) => {
    console.log(`Processing '${noteFileName}'...`);

    const acc = await accPromise;
    const markdownText = await readFileText(getSrcPath(noteFileName));
    const title = markdownText.match(/^# (.*)$/m)[1]; // Get the first '# ***' line in the markdown file (without the '#').
    const year = noteFileName.substring(0, 4);

    if (!acc[year]) {
        acc[year] = [];
    }

    acc[year].push({
        title,
        noteFileName
    });
    return acc;
}, Promise.resolve({}));

console.log('Creating an index section for each year...');
const indexSections = [];
for (const year in indexMap) {
    console.log(`Processing year '${year}'...`);
    const notesMetadata = indexMap[year];

    let yearSection = `## ${year}`;

    notesMetadata.forEach(noteMetadata => {
        const path = sep + relative(projectDirName, getSrcPath(noteMetadata.noteFileName));
        yearSection += `\n- [${noteMetadata.title}](${path})`;
    });

    indexSections.push(yearSection);
}

console.log('Updating index.md file...');
const scaffoldMarkdown = await readFileText(getToolsPath('index-scaffold.md'));
const indexMarkdown = scaffoldMarkdown.replace('<!-- index_content -->', indexSections.join('\n\n'));
await writeFile(getSrcPath('index.md'), indexMarkdown);

console.log('Notes index.md updated successfully!');