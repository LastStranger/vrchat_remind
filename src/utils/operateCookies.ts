import {BaseDirectory, createDir, readTextFile, writeTextFile} from "@tauri-apps/api/fs";

const setLocCookies = async (cookies: string) => {
    writeTextFile('vrchatDir/cookies', cookies, {dir: BaseDirectory.Desktop}).catch(e => {
        createDir('vrchatDir', {dir: BaseDirectory.Desktop, recursive: true}).then(async res => {
            await setLocCookies(cookies);
        });
    });
}

const getLocCookies = async () => {
    return await readTextFile('vrchatDir/cookies', {dir: BaseDirectory.Desktop});
}

export {setLocCookies, getLocCookies}
