import { BaseDirectory, createDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

const saveName = (name: string) => {
    writeTextFile("vrchatDir/names", name, { dir: BaseDirectory.Desktop }).catch(e => {
        createDir("vrchatDir", { dir: BaseDirectory.Desktop, recursive: true }).then(async res => {
            await saveName(name);
        });
    });
};

const getNames = async () => {
    return await readTextFile("vrchatDir/names", { dir: BaseDirectory.Desktop });
};

export { saveName, getNames };
