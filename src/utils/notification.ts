import {
    isPermissionGranted,
    Options,
    requestPermission,
    sendNotification,
} from "@tauri-apps/api/notification";

interface Props extends Omit<Options, "title"> {
    title?: string;
}

export default async function notify(options: Props) {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
    }
    if (permissionGranted) {
        sendNotification({ title: "通知", icon: "icon.icns", ...options });
    }
}
