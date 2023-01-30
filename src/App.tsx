import {useEffect, useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";
import {createDir, BaseDirectory, writeTextFile, readTextFile, readBinaryFile} from '@tauri-apps/api/fs';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import Logo from './logo.png';
import HttpDemo from "./components/HttpDemo";
import 'normalize.css';
// import {getVersion} from "@tauri-apps/api/app";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [contents, setContents] = useState('');
    const [img, setImg] = useState<any>("");


    return <HttpDemo />

    // useEffect(() => {
        // createDir('users', { dir: BaseDirectory.Desktop, recursive: true }).then(async res => {
        //     console.log(res);
        //     const contents = await readTextFile('users/test', { dir: BaseDirectory.Desktop });
        //     setContents(contents);
        // });
        // setNotification();
        // sendNotification('Tauri is awesome!');
        // sendNotification({ title: 'TAURI', body: 'Tauri is awesome!', icon: "icon.icns" });
        // getImg();

    // }, [])

    // const setNotification = async () => {
    //     let permissionGranted = await isPermissionGranted();
    //     if (!permissionGranted) {
    //         const permission = await requestPermission();
    //         permissionGranted = permission === 'granted';
    //     }
    //     if (permissionGranted) {
    //         // sendNotification('Tauri is awesome!');
    //         sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    //     }
    // }

    // const getImg = async () => {
    //     const res = await readBinaryFile('users/123.jpg', { dir: BaseDirectory.Desktop });
    //     console.log(res);
    //     const image = URL.createObjectURL(
    //         new Blob([res.buffer], { type: 'image/png' } /* (1) */)
    //     );
    //     setImg(image);
    // }
    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", {name}));
    // }

    // const handleGetVersion = async () => {
    //     // const res = await getVersion();
    //     const res:any = await invoke("get_version", {name})
    //     setVersion(res);
    // }
    //
    // const handleSayName = async () => {
    //     const res = await invoke("say_my_name", {name})
    //     console.log(res);
    // }

    // const handleWriteInFile = async () => {
    //     const res = await writeTextFile('users/test', name, { dir: BaseDirectory.Desktop });
    //     console.log(res);
    // }

    // return (
    //     <div className="container">
    //         <HttpDemo />
    //         <h2>contents: {contents}</h2>
    //
    //         <div className="row">
    //             <a href="https://vitejs.dev" target="_blank">
    //                 <img src="/vite.svg" className="logo vite" alt="Vite logo"/>
    //             </a>
    //             <a href="https://tauri.app" target="_blank">
    //                 <img src="/tauri.svg" className="logo tauri" alt="Tauri logo"/>
    //             </a>
    //             <a href="https://reactjs.org" target="_blank">
    //                 <img src={reactLogo} className="logo react" alt="React logo"/>
    //             </a>
    //         </div>
    //
    //         <p>Click on the Tauri, Vite, and React logos to learn more.</p>
    //
    //         <div className="row">
    //             <div>
    //                 <input
    //                     id="greet-input"
    //                     onChange={(e) => setName(e.currentTarget.value)}
    //                     placeholder="Enter a name..."
    //                 />
    //                 <button type="button" onClick={() => greet()}>
    //                     Greet
    //                 </button>
    //                 {/*<button type="button" onClick={handleGetVersion}>version</button>*/}
    //                 {/*<button type="button" onClick={handleSayName}>sayMyName</button>*/}
    //                 <button type="button" onClick={handleWriteInFile}>writeInFile</button>
    //             </div>
    //         </div>
    //         <p>{greetMsg}</p>
    //         <p>{version}</p>
    //         <img src={img} alt=""/>
    //     </div>
    // );
}

export default App;
