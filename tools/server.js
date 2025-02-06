import http from "http";
import { promises as fs, watch } from "fs";
import path from "path";
import {allInnerSrcDirs, destDir, srcBooksDir, srcDir, srcEssayDir, srcPapersDir, toolsDir} from "./utils.js";
import { spawn } from "child_process";

const PORT = 3000;

// Create HTTP server
const createServer = () => {
    const server = http.createServer(async (req, res) => {
        let filePath = path.join(destDir, req.url === "/" ? "index.html" : req.url);

        try {
            const content = await fs.readFile(filePath);
            const ext = path.extname(filePath).toLowerCase();

            const contentType = {
                ".html": "text/html",
                ".css": "text/css",
                ".js": "application/javascript",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".gif": "image/gif",
                ".svg": "image/svg+xml",
                ".json": "application/json",
            }[ext] || "text/plain";

            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        } catch (err) {
            res.writeHead(err.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain" });
            res.end(err.code === "ENOENT" ? "404 Not Found" : "500 Internal Server Error");
        }
    });

    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });

    return server;
};

const server = createServer();

let processInstance = null;

const runCommand = () => {
    if (processInstance) {
        processInstance.kill(); // Kill the previous process.
        console.log(`Restarting: "npm run build"...`);
    }

    processInstance = spawn("npm", ["run", "build"], { stdio: "inherit" });
};

allInnerSrcDirs.concat(toolsDir).forEach((dir) => {
    watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename) {
            console.log(`File changed: ${filename}`);
            runCommand();
        }
    });
});
