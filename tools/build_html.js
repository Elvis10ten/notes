import {writeFile} from 'fs/promises';
import {resolve} from 'path';
import {marked} from "marked";
import markedKatex from "marked-katex-extension";
import {markedHighlight} from "marked-highlight";
import highlightJS from 'highlight.js';
import {
    srcDir,
    srcBooksDir,
    srcEssayDir,
    getDestHTMLPath,
    getMarkdownFileNames,
    getToolsPath,
    readFileText,
    getBannerRelativePath, srcPapersDir, allInnerSrcDirs
} from "./utils.js";

console.log('Configuring the marked library...');
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
                {
                    language: language
                }
            ).value;
        }
    })
);

console.log('Building HTML files...');
const scaffoldHTML = await readFileText(getToolsPath('markdown-scaffold.html'));
const srcDirs = allInnerSrcDirs.concat(srcDir);

for (const dir of srcDirs) {
    const markdownFileNames = await getMarkdownFileNames(dir);
    for (const markdownFileName of markdownFileNames) {
        await buildHTMLFile(dir, markdownFileName);
    }
}

console.log('HTML files built successfully!');

async function buildHTMLFile(dir, markdownFileName) {
    console.log(`Building HTML file for '${dir}/${markdownFileName}'...`);

    console.log(`Reading and parsing the source Markdown file...`);
    const srcMarkdown = await readFileText(resolve(dir, markdownFileName));
    const srcHTML = await marked(srcMarkdown);
    let outputHTML = scaffoldHTML.replace('<!-- output_content -->', srcHTML);

    console.log(`Replacing '/docs/assets' paths in the generated HTML...`);
    outputHTML = outputHTML.replace(/\/docs\/assets/g, '/assets');
    console.log(`Replacing '/src/(.*).md' paths with '/$1.html' in the generated HTML...`);
    outputHTML = outputHTML.replace(/\/src\/(.*?)\.md/g, "$1.html");

    console.log(`Setting the title...`);
    let firstH1Text = outputHTML.match(/>(.*?)<\/h1>/)?.[1] ?? 'Elvis Chidera Blog';
    outputHTML = outputHTML.replace('<!-- output_title -->', firstH1Text);

    console.log(`Setting the banner path...`);
    outputHTML = outputHTML.replace('<!-- output_banner_path -->', getBannerRelativePath(markdownFileName));

    console.log(`Writing the output HTML file...`);
    const outputFilePath = await getDestHTMLPath(dir, markdownFileName)
    await writeFile(outputFilePath, outputHTML);

    console.log(`Built 'file://${outputFilePath}'!`);
}
