import {srcEssayDir, srcBooksDir, getBannerPath, getMarkdownFiles, getSrcPath, getToolsPath, projectDirName, readFileText} from "./utils.js";
import {writeFile} from "fs/promises";
import {relative, resolve, sep} from "path";

console.log('Updating notes index.md file...');

let essayLinks = [];
(await getMarkdownFiles(srcEssayDir)).forEach(async fileName => {
    console.log(`Processing '${fileName}' essay...`);

    const path = resolve(srcEssayDir, fileName);
    const markdownText = await readFileText(path);
    const title = getTitle(markdownText);
    const linkPath = getLinkPath(path);
    essayLinks.push(`- [${title}](${linkPath})`);
});

let bookLinks = [];
(await getMarkdownFiles(srcBooksDir)).forEach(async fileName => {
    console.log(`Processing '${fileName}'...`);

    const path = resolve(srcBooksDir, fileName);
    const markdownText = await readFileText(path);
    const title = getTitle(markdownText);
    const linkPath = getLinkPath(path);
    const bannerPath = getBannerPath(fileName);

    bookLinks.push(`<a href="${linkPath}"><img src="${bannerPath}" alt="${title}" /></a>`);
});

console.log('Updating index.md file...');
let scaffoldMarkdown = await readFileText(getToolsPath('index-scaffold.md'));
scaffoldMarkdown = scaffoldMarkdown.replace('<!-- index_books_content -->', bookLinks.join('\n\n'));
scaffoldMarkdown = scaffoldMarkdown.replace('<!-- index_essays_content -->', essayLinks.join('\n\n'));
await writeFile(getSrcPath('index.md'), scaffoldMarkdown);

console.log('Notes index.md updated successfully!');

function getTitle(markdownText) {
    return markdownText.match(/^# (.*)$/m)[1]; // Get the first '# ***' line in the markdown file (without the '#').
}

function getLinkPath(path) {
    return sep + relative(projectDirName, path);
}