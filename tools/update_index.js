import {
    srcEssayDir,
    srcBooksDir,
    getBannerRelativePath,
    getMarkdownFileNames,
    getToolsPath,
    projectDirName,
    readFileText,
    srcDir, srcPapersDir,
} from "./utils.js";
import {writeFile} from "fs/promises";
import {relative, resolve, sep} from "path";

console.log('Building indices...');
const essayIndices  = await getListString(srcEssayDir, false);
const papersIndices = await getListString(srcPapersDir, false);
const bookIndices = await getListString(srcBooksDir, true);

console.log('Updating index.md file...');
let scaffoldMarkdown = await readFileText(getToolsPath('index-scaffold.md'));
scaffoldMarkdown = scaffoldMarkdown.replace('<!-- placeholder_books_index -->', bookIndices);
scaffoldMarkdown = scaffoldMarkdown.replace('<!-- placeholder_essays_index -->', essayIndices);
scaffoldMarkdown = scaffoldMarkdown.replace('<!-- placeholder_papers_index -->', papersIndices);
await writeFile(resolve(srcDir, 'index.md'), scaffoldMarkdown);

console.log('Updating 404.md file...');
scaffoldMarkdown = scaffoldMarkdown.replace(
    '<!-- placeholder_404_error -->',
    `<div class="error-container">⚠️ Uh-oh! The content you were looking for couldn't be found. You've been redirected to the index page.</div>`
);
await writeFile(resolve(srcDir, '404.md'), scaffoldMarkdown);

console.log('Index files updated!');

function getLinkPath(path) {
    return sep + relative(projectDirName, path);
}

function getH1Text(markdownText) {
    return markdownText.match(/^# (.*)$/m)[1]; // Get the first '# ***' line in the markdown file (without the '#').
}

async function getListString(dir, isImage) {
    return (await getMarkdownFileNames(dir)).map(async fileName => {
        console.log(`Processing '${fileName}' essay...`);

        const path = resolve(dir, fileName);
        const markdownText = await readFileText(path);
        const title = getH1Text(markdownText);
        const linkPath = getLinkPath(path);

        if (isImage) {
            const bannerPath = getBannerRelativePath(fileName);
            return `<a href="${linkPath}"><img src="${bannerPath}" alt="${title}" loading="lazy" /></a>`;
        } else {
            return `- [${title}](${linkPath})`;
        }
    }).join('\n');
}
