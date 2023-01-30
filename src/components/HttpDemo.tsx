import React, {useEffect, useRef, useState} from 'react';
import request from "../utils/Request";
import {isPermissionGranted, requestPermission, sendNotification} from "@tauri-apps/api/notification";
import './index.scss';
import FriendLocation from "./FriendLocation";
import {setLocCookies} from "../utils/operateCookies";

const HttpDemo = () => {
        const [img, setImg] = useState("");
        const [onlineUserList, setOnlineUser] = useState<any>([]);
        const [notificated, setNotificated] = useState(false);
        const [likedPerson, setLikedPerson] = useState("");
        const [confirmedPerson, setConfirmedPerson] = useState("");
        const [cookies, setCookies] = useState("");
        const timeRef = useRef<any>(null);

        useEffect(() => {
            handleRequest();
            timeRef.current = setInterval(() => {
                handleRequest();
            }, 60000)
            // }, 10000)
        }, []);

        useEffect(() => {
            if (confirmedPerson) {
                console.log('%ctimeRefCurrent', "color: #22E1FF; font-size: 16px", timeRef.current);
                clearInterval(timeRef.current);
                handleRequest();
                timeRef.current = setInterval(() => {
                    handleRequest();
                }, 60000)
                // }, 10000)
            }
        }, [confirmedPerson])

        const handleRequest = async () => {
            try {
                const data = await request('https://vrchat.com/api/1/auth/user/friends?offline=false&n=50&offset=0');
                console.log(data);
                setOnlineUser(data);
                console.log('%clikedPerson', "color: #22E1FF; font-size: 16px", confirmedPerson);
                const likeOnline = data.find((person: any) => person.displayName === confirmedPerson);
                if (likeOnline && !notificated) {
                    setNotification(likeOnline);
                    setNotificated(true);
                }
            } catch (e) {
                sendNotification({title: '通知', body: `cookies貌似过期了,请更新cookie`});
            };
        }

        const handleMessage = (message: string) => {
            sendNotification({title: '通知', body: message});
        }

        const setNotification = async (person: any) => {
            console.log('%cperson', "color: #22E1FF; font-size: 16px", person);
            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
                const permission = await requestPermission();
                permissionGranted = permission === 'granted';
            }
            if (permissionGranted) {
                // sendNotification('Tauri is awesome!');
                sendNotification({title: '通知', body: `${person.displayName} 已上线`});
            }
        }

        const handleCookies = async () => {
            const res = await setLocCookies(cookies);
        }
        return (
            <div className="person-list">
                <div className="operate-box">
                    <div className="name-box"><input type="text" placeholder="请填写好友的完整名字" value={likedPerson}
                                                     onChange={(e) => {
                                                         setLikedPerson(e.target.value)
                                                     }}/>
                        <button onClick={() => {
                            setLikedPerson("");
                            setConfirmedPerson(likedPerson)
                        }}>确认
                        </button>
                    </div>
                    <div className="name-box"><input type="text" placeholder="请填写cookie" value={cookies}
                                                     onChange={(e) => {
                                                         setCookies(e.target.value)
                                                     }}/>
                        <button onClick={handleCookies}>更新cookie
                        </button>
                    </div>
                </div>
                <h2>当前上线好友数量:{onlineUserList.length}人</h2>
                <h2>当前关注的好友:{confirmedPerson}</h2>
                <div>
                    {onlineUserList.map((each: any) => <div key={each.id} className="person">
                        <div className="up-side">
                            <img className="picture"
                                 src={each.profilePicOverride ? each.profilePicOverride : each.currentAvatarImageUrl}
                                 alt=""/>
                            <div className="right-side">
                                <div className="name">{each.displayName}</div>
                                <div className="status-Description">{each.statusDescription}</div>
                            </div>
                        </div>
                        <FriendLocation worldKey={each.location} onSendMessage={handleMessage} />
                    </div>)}
                </div>
            </div>
        );
    }
;

export default HttpDemo;
