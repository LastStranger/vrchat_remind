import React, { useEffect, useRef, useState } from "react";
import request from "./utils/Request";
import "./App.scss";
import FriendLocation from "./components/FriendLocation";
import { setLocCookies } from "./utils/operateCookies";
import "normalize.css";
import notify from "./utils/notification";
import { getNames, saveName } from "./utils/storeName";
import { getWorldKey } from "./utils/tools";
import BioModal from "./components/BioModal";

const App = () => {
    const [onlineUserList, setOnlineUserList] = useState<any>([]); // 在线用户列表
    const [likedPerson, setLikedPerson] = useState("");
    const [confirmedPerson, setConfirmedPerson] = useState("");
    const [cookies, setCookies] = useState("");
    const timeRef = useRef<any>(null);
    const notifiedRef = useRef(false); // 如果通知过一次后不再通知
    const bioRef = useRef<any>(null);

    const repeatRequest = async () => {
        clearInterval(timeRef.current);
        notifiedRef.current = false;
        await handleRequest();
        timeRef.current = setInterval(() => {
            handleRequest();
        }, 60000);
        // }, 10000)
    };

    useEffect(() => {
        getNames().then(res => {
            setConfirmedPerson(res);
        });
    }, []);

    useEffect(() => {
        if (confirmedPerson) {
            repeatRequest();
        }
    }, [confirmedPerson]);

    const handleRequest = async () => {
        try {
            const data = await request("https://vrchat.com/api/1/auth/user/friends?offline=false&n=50&offset=0");
            setOnlineUserList(data);
            const likeOnline = data.find((person: any) => person.displayName === confirmedPerson);
            if (likeOnline && !notifiedRef.current) {
                await notify({
                    title: "通知",
                    body: `${likeOnline.displayName}已上线`,
                });
                notifiedRef.current = true;
            }
        } catch (e) {
            notify({ title: "通知", body: `cookies貌似过期了,请更新cookie` });
        }
    };

    const handleCookies = async () => {
        const res = await setLocCookies(cookies);
        repeatRequest();
        setCookies("");
    };

    const handleConfirmName = () => {
        setLikedPerson("");
        setConfirmedPerson(likedPerson);
        saveName(likedPerson);
    };

    const handleOpenModal = (bio: string, e: React.MouseEvent<HTMLDivElement>) => {
        bioRef.current?.open(bio, { x: e.clientX, y: e.clientY });
    };

    return (
        <div className="person-list">
            <div className="operate-box">
                <div className="name-box">
                    <input
                        type="text"
                        placeholder="请填写好友的完整名字"
                        value={likedPerson}
                        onChange={e => {
                            setLikedPerson(e.target.value);
                        }}
                    />
                    <button onClick={handleConfirmName}>确认</button>
                </div>
                <div className="name-box">
                    <input
                        type="text"
                        placeholder="请填写cookie"
                        value={cookies}
                        onChange={e => {
                            setCookies(e.target.value);
                        }}
                    />
                    <button onClick={handleCookies}>更新cookie</button>
                </div>
            </div>
            <h2>当前上线好友数量:{onlineUserList.length}人</h2>
            <h2>当前关注的好友:{confirmedPerson}</h2>
            <div>
                {onlineUserList.map((each: any) => (
                    <div key={each.id} className="person">
                        <div className="up-side">
                            <img
                                loading="lazy"
                                className="picture"
                                src={each.profilePicOverride ? each.profilePicOverride : each.currentAvatarImageUrl}
                                alt=""
                            />
                            <div className="right-side">
                                <div className="name">{each.displayName}</div>
                                {each.bio && (
                                    <div className="bio" onClick={e => handleOpenModal(each.bio, e)}>
                                        bio
                                    </div>
                                )}
                                <div className="status-Description">{each.statusDescription}</div>
                            </div>
                        </div>
                        <FriendLocation worldKey={getWorldKey(each.location)} name={each.displayName} />
                    </div>
                ))}
            </div>
            <BioModal ref={bioRef} />
        </div>
    );
};

export default App;
