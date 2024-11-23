This repo powers my [notes site](https://notes.elvischidera.com).

It was inspired by this [repo](https://github.com/gordonnl/markdown-blog-template).

My goal is to create a "software rot" resistant blog. I don't want to touch any of the tooling in the future. I just want to write markdown notes, not fight with the tools.

I achieved this by picking boring tools and keeping the blog simple. Currently, there are only 7 NPM dependencies and 2 scripts of about 50 lines each.

Here is all you need to know:
1. All markdown notes must be in the `src` directory.
2. Each note's file name must start with a year e.g. `2024-1-foo.md`.
3. To order notes within a year, use a number after the year e.g. `2024-1-foo.md`, `2024-2-bar.md`.
4. To link to another note in the `src` directory, prefix the link with `/src/` e.g. `[/src/2024-1-foo.md](/src/2024-1-foo.md)`.
5. All images must be placed in a dedicated directory inside the `docs/assets` directory e.g. `docs/assets/2024-1-foo/`.
6. All notes banners must be in the `assets/banners` directory and the name must match the note's file name e.g. `assets/banners/2024-1-foo.png`.
7. To reference any image in a note, prefix the link with `/docs/assets/` e.g. `![foo](/docs/assets/2024-1-foo/foo.png)`.