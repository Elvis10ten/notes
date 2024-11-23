import {writeFile} from 'fs/promises';
import {relative, resolve} from 'path';
import {marked} from "marked";
import markedKatex from "marked-katex-extension";
import {markedHighlight} from "marked-highlight";
import highlightJS from 'highlight.js';
import {__dirname, destDir, getDestPath, getNoteFileNames, getSrcPath, getToolsPath, readFileText} from "./utils.js";

console.log('Building HTML files...');

// Configure the marked library to use the Katex and Highlight.js plugins.
marked.use(
    {
        async: true
    },
    markedKatex({
        throwOnError: false
    }),
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = highlightJS.getLanguage(lang) ? lang : 'plaintext';
            return highlightJS.highlight(
                code,
                {language}
            ).value;
        }
    })
);

const bannersDir = resolve(__dirname, '..', 'docs', 'assets', 'banners');
const scaffoldHTML = await readFileText(getToolsPath('note-scaffold.html'));

const noteFileNames = await getNoteFileNames();
noteFileNames.forEach(async noteFileName => {
    await buildHTMLFile(noteFileName);
});
console.log('HTML files built successfully!');

async function buildHTMLFile(noteFileName) {
    console.log(`Building HTML file for '${noteFileName}'...`);

    console.log(`Reading and parsing the source Markdown file...`);
    const srcMarkdown = await readFileText(getSrcPath(noteFileName));
    const srcHTML = await marked(srcMarkdown);
    let outputHTML = scaffoldHTML.replace('<!-- output_content -->', srcHTML);

    console.log(`Replacing '/docs/assets' paths in the generated HTML...`);
    outputHTML = outputHTML.replace(/\/docs\/assets/g, 'assets');
    console.log(`Replacing '/src/(.*).md' paths with '/$1.html' in the generated HTML...`);
    outputHTML = outputHTML.replace(/\/src\/(.*?)\.md/, "$1.html");

    console.log(`Setting the title...`);
    let firstH1Text = outputHTML.match(/>(.*?)<\/h1>/)?.[1] ?? "Elvis Chidera's Notes";
    outputHTML = outputHTML.replace('<!-- output_title -->', firstH1Text);

    console.log(`Setting the banner path...`);
    const bannerPath = resolve(bannersDir, noteFileName.replace('.md', '.jpg'));
    outputHTML = outputHTML.replace('<!-- output_banner_path -->', relative(destDir, bannerPath));

    console.log(`Writing the output HTML file...`);
    const outputFilePath = getDestPath(noteFileName)
    await writeFile(outputFilePath, outputHTML);

    console.log(`Built 'file://${outputFilePath}'!`);
}
