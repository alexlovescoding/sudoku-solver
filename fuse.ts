import {
    FuseBox,
    Sparky,
    JSONPlugin,
    CopyPlugin,
    WebIndexPlugin
} from "fuse-box";
import * as rimraf from "rimraf";
import * as path from "path";
import * as express from "express";

const outDir = "dist"
const opts = {
    homeDir: "src",
    output: `${outDir}/$name.js`,
    cache: true,
    target: "browser",
    plugins: [
        JSONPlugin(),
        CopyPlugin({
            files: ["*.jpg", "*.svg", "*.png"],
            useDefault: true,
            dest: `assets`,
        }),
        WebIndexPlugin({
            template: "./src/index.html",
            bundles: ["js/bundle", "js/vendor"],
        })
    ]
}

Sparky.task(
    "default",
    ["clean", "run"],
    () => undefined,
);

Sparky.task("clean", () => rimraf.sync(`./${outDir}`));
Sparky.task("run", () => {
    const fuse = FuseBox.init(opts);
    const vendorBundle = fuse.bundle(`js/vendor`);
    const bundle = fuse.bundle(`js/bundle`);

    vendorBundle.instructions(
        " ~ index.tsx",
    );
    bundle.instructions(
        `> [index.tsx]`,
    );

    const buildDir = path.join(__dirname, outDir);
    fuse.dev({ root: false, port: 8080, hmr: true }, server => {
        const app: express.Application = server.httpServer.app;
        app.use(express.static(buildDir));
        app.get("*", (_, res) => {
            res.sendFile(path.join(buildDir, "index.html"));
        });
    });

    bundle.hmr().watch();

    return fuse.run();
});
