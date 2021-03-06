import fs from "fs-extra";
import path from "path";

const CACHE_DIR: string = `.cache`;
const FS_PLUGIN_DIR: string = `gatsby-source-googlemaps-static`;

const createFilePath = (directory: string, filename: string, ext: string) => {
    return path.join(directory, `${filename}${ext}`);
};

export default async (data: Buffer, store: any, ext: string, id: string) => {
    const pluginCacheDir: string = path.join(
        store.getState().program.directory,
        CACHE_DIR,
        FS_PLUGIN_DIR
    );

    const hash: string = `hash-${id}`;

    await fs.ensureDir(pluginCacheDir);
    await fs.ensureDir(path.join(pluginCacheDir, hash));

    const dir: string = path.join(pluginCacheDir, hash);

    const filename = createFilePath(dir, "google-maps-static", `${ext}`);

    await fs.writeFile(filename, data);

    return filename;
};
