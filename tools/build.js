import {readdir, readFile, writeFile} from 'fs/promises';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {marked} from "marked";
import markedKatex from "marked-katex-extension";
import {markedHighlight} from "marked-highlight";
import highlightJS from 'highlight.js';

console.log('Building HTML files...');

// The ES module version of Node.js does not have the __dirname and __filename variables. So, we need to define them manually.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// The source directory is where the Markdown files are stored, and the destination directory is where the HTML files will be generated.
const srcDir = resolve(__dirname, '../src');
const destDir = resolve(__dirname, '../docs');

// Configure the marked library to use the Katex and Highlight.js plugins.
marked.use({
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

const scaffoldHTML = await readFile(resolve(__dirname, 'scaffold.html'), 'utf8');
const srcFiles = await readdir(srcDir);

const notes = [];
// Converts all notes markdown files to HTML files (except index.md).
for (const srcFile of srcFiles) {
    if (!srcFile.endsWith('.md')) {
        console.log(`Skipping '${srcFile}' file as it is not a Markdown file.`);
        continue;
    }

    if (srcFile === "index.md") {
        continue;
    }

    notes.push(await convertFile(srcFile));
}

console.log('Generating notes index...');
const notesMap = notes.reduce((acc, note) => {
    const year = note.fileName.substring(0, 4);

    if (!acc[year]) {
        acc[year] = [];
    }

    acc[year].push(note);
    return acc;
}, {})

const yearSections = [];
for (const year in notesMap) {
    const yearNotes = notesMap[year];

    let yearSection = `## ${year}`;
    yearNotes.forEach(note => {
        yearSection += `\n- [${note.title}](${note.fileName})`;
    });

    yearSections.push(yearSection);
}

await convertFile("index.md", yearSections.join("\n\n"));

console.log('HTML files built successfully!');

async function convertFile(srcFile, contentReplacement) {
    console.log(`Converting '${srcFile}' file to HTML...`);

    let srcMarkdown = await readFile(resolve(srcDir, srcFile), 'utf8');
    if (contentReplacement) {
        srcMarkdown = srcMarkdown.replace('<!-- content -->', contentReplacement);
    }
    const srcHTML = await marked(srcMarkdown);

    let outputHTML = scaffoldHTML.replace('<!-- output_content -->', srcHTML);

    // Replace the 'docs/assets' path with 'assets' in the generated HTML.
    outputHTML = outputHTML.replace(/\/docs\/assets/g, 'assets');

    // Replace the title with the content of the first <h1> tag.
    const title = outputHTML.match(/>(.*?)<\/h1>/)?.[1];
    if (!title) {
        throw new Error(`No title found in '${srcFile}' file!`);
    }
    outputHTML = outputHTML.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);

    const outputFile = srcFile.replace('.md', '.html');
    await writeFile(resolve(destDir, outputFile), outputHTML);
    console.log(`Generated '${outputFile}' file in '${destDir}'!`);

    return {
        "title": title,
        "fileName": outputFile
    }
}
