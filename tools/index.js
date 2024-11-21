import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {marked} from "marked";
import markedKatex from "marked-katex-extension";
import {markedHighlight} from "marked-highlight";
import highlightJS from 'highlight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = resolve(__dirname, '../src');
const destDir = resolve(__dirname, '../docs');

marked.use(
    markedKatex({
    throwOnError: false
    }),
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = highlightJS.getLanguage(lang) ? lang : 'plaintext';
            return highlightJS.highlight(code, { language }).value;
        }
    }));



const scaffoldContent = await readFile(resolve(__dirname, 'scaffold.html'), 'utf8');
const srcFiles = await readdir(srcDir);

for (const srcFile of srcFiles) {
    if (!srcFile.endsWith('.md')) continue;
    console.log(`Processing ${srcFile}...`);

    const markdownText = await readFile(resolve(srcDir, srcFile), 'utf8');
    let markdownHTML = marked(markdownText);
    let htmlPage = scaffoldContent.replace('{content}', markdownHTML);

    htmlPage = htmlPage.replace(/docs\/assets/g, 'assets');

    const newTitle = htmlPage.match(/>(.*?)<\/h1>/)[1] || null;
    if (newTitle) {
        htmlPage = htmlPage.replace(/<title>(.*?)<\/title>/, `<title>${newTitle}</title>`);
    }

    const outputFile = srcFile.replace('.md', '.html');
    await writeFile(resolve(destDir, outputFile), htmlPage);
}
