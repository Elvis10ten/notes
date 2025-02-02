import {bannersDir, getBannerPath, getNoteFileNames, getSrcPath, getToolsPath, projectDirName, readFileText} from "./utils.js";
import {writeFile} from "fs/promises";
import {relative, resolve, sep} from "path";

console.log('Updating notes index.md file...');

let noteFileNames = await getNoteFileNames();
noteFileNames = noteFileNames.filter(noteFileName => noteFileName !== 'index.md');

let bookLinks = [];

noteFileNames.forEach(async noteFileName => {
    console.log(`Processing '${noteFileName}'...`);

    const markdownText = await readFileText(getSrcPath(noteFileName));
    const title = markdownText.match(/^# (.*)$/m)[1]; // Get the first '# ***' line in the markdown file (without the '#').
    const year = noteFileName.substring(0, 4);
    const path = sep + relative(projectDirName, getSrcPath(noteFileName));
    const bannerPath = getBannerPath(noteFileName);

    bookLinks.push(`<a href="${path}"><img src="${bannerPath}" alt="${title}" /></a>`);
});

console.log('Updating index.md file...');
const scaffoldMarkdown = await readFileText(getToolsPath('index-scaffold.md'));
const indexMarkdown = scaffoldMarkdown.replace('<!-- index_books_content -->', bookLinks.join('\n\n'));
await writeFile(getSrcPath('index.md'), indexMarkdown);

console.log('Notes index.md updated successfully!');