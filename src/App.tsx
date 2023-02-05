import React, { useEffect, useRef, useState } from "react";
import request from "./utils/Request";
import "./App.scss";
import FriendLocation from "./components/FriendLocation";
import { setLocCookies } from "./utils/operateCookies";
import "normalize.css";
import notify from "./utils/notification";

const App = () => {
    const [onlineUserList, setOnlineUser] = useState<any>([]); // 在线用户列表
    const [likedPerson, setLikedPerson] = useState("");
    const [confirmedPerson, setConfirmedPerson] = useState("");
    const [cookies, setCookies] = useState("");
    const timeRef = useRef<any>(null);
    const notifiedRef = useRef(false); // 如果通知过一次后不再通知

    useEffect(() => {
        handleRequest();
        timeRef.current = setInterval(() => {
            handleRequest();
        }, 60000);
        // }, 10000)
    }, []);

    useEffect(() => {
        if (confirmedPerson) {
            clearInterval(timeRef.current);
            handleRequest();
            timeRef.current = setInterval(() => {
                handleRequest();
            }, 60000);
            // }, 10000)
        }
    }, [confirmedPerson]);

    const handleRequest = async () => {
        try {
            const data = await request("https://vrchat.com/api/1/auth/user/friends?offline=false&n=50&offset=0");
            console.log(data);
            setOnlineUser(data);
            console.log("%clikedPerson", "color: #22E1FF; font-size: 16px", confirmedPerson);
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
                    <button
                        onClick={() => {
                            setLikedPerson("");
                            setConfirmedPerson(likedPerson);
                        }}
                    >
                        确认
                    </button>
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
                                className="picture"
                                src={each.profilePicOverride ? each.profilePicOverride : each.currentAvatarImageUrl}
                                alt=""
                            />
                            <div className="right-side">
                                <div className="name">{each.displayName}</div>
                                <div className="status-Description">{each.statusDescription}</div>
                            </div>
                        </div>
                        <FriendLocation worldKey={each.location} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
