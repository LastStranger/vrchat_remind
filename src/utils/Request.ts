import { fetch } from "@tauri-apps/api/http";
import { getLocCookies } from "./operateCookies";

interface Params {
    headers: any;

    [key: string]: any;
}

const request = async (url: string, params?: Params): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const res = await getLocCookies();
        fetch(url, {
            method: "GET",
            timeout: 30,
            headers: {
                cookie: res,
            },
            ...params?.options,
        })
            .then((res: any) => {
                console.log("%cres", "color: #22E1FF; font-size: 16px", res);
                if (res.status === 200) {
                    return resolve(res.data);
                }
                reject(res?.data?.error?.message);
            })
            .catch(e => {
                console.log("%ce", "color: #22E1FF; font-size: 16px", e);
            });
    });
};
export default request;
