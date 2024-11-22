import {readdir, readFile, writeFile} from 'fs/promises';
import {dirname, resolve, relative} from 'path';
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
const bannerDir = resolve(__dirname, '../docs', 'assets', 'banners');
const scaffoldHTML = await readFile(resolve(__dirname, 'scaffold.html'), 'utf8');

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

    notes.push(await generateHTMLFile(srcFile));
}

console.log('Generating notes index...');
// First, we group the notes by year.
const notesMap = notes.reduce((acc, note) => {
    const year = note.fileName.substring(0, 4);

    if (!acc[year]) {
        acc[year] = [];
    }

    acc[year].push(note);
    return acc;
}, {})

// Second, we create an index section for each year.
const yearSections = [];
for (const year in notesMap) {
    const yearNotes = notesMap[year];
    // TODO: Remove subtraction of 1 from year. This was done so the 2025 notes are shown under 2024.
    let yearSection = `## ${year - 1}`;
    yearNotes.forEach(note => {
        yearSection += `\n- [${note.title}](${note.fileName})`;
    });

    yearSections.push(yearSection);
}

// Finally, we generate the index.html file.
await generateHTMLFile("index.md", yearSections.join("\n\n"));

console.log('HTML files built successfully!');

async function generateHTMLFile(srcFile, contentReplacement) {
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
    let title = outputHTML.match(/>(.*?)<\/h1>/)?.[1] ?? "Elvis Chidera's Notes";
    outputHTML = outputHTML.replace('<!-- output_title -->', `<title>${title}</title>`);

    const bannerPath = resolve(bannerDir, srcFile.replace('.md', '.jpeg'));
    outputHTML = outputHTML.replace('<!-- output_banner_path -->', relative(destDir, bannerPath));

    const outputFile = srcFile.replace('.md', '.html');
    await writeFile(resolve(destDir, outputFile), outputHTML);
    console.log(`Generated '${outputFile}' file in '${destDir}'!`);

    return {
        "title": title,
        "fileName": outputFile
    }
}
